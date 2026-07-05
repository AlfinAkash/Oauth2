# Google OAuth2 Flow — Azyrex Cloud

Complete authentication flow documentation for the MERN stack Google Sign-In implementation.

## Stack

| Component | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, Framer Motion |
| Backend | Express, Passport.js (`passport-google-oauth20`) |
| Database | MongoDB (Mongoose) |
| Session | Stateless JWT (`httpOnly` cookie) |
| Frontend domain | `azyrexcloud.online` |
| Backend domain | `backend-url` |

This implements the **OAuth2 Authorization Code Flow** (server-side flow) — the frontend never directly handles Google's tokens; only the backend does.

---

## Actors

- **Frontend (React)** — renders `Login.jsx`, holds no secrets
- **Backend (Express)** — runs Passport strategy, owns `client_secret` and `JWT_SECRET`
- **Google** — the OAuth2 authorization server
- **MongoDB** — persists `User` documents
- **Browser cookie** — carries the app's own JWT after login (not Google's tokens)

---

## Phase 1 — User initiates login

1. User clicks **"Continue with Google"** in `Login.jsx`.
2. `handleGoogleLogin()` performs a **full browser navigation** (not a fetch):
   ```js
   window.location.href = `${VITE_API_URL}/auth/google`;
   ```
3. The browser leaves the React app entirely and hits the Express backend.

---

## Phase 2 — Backend redirects to Google

4. Express route:
   ```js
   router.get(
     "/google",
     passport.authenticate("google", {
       scope: ["profile", "email"],
       accessType: "offline",
       prompt: "consent",
       session: false,
     })
   );
   ```
5. Passport builds Google's authorization URL, encoding:
   - `client_id`
   - `redirect_uri` (must exactly match Google Cloud Console config)
   - `scope` (profile + email)
   - `access_type=offline` → requests a refresh token
   - `prompt=consent` → forces consent screen, guaranteeing refresh token reissue

6. Browser is redirected to `accounts.google.com` — entirely Google's UI from here.

---

## Phase 3 — User authenticates with Google

7. User logs in (or is already logged in) and sees the consent screen.
8. User clicks **Allow**.
9. Google issues a **one-time authorization code** and redirects to the registered callback:
   ```
   https://backend-url/auth/google/callback?code=4/0AY0e-g7...
   ```
   This code is short-lived and single-use.

---

## Phase 4 — Backend exchanges code for tokens

10. Express receives `GET /auth/google/callback?code=...`.
11. Passport makes a **server-to-server POST** to `https://oauth2.googleapis.com/token`, sending:
    - the authorization `code`
    - `client_id` + `client_secret` (never exposed to frontend)
    - `redirect_uri` (must match again)

12. Google responds with:
    - **access_token** — short-lived (~1hr), used to call Google APIs
    - **refresh_token** — long-lived, only issued due to `accessType: offline`
    - **ID token** — JWT with identity claims (email, name, picture, `sub`/googleId)

13. Passport decodes the ID token and invokes the verify callback:
    ```js
    async (accessToken, refreshToken, profile, done) => { ... }
    ```

---

## Phase 5 — User record created/updated

14. Inside the verify callback (`config/passport.js`):
    - `User.findOne({ googleId: profile.id })` checks MongoDB.
    - New user → `User.create(...)`.
    - Existing user → updates name/email/avatar; **only overwrites `refreshToken` if Google actually sent one** this time.
15. `done(null, user)` attaches the Mongoose document to `req.user`.

---

## Phase 6 — Backend issues its OWN session token

> Google is no longer involved past this point. Session management runs entirely on the app's own JWT.

16. Callback route handler:
    ```js
    const token = generateToken(req.user);   // signed with JWT_SECRET
    res.cookie("token", token, cookieOptions); // httpOnly cookie
    res.redirect(`${CLIENT_URL}/`);
    ```
17. The JWT payload (`{ id, name, email, avatar }`) is completely separate from anything Google issued.
18. Cookie flags:
    - `httpOnly` → JavaScript cannot read it (mitigates XSS token theft)
    - `secure` / `sameSite` → control cross-site cookie behavior in production
19. Browser is redirected back to the frontend (`azyrexcloud.online/`) carrying the cookie.

---

## Phase 7 — Frontend picks up the session

20. React loads at `/`. `AuthProvider`'s effect calls:
    ```js
    const res = await api.get("/auth/current-user"); // withCredentials: true
    ```
21. The `httpOnly` cookie is sent automatically by the browser — frontend JS never touches it directly.
22. Backend's `/auth/current-user` route runs the `protect` middleware:
    ```js
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    ```
23. `AuthContext` sets `user` state. `ProtectedRoute` sees a valid session and either renders the app or redirects further.

---

## Phase 8 — Ongoing authenticated requests

24. Every subsequent API call carries the cookie automatically (`withCredentials: true` / `credentials: "include"`).
25. `protect` middleware verifies the JWT per request — no DB lookup required, since the JWT itself is the identity proof (stateless auth).

---

## Phase 9 — Logout

26. `POST /auth/logout` → `res.clearCookie("token", cookieOptions)`.
27. This clears only the app's own session. It does **not** revoke Google's grant — the user's Google account still lists the app as connected until they disconnect it manually, or the backend calls Google's revoke endpoint explicitly.

---

## Phase 10 — Refresh token usage (independent subsystem)

Only relevant if the backend needs to call Google APIs on the user's behalf later, outside of an active login session.

28. `POST /auth/google/refresh` retrieves the stored `refreshToken` from MongoDB (`select("+refreshToken")`, since it's excluded by default).
29. Backend POSTs to `https://oauth2.googleapis.com/token` with `grant_type: refresh_token` → Google returns a fresh short-lived `access_token`.
30. This token is used purely for Google API calls (Calendar, Drive, etc.) — unrelated to the app's own JWT or login state.

---

## Token systems compared

| | Purpose | Issued by | Stored where | Lifetime |
|---|---|---|---|---|
| **App JWT** | Authenticates user to the backend | The backend (`generateToken`) | `httpOnly` cookie in browser | 7 days (configurable) |
| **Google access_token** | Authenticates backend to Google APIs | Google | Not persisted; used immediately | ~1 hour |
| **Google refresh_token** | Obtains new access_tokens silently | Google (`accessType: offline` only) | MongoDB, `select: false` field | Until revoked |
| **Google ID token** | One-time identity proof at login | Google | Discarded after `profile` is parsed | Single use |

---

## Security checkpoints

- **`client_secret`** never leaves the backend — code exchange (Phase 4) is server-to-server only.
- **`httpOnly` cookie** — mitigates XSS token theft even if the React app has a script-injection vulnerability.
- **Exact `redirect_uri` match** required in Google Cloud Console — prevents authorization codes from being redirected to attacker-controlled domains.
- **JWT verification** on every protected route rejects tampered/expired tokens without a database round-trip.
- **`refreshToken` has `select: false`** on the Mongoose schema — excluded from default queries, reducing accidental exposure in API responses.
- **`invalid_grant` handling** — if a user revokes app access from their Google account, the stored refresh token becomes invalid; the backend should clear it from the DB on this error rather than retrying indefinitely.

---

## Environment variables reference

**Backend `.env`**
```env
PORT=5000
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=
SESSION_SECRET=
CLIENT_URL=https://azyrexcloud.online
SERVER_URL=
```

**Frontend `.env`**
```env
VITE_API_URL=
```

**Google Cloud Console — OAuth Client**
```
Authorised JavaScript origins:
  http://localhost:3000
  https://azyrexcloud.online

Authorised redirect URIs:
  http://localhost:5000/auth/google/callback
  https://xyz/auth/google/callback
```

---

*Author: AlfinAkash · [github.com/AlfinAkash](https://github.com/AlfinAkash)*
