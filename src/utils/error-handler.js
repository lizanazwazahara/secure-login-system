export function getFirebaseErrorMessage(
  error,
  defaultMessage = "An error occurred"
) {
  if (!error || !error.code) {
    return error?.message || defaultMessage;
  }

  const errorMessages = {
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password",
    "auth/invalid-email": "Invalid email address",
    "auth/user-disabled": "This account has been disabled",
    "auth/email-already-in-use": "Email already in use",
    "auth/weak-password":
      "Password is too weak. Please choose a stronger password",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later",
    "auth/operation-not-allowed": "This sign-in method is not enabled",
    "auth/popup-closed-by-user": "Sign in cancelled",
    "auth/popup-blocked": "Popup blocked. Please allow popups for this site",
    "auth/unauthorized-domain":
      "This domain is not authorized. Please contact support",
    "auth/internal-error":
      "Internal error. Please check your configuration or try again later",
    "auth/requires-recent-login":
      "Please log out and log in again before performing this action",
    "auth/network-request-failed":
      "Network error. Please check your connection and try again",
  };

  return errorMessages[error.code] || error.message || defaultMessage;
}

export function handleAuthError(error, context = "authentication") {
  const contextMessages = {
    login: "Error signing in",
    register: "Error creating account",
    "password-reset": "Error sending reset email",
    logout: "Error signing out",
    "account-deletion": "Error deleting account",
  };

  const defaultMessage = contextMessages[context] || "An error occurred";
  return getFirebaseErrorMessage(error, defaultMessage);
}
