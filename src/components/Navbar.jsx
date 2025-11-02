import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext";
import { handleAuthError } from "../utils/error-handler";
import { ALERT_TYPES, ALERT_DURATION } from "../config/constants";
import Button from "./ui/Button";
import Loading from "./ui/Loading";

export default function Navbar() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      showAlert(
        handleAuthError(error, "logout"),
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
    }
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/">
              <h1 className="text-xl font-bold">🔐</h1>
            </Link>
            <Loading message="" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-xl font-bold">🔐</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard">
                  <Button
                    variant="primary"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="danger">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="primary">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="success">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
