import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import GoogleButton from "../components/ui/GoogleButton";
import AuthForm from "../components/forms/AuthForm";
import Divider from "../components/forms/Divider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithEmail, loginWithGoogle, loading, googleLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginWithEmail(email, password);
  };

  return (
    <AuthForm
      title="Sign in to your account"
      subtitle="Don't have an account?"
      linkText="Register here"
      linkTo="/register"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
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
          placeholder="Your password"
          required
          autoComplete="current-password"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            to="/reset-password"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <Button type="submit" loading={loading} fullWidth>
        Sign in
      </Button>

      <Divider />

      <GoogleButton onClick={loginWithGoogle} loading={googleLoading}>
        Sign in with Google
      </GoogleButton>
    </AuthForm>
  );
}
