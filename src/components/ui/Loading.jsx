export default function Loading({ message = "Loading...", fullScreen = false }) {
  const containerClasses = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
}

