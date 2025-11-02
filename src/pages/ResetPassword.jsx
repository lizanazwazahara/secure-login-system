import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/auth-service";
import { useAlert } from "../contexts/AlertContext";
import { handleAuthError } from "../utils/error-handler";
import {
  ALERT_TYPES,
  ALERT_DURATION,
  REDIRECT_DELAY,
} from "../config/constants";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthForm from "../components/forms/AuthForm";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.sendPasswordReset(email);
      showAlert(
        "Password reset email sent! Check your inbox.",
        ALERT_TYPES.SUCCESS,
        ALERT_DURATION
      );

      setTimeout(() => navigate("/login"), REDIRECT_DELAY * 3);
    } catch (error) {
      console.error("Error sending reset email:", error);
      showAlert(
        handleAuthError(error, "password-reset"),
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a reset link"
      onSubmit={handleSubmit}
    >
      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />

      <Button type="submit" loading={loading} fullWidth>
        Send Reset Link
      </Button>

      <div className="text-center">
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Back to Login
        </Link>
      </div>
    </AuthForm>
  );
}
