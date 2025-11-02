import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import GoogleButton from "../components/ui/GoogleButton";
import AuthForm from "../components/forms/AuthForm";
import Divider from "../components/forms/Divider";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registerWithEmail, registerWithGoogle, loading, googleLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerWithEmail(fullName, email, password, confirmPassword);
  };

  return (
    <AuthForm
      title="Create your account"
      subtitle="Already have an account?"
      linkText="Sign in"
      linkTo="/login"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <Input
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="John Doe"
          required
        />

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

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 6 characters"
          required
          autoComplete="new-password"
          helperText="Minimum 6 characters"
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter password"
          required
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" loading={loading} fullWidth>
        Create Account
      </Button>

      <Divider />

      <GoogleButton onClick={registerWithGoogle} loading={googleLoading}>
        Sign up with Google
      </GoogleButton>
    </AuthForm>
  );
}
