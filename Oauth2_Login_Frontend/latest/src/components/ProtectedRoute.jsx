import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      window.location.href = "https://azyrexcloud.online";
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <p>Redirecting...</p>;
};

export default ProtectedRoute;