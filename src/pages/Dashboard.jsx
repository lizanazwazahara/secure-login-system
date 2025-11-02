import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAccount } from "../hooks/useAccount";
import Loading from "../components/ui/Loading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ProfileCard from "../components/dashboard/ProfileCard";
import ActivityCard from "../components/dashboard/ActivityCard";

const SECURITY_FEATURES = [
  { icon: "🔒", title: "HTTPS/TLS", description: "End-to-end encryption" },
  {
    icon: "✉️",
    title: "Email Verification",
    description: "Verified email address",
  },
  { icon: "🔑", title: "OAuth 2.0", description: "Google authentication" },
  {
    icon: "🛡️",
    title: "Firebase Security Rules",
    description: "Access control",
  },
  { icon: "⚡", title: "Rate Limiting", description: "Brute force protection" },
  { icon: "🔐", title: "Password Hashing", description: "Bcrypt encryption" },
];

export default function Dashboard() {
  const { userData, loading: authLoading, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const {
    resendVerification,
    deleteAccount,
    checkEmailVerification,
    resendLoading,
    deleteLoading,
  } = useAccount();
  const [checkingVerification, setCheckingVerification] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading]);

  // Auto-check email verification status when component mounts
  useEffect(() => {
    const autoCheckVerification = async () => {
      if (!authLoading && userData && !userData.emailVerified) {
        const result = await checkEmailVerification();
        if (result.success && result.verified) {
          await refreshUser();
        }
      }
    };

    autoCheckVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  const handleCheckVerification = async () => {
    setCheckingVerification(true);
    try {
      const result = await checkEmailVerification();
      if (result.success && result.verified) {
        await refreshUser();
      }
    } catch (error) {
      console.error("Error checking verification:", error);
    } finally {
      setCheckingVerification(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone!"
    );

    if (!confirmed) return;

    const password = window.prompt(
      "Please enter your password to confirm account deletion:"
    );

    if (!password) {
      return;
    }

    await deleteAccount(password);
  };

  if (loading) {
    return <Loading fullScreen message="Loading dashboard..." />;
  }

  const displayName = userData?.displayName || userData?.fullName || "User";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <Card className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, <span className="text-blue-600">{displayName}</span>!
        </h2>
        <p className="text-gray-600">
          You have successfully logged in to your secure account.
        </p>
      </Card>

      {/* User Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ProfileCard userData={userData} />
        <ActivityCard userData={userData} />
      </div>

      {/* Security Features */}
      <Card className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Security Features Implemented
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECURITY_FEATURES.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg"
            >
              <div className="text-2xl">{feature.icon}</div>
              <div>
                <h4 className="font-bold text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <Card>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Account Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          {!userData?.emailVerified && (
            <>
              <Button
                onClick={resendVerification}
                loading={resendLoading}
                variant="warning"
              >
                Resend Verification Email
              </Button>
              <Button
                onClick={handleCheckVerification}
                loading={checkingVerification}
                variant="primary"
              >
                Check Verification Status
              </Button>
            </>
          )}
          <Link to="/reset-password">
            <Button variant="primary">Change Password</Button>
          </Link>
          <Button
            onClick={handleDeleteAccount}
            loading={deleteLoading}
            variant="danger"
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
