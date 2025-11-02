export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  className = "",
  fullWidth = false,
}) {
  const baseClasses = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
  };

  const widthClass = fullWidth ? "w-full flex justify-center" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

