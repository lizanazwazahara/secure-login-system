export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password, minLength = 6) {
  if (!password) {
    return { valid: false, error: "Password is required" };
  }

  if (password.length < minLength) {
    return {
      valid: false,
      error: `Password must be at least ${minLength} characters`,
    };
  }

  return { valid: true, error: null };
}

export function validatePasswordMatch(password, confirmPassword) {
  if (password !== confirmPassword) {
    return { valid: false, error: "Passwords do not match" };
  }

  return { valid: true, error: null };
}

export function sanitizeInput(input) {
  if (typeof input !== "string") {
    return "";
  }

  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML.trim();
}

export function validateFullName(name, minLength = 2) {
  const trimmed = name.trim();

  if (!trimmed) {
    return { valid: false, error: "Full name is required" };
  }

  if (trimmed.length < minLength) {
    return {
      valid: false,
      error: `Full name must be at least ${minLength} characters`,
    };
  }

  return { valid: true, error: null };
}
