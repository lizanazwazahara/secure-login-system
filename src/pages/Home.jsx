import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Secure Login System
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Desain dan Implementasi Sistem Login Aman Menggunakan Firebase
            Authentication dan Firestore
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
              <p className="text-gray-600">
                Email/Password & Google OAuth dengan enkripsi end-to-end
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-bold mb-2">Email Verification</h3>
              <p className="text-gray-600">
                Verifikasi email otomatis untuk keamanan tambahan
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Protected Routes</h3>
              <p className="text-gray-600">
                Role-based access control dengan Firebase Security Rules
              </p>
            </div>
          </div>

          <div className="mt-12 space-x-4">
            {currentUser ? (
              <Link
                to="/dashboard"
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            Fitur Keamanan yang Diimplementasikan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-bold">HTTPS/TLS Encryption</h4>
                <p className="text-gray-600">
                  Semua komunikasi menggunakan SSL/TLS
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-bold">Password Hashing</h4>
                <p className="text-gray-600">
                  Password di-hash dengan algoritma bcrypt
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-bold">Rate Limiting</h4>
                <p className="text-gray-600">
                  Proteksi terhadap brute force attack
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-bold">Input Validation</h4>
                <p className="text-gray-600">
                  Sanitasi input untuk mencegah XSS
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-bold">OAuth 2.0</h4>
                <p className="text-gray-600">
                  Login dengan Google menggunakan OAuth 2.0
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-2xl">✅</div>
              <div>
                <h4 className="font-bold">Session Management</h4>
                <p className="text-gray-600">
                  Token-based authentication dengan auto-refresh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
