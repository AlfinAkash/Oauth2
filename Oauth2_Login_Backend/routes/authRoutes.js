const express = require("express");
const passport = require("passport");
const protect = require("../middleware/auth");
const { generateToken, cookieOptions } = require("../utils/token");

const router = express.Router();

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL}` }),
  (req, res) => {
    const token = generateToken(req.user);

    res.cookie("token", token, cookieOptions);

    res.redirect(`${process.env.CLIENT_URL}`);
  }
);

// Get current logged-in user
router.get("/current-user", protect, (req, res) => {
  res.json({ user: req.user });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Logged out successfully" });
});

module.exports = router;