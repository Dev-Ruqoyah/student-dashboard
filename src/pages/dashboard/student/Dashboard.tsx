import React, { use, useEffect } from "react";
import { useAuth } from "../../../contexts/useAuthContext";
import {
  FaBook,
  FaCalendarCheck,
  FaEye,
  FaMarkdown,
  FaPlus,
  FaStar,
  FaUserGraduate,
} from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { supabase } from "../../../supabaseClient";

const Dashboard = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = React.useState<any>(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        setUserDetails(user.user_metadata);
      }
    };
    fetchUserDetails();
  }, [user]);
  const getCurrentUser = () => {
    if (user) {
      const details = supabase.auth.getUser();
      return details;
    }
    return null;
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const summaryData = [
    { title: "Active Courses", icon: FaBook, count: 8, color: "bg-blue-500" },
    {
      title: "Pending Tasks",
      icon: MdOutlinePendingActions,
      count: 12,
      color: "bg-red-500",
    },
    {
      title: "Average Grade",
      icon: FaStar,
      count: "87%",
      color: "bg-green-500",
    },
    {
      title: "Attendace",
      icon: FaCalendarCheck,
      count: "92%",
      color: "bg-yellow-500",
    },
  ];

  const upComingClasses = [
    {
      title: "Math 101",
      time: "10:00 AM - 11:00 AM",
      instructor: "Dr. Smith",
      theatre: "Room 201",
      day: "Today",
    },
    {
      title: "History 201",
      time: "11:30 AM - 12:30 PM",
      instructor: "Prof. Johnson",
      theatre: "Room 105",
      day: "Today",
    },
  ];

  const recentAssignments = [
    {
      title: "Essay on World War II",
      course: "History 201",
      dueDate: "Sep 15, 2023",
      status: "Pending",
      icon: FaMarkdown,
      color: "bg-purple-500",
    },
    {
      title: "Calculus Homework",
      course: "Math 101",
      dueDate: "Sep 16, 2023",
      status: "Submitted",
      icon: FaMarkdown,
      color: "bg-orange-500",
    },
    {
      title: "Chemistry Lab Report",
      course: "Chemistry 101",
      dueDate: "Sep 18, 2023",
      status: "Pending",
      icon: FaMarkdown,
      color: "bg-teal-500",
    },
  ];

  const announcement = [
    {
      title: "New Course Available: Advanced Physics",
      date: "Sep 10, 2023",
      description:
        "Explore the new Advanced Physics course starting next month. Enroll now to secure your spot!",
    },
    {
      title: "Campus Event: Science Fair 2023",
      date: "Sep 8, 2023",
      description:
        "Join us for the annual Science Fair on Sep 20. Discover exciting projects and innovations from fellow students.",
    },
  ];
  return (
    <>
      <div>
        {/* Welcome back banner */}
        <div className="rounded-lg mb-6 bg-primary py-7 px-8 text-neutral">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-1">
                Welcome back, {userDetails ? userDetails.first_name : "Student"}
                !
              </h1>
              <p className="text-neutral/80 text-sm md:text-base">
                Here's what's happening with your courses and assignments today.
              </p>
            </div>

            <div className="date flex flex-col items-start md:items-end">
              <span className="font-semibold text-base md:text-lg">
                {new Date().toLocaleDateString(undefined, { weekday: "long" })}
              </span>
              <span className="text-xs md:text-sm">
                {new Date().toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {summaryData.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 p-4 rounded-lg shadow-md bg-white"
            >
              <div className={`p-3 rounded-full ${item.color}`}>
                <item.icon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm md:text-base">{item.title}</p>
                <p className="text-lg md:text-xl font-semibold">{item.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Upcoming classes */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-base md:text-lg text-primary/90">
                Upcoming Classes
              </h4>
              <div className="mt-4 space-y-4">
                {upComingClasses.map((cls, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-full bg-blue-500">
                        <FaBook className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">{cls.title}</p>
                        <span className="text-sm text-gray-600">
                          {cls.theatre} • {cls.instructor}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-col items-start md:items-end">
                      <small className="font-semibold text-sm text-gray-800">
                        {cls.time}
                      </small>
                      <small className="text-sm">{cls.day}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent assignments */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-base md:text-lg text-primary/90">
                Recent Assignments
              </h4>
              <div className="mt-4 space-y-4">
                {recentAssignments.map((assignment, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full ${assignment.color}`}>
                        <assignment.icon className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">{assignment.title}</p>
                        <span className="text-sm text-gray-600">
                          {assignment.course} • Due: {assignment.dueDate}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                          assignment.status === "Submitted"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-base md:text-lg text-primary/90 mb-4">
                Quick Actions
              </h4>
              <div className="flex flex-col gap-3">
                <button className="w-full bg-primary flex gap-2 justify-center items-center text-white py-2 rounded-md hover:bg-primary/90 transition text-sm md:text-base">
                  <FaEye /> View Courses
                </button>
                <button className="w-full bg-secondary flex gap-2 justify-center items-center text-white py-2 rounded-md hover:bg-secondary/90 transition text-sm md:text-base">
                  <FaPlus /> Submit Assignment
                </button>
                <button className="w-full bg-green-500 flex gap-2 justify-center items-center text-white py-2 rounded-md hover:bg-green-600 transition text-sm md:text-base">
                  <FaUserGraduate /> Check Grades
                </button>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-base md:text-lg text-primary/90 mb-4">
                Announcements
              </h4>
              <div className="space-y-3">
                {announcement.map((note, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-3 rounded-md hover:shadow-md transition-shadow"
                  >
                    <h5 className="font-semibold text-sm">{note.title}</h5>
                    <small className="text-xs md:text-sm text-gray-500">
                      {note.date}
                    </small>
                    <p className="mt-1 text-sm line-clamp-2">
                      {note.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
