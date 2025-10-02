import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
        <BookOpen className="text-primary" size={40} />
      </div>

      {/* Text */}
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="mt-3 text-gray-600 text-lg">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p className="text-gray-500 text-sm">
        It may have been moved or removed.
      </p>

      {/* Button */}
      <Link
        to="/dashboard"
        className="mt-6 inline-flex items-center px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-all"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
