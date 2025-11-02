import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth-service";
import { userService } from "../services/user-service";
import { useAlert } from "../contexts/AlertContext";
import { handleAuthError } from "../utils/error-handler";
import {
  validateFullName,
  validatePassword,
  validatePasswordMatch,
  sanitizeInput,
} from "../utils/validation";
import {
  ALERT_TYPES,
  ALERT_DURATION,
  REDIRECT_DELAY,
  AUTH_PROVIDERS,
} from "../config/constants";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const registerWithEmail = async (fullName, email, password, confirmPassword) => {
    setLoading(true);

    // Validate full name
    const nameValidation = validateFullName(fullName);
    if (!nameValidation.valid) {
      showAlert(nameValidation.error, ALERT_TYPES.ERROR, ALERT_DURATION);
      setLoading(false);
      return { success: false, error: nameValidation.error };
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      showAlert(
        passwordValidation.error,
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
      setLoading(false);
      return { success: false, error: passwordValidation.error };
    }

    // Validate password match
    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword);
    if (!passwordMatchValidation.valid) {
      showAlert(
        passwordMatchValidation.error,
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
      setLoading(false);
      return { success: false, error: passwordMatchValidation.error };
    }

    try {
      // Create user
      const userCredential = await authService.registerWithEmail(email, password);
      const user = userCredential.user;

      // Update profile
      await authService.updateUserProfile(user, {
        displayName: sanitizeInput(fullName),
      });

      // Save to Firestore
      const userData = userService.createUserDataObject(
        user,
        AUTH_PROVIDERS.EMAIL,
        { fullName: sanitizeInput(fullName) }
      );
      await userService.saveUserData(user.uid, userData);

      // Send verification email
      await authService.sendVerificationEmail(user);

      showAlert(
        "Account created! Please check your email for verification link.",
        ALERT_TYPES.SUCCESS,
        ALERT_DURATION
      );

      setTimeout(() => navigate("/dashboard"), REDIRECT_DELAY * 2);

      return { success: true };
    } catch (error) {
      console.error("Error creating account:", error);
      showAlert(
        handleAuthError(error, "register"),
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const registerWithGoogle = async () => {
    setGoogleLoading(true);

    try {
      const result = await authService.signInWithGoogle();
      const user = result.user;

      const userData = userService.createUserDataObject(user, AUTH_PROVIDERS.GOOGLE, {
        fullName: user.displayName,
        photoURL: user.photoURL,
      });
      await userService.saveUserData(user.uid, userData);

      showAlert("Signed in successfully!", ALERT_TYPES.SUCCESS, ALERT_DURATION);
      setTimeout(() => navigate("/dashboard"), REDIRECT_DELAY);

      return { success: true };
    } catch (error) {
      console.error("Error signing in with Google:", error);
      showAlert(
        handleAuthError(error, "register"),
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
      return { success: false, error };
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    registerWithEmail,
    registerWithGoogle,
    loading,
    googleLoading,
  };
}

