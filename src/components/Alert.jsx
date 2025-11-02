import { useAlert } from "../contexts/AlertContext";

export default function Alert() {
  const { alert } = useAlert();

  if (!alert) return null;

  const alertClasses = {
    error: "bg-red-100 text-red-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div
        className={`p-4 rounded-lg ${
          alertClasses[alert.type] || alertClasses.error
        }`}
      >
        {alert.message}
      </div>
    </div>
  );
}
