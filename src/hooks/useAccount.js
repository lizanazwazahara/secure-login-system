import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth-service";
import { userService } from "../services/user-service";
import { handleAuthError } from "../utils/error-handler";
import { useAlert } from "../contexts/AlertContext";
import { ALERT_TYPES, ALERT_DURATION } from "../config/constants";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export function useAccount() {
  const [resendLoading, setResendLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const resendVerification = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      showAlert("No user logged in", ALERT_TYPES.ERROR, ALERT_DURATION);
      return { success: false };
    }

    setResendLoading(true);
    try {
      await authService.sendVerificationEmail(user);
      showAlert(
        "Verification email sent! Please check your inbox.",
        ALERT_TYPES.SUCCESS,
        ALERT_DURATION
      );
      return { success: true };
    } catch (error) {
      console.error("Error sending verification email:", error);
      showAlert(
        handleAuthError(error, "authentication"),
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
      return { success: false, error };
    } finally {
      setResendLoading(false);
    }
  };

  const deleteAccount = async (password) => {
    const user = authService.getCurrentUser();
    if (!user) {
      showAlert("No user logged in", ALERT_TYPES.ERROR, ALERT_DURATION);
      return { success: false };
    }

    setDeleteLoading(true);
    try {
      await userService.deleteUserData(user.uid);
      await authService.deleteAccount(user, password);
      showAlert(
        "Account deleted successfully",
        ALERT_TYPES.SUCCESS,
        ALERT_DURATION
      );
      navigate("/");
      return { success: true };
    } catch (error) {
      console.error("Error deleting account:", error);
      showAlert(
        handleAuthError(error, "account-deletion"),
        ALERT_TYPES.ERROR,
        ALERT_DURATION
      );
      return { success: false, error };
    } finally {
      setDeleteLoading(false);
    }
  };

  const checkEmailVerification = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      return { success: false, verified: false };
    }

    try {
      // Reload user to get latest email verification status from Firebase Auth
      await user.reload();

      // Update Firestore if email is now verified
      if (user.emailVerified) {
        await updateDoc(doc(db, "users", user.uid), {
          emailVerified: true,
          updatedAt: new Date().toISOString(),
        });
      }

      return { success: true, verified: user.emailVerified };
    } catch (error) {
      console.error("Error checking email verification:", error);
      return { success: false, verified: false, error };
    }
  };

  return {
    resendVerification,
    deleteAccount,
    checkEmailVerification,
    resendLoading,
    deleteLoading,
  };
}
