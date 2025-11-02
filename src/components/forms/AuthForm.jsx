import { Link } from "react-router-dom";

export default function AuthForm({
  title,
  subtitle,
  linkText,
  linkTo,
  children,
  onSubmit,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-600">
              {subtitle}{" "}
              {linkText && linkTo && (
                <Link
                  to={linkTo}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {linkText}
                </Link>
              )}
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
          {children}
        </form>
      </div>
    </div>
  );
}

