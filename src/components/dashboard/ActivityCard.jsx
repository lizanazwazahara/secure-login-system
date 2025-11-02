import Card from "../ui/Card";
import { formatDate } from "../../utils/date-utils";

export default function ActivityCard({ userData }) {
  return (
    <Card title="Account Activity">
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Account Created</p>
          <p className="font-medium text-gray-900">
            {formatDate(userData?.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Login</p>
          <p className="font-medium text-gray-900">
            {formatDate(userData?.lastLogin)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Session Status</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
            Active
          </span>
        </div>
      </div>
    </Card>
  );
}

