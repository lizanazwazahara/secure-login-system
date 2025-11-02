import Card from "../ui/Card";

export default function ProfileCard({ userData }) {
  const displayName = userData?.displayName || userData?.fullName || "User";
  const photoURL = userData?.photoURL
    ? userData.photoURL
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName || userData?.email || "User"
      )}&size=80&background=3B82F6&color=fff`;

  return (
    <Card title="Profile Information" subtitle="Your account details">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={photoURL}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-blue-600"
        />
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-900">{userData?.email || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">User ID</p>
          <p className="font-mono text-sm text-gray-700 break-all">
            {userData?.uid || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email Verified</p>
          <p className="font-medium">
            {userData?.emailVerified ? (
              <span className="text-green-600">✓ Verified</span>
            ) : (
              <span className="text-red-600">✗ Not Verified</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Authentication Provider</p>
          <p className="font-medium text-gray-900">
            {userData?.authProvider || "Email/Password"}
          </p>
        </div>
      </div>
    </Card>
  );
}

