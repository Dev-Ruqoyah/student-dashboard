import React from "react";
import type { IconType } from "react-icons";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaCode,
  FaFlask,
  FaVideo,
  FaQuestionCircle,
  FaDatabase,
  FaRobot,
  FaNetworkWired,
  FaLaptopCode,
} from "react-icons/fa";

type CourseStatus = "Active" | "In Progress" | "Completed";

type CourseCategory =
  | "programming"
  | "mathematics"
  | "video editing"
  | "science"
  | "public speaking"
  | string; // fallback for unexpected categories

export interface CourseCardProps {
  id: number;
  title: string;
  status: CourseStatus;
  progress: number;
  instructor: string;
  theatre: string;
  unit: number;
  category: CourseCategory;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  status,
  progress,
  instructor,
  theatre,
  unit,
  category,
}) => {
  // Status badge styling
  const statusClasses =
    status === "Active"
      ? "bg-green-600 text-white"
      : status === "In Progress"
      ? "bg-blue-600 text-white"
      : "bg-gray-500 text-white";

  // Icon mapping
  const iconMap: Record<string, IconType> = {
    programming: FaCode,
    mathematics: FaBookOpen,
    "video editing": FaVideo,
    science: FaFlask,
    "public speaking": FaChalkboardTeacher,
    data: FaDatabase,
    ai: FaRobot,
    networking: FaNetworkWired,
    design:FaLaptopCode
  };

  // Background color mapping
  const bgMap: Record<string, string> = {
    programming: "bg-purple-600",
    mathematics: "bg-yellow-600",
    "video editing": "bg-red-600",
    science: "bg-green-600",
    "public speaking": "bg-blue-600",
    ai: "bg-rose-600",
    networking: "bg-orange-600",
    database: "bg-teal-600",
     "design": "bg-indigo-600",
  };

  // Normalize category & apply fallback
  const normalizedCategory = category.toLowerCase();
  const Icony: IconType = iconMap[normalizedCategory] || FaQuestionCircle;
  const bgClass = bgMap[normalizedCategory] || "bg-gray-600";

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300">
      {/* Icon with background */}
      <div className={`h-48 ${bgClass} flex justify-center items-center`}>
        <Icony className="text-white" size={48} />
      </div>

      {/* Card Content */}
      <div className="px-4 py-4">
        {/* Title + Status */}
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-[15px]">{title}</p>
          <span
            className={`text-[12px] px-2 rounded-full font-medium ${statusClasses}`}
          >
            {status}
          </span>
        </div>

        {/* Instructor & Theatre */}
        <p className="text-gray-700 text-[14px] mb-3">
          {instructor} • {theatre}
        </p>

        {/* Progress */}
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="text-gray-600">Progress:</span>
          <span className="text-gray-800 font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-700 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Units */}
        <div className="flex justify-between items-center mt-3 text-[14px]">
          <span className="text-gray-600">Units:</span>
          <span className="font-medium">{unit}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 pb-5">
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300">
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
