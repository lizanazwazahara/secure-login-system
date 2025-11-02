import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth-service";
import { userService } from "../services/user-service";
import { useAlert } from "../contexts/AlertContext";
import { handleAuthError } from "../utils/error-handler";
import {
  ALERT_TYPES,
  ALERT_DURATION,
  REDIRECT_DELAY,
  AUTH_PROVIDERS,
} from "../config/constants";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const loginWithEmail = async (email, password) => {
    setLoading(true);

    try {
      const userCredential = await authService.signInWithEmail(email, password);
      const user = userCredential.user;

      await userService.updateLastLogin(user.uid);

      if (!user.emailVerified) {
        showAlert(
          "Please verify your email before logging in. Check your inbox.",
          ALERT_TYPES.ERROR,
          ALERT_DURATION
        );
        return { success: false, needsVerification: true };
      }

      showAlert("Signed in successfully!", ALERT_TYPES.SUCCESS, ALERT_DURATION);
      setTimeout(() => navigate("/dashboard"), REDIRECT_DELAY);

      return { success: true };
    } catch (error) {
      console.error("Error signing in:", error);
      showAlert(
        handleAuthError(error, "login"),
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setGoogleLoading(true);

    try {
      const result = await authService.signInWithGoogle();
      const user = result.user;

      const userData = userService.createUserDataObject(user, AUTH_PROVIDERS.GOOGLE, {
        fullName: user.displayName,
        photoURL: user.photoURL,
      });
      await userService.saveUserData(user.uid, userData);
      await userService.updateLastLogin(user.uid);

      showAlert("Signed in successfully!", ALERT_TYPES.SUCCESS, ALERT_DURATION);
      setTimeout(() => navigate("/dashboard"), REDIRECT_DELAY);

      return { success: true };
    } catch (error) {
      console.error("Error signing in with Google:", error);
      showAlert(
        handleAuthError(error, "login"),
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
      return { success: false, error };
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    loginWithEmail,
    loginWithGoogle,
    loading,
    googleLoading,
  };
}

