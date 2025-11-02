import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./ui/Loading";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen message="Checking authentication..." />;
  }

  return currentUser ? children : <Navigate to="/login" replace />;
}
