import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img src={user?.avatar} alt="avatar" style={{ borderRadius: "50%", width: 80 }} />
      <h2>Welcome, {user?.name}</h2>
      <p>{user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;