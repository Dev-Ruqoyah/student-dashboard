import React, { useEffect, useState } from "react";
import { FaEdit, FaKey, FaSave } from "react-icons/fa";
import { FaShield, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getProfileData } from "../../../utils/studentServices";
import { useAuth } from "../../../contexts/useAuthContext";

interface profileProps {
  first_name: string;
  profile_url:string;
  last_name: string;
  bio: string;
  academic_advisor: string;
  date_of_birth: string;
  emergency_contact: number;
  is_updated: number;
  major:string;
  minor:string;
  role:string;
  tel_phone:number;

}
const ProfileEdit = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useAuth();

  const [userInitialData, setUserInitialData] = useState<profileProps>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // create a temporary local URL for the uploaded image
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(fileUrl);
      console.log("Clicked");
    }
  };

  const getUserProfile = async () => {
    const response = await getProfileData(user?.id);
    console.log(response);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <div>
        {/* header */}
        <div>
          <h3 className="text-lg font-semibold">Edit Profile</h3>
          <p className="text-gray-800">
            Update your account information and preferences
          </p>
        </div>

        {/* Card body */}
        <div className="grid md:grid-cols-6  gap-5 mt-5">
          <div className="md:col-span-4">
            <div className="bg-white shadow-md p-8 rounded-md">
              {/* header */}
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Profile Information</p>
                <div className="flex items-center gap-3">
                  <Link to={"/profile/edit"}>
                    <button className="flex cursor-pointer items-center gap-2 p-2 px-2 border border-primary text-primary rounded-md">
                      <span>
                        <FaX />
                      </span>
                    </button>
                  </Link>

                  <Link to={"/profile/edit"}>
                    <button className="flex cursor-pointer items-center gap-2 p-2 px-2 bg-primary text-neutral rounded-md">
                      <span>
                        <FaSave />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* profile photo */}
              <div className="flex flex-col items-start mt-6">
                <div className="relative w-28 h-28">
                  <img
                    src={
                      preview ||
                      "https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff"
                    }
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover "
                  />
                  <input
                    type="file"
                    id="profile-photo-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="profile-photo-upload">
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100"
                      title="Change photo"
                    >
                      <FaEdit className="text-primary" />
                    </button>
                  </label>
                </div>
                <span className="mt-2 text-sm text-gray-500">
                  Change profile photo
                </span>
              </div>

              {/* info form */}

              <form className="">
                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  <div>
                    <label
                      className="block text-sm  text-gray-700 mb-1"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm  text-gray-700 mb-1"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm  text-gray-700 mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm  text-gray-700 mb-1"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm  text-gray-700 mb-1"
                      htmlFor="dob"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm  text-gray-700 mb-1"
                      htmlFor="emergencyContact"
                    >
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                      placeholder="Enter emergency contact name"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm  text-gray-700 mb-1"
                    htmlFor="bio"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                    placeholder="Enter your bio"
                    rows={3}
                  />
                </div>
              </form>
            </div>

            {/* academic info */}
            <div className="bg-white shadow-md p-8 rounded-md mt-5">
              <p className="font-medium text-lg">Academic Information</p>

              <form action="">
                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  <div>
                    <label
                      htmlFor="major"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      Major
                    </label>
                    <select
                      name="major"
                      id=""
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="major"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      Minor
                    </label>
                    <select
                      name="major"
                      id=""
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="major"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      Year
                    </label>
                    <select
                      name="major"
                      id=""
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                    >
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="academicAdvisor"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      {" "}
                      Academic Advisor
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-primary"
                      placeholder="Dr. Michael Chen"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-md p-6">
              <h4 className="font-semibold text-lg mb-4">Security</h4>
              <div className="flex flex-col gap-4">
                {/* Change Password */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-gray-700">
                  <FaKey />
                  <div className="">
                    <span>Change Password</span> <br />
                    <span className="text-sm text-gray-500">
                      Last changed 3 months ago
                    </span>
                  </div>
                </div>
                {/* Two-factor Authentication */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaShield />
                    <div className="  ">
                      <span>Two-factor Authentication</span> <br />
                      <span className="text-gray-500 text-xs">Disabled</span>
                    </div>
                  </div>
                </div>
                {/* Active Sessions */}
                <div className="flex flex-col gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17v-2a4 4 0 018 0v2m-4-6a4 4 0 100-8 4 4 0 000 8zm-6 8v-2a4 4 0 014-4h4a4 4 0 014 4v2"
                      />
                    </svg>
                    <span className="font-medium">Active Sessions</span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center justify-between">
                      <span>
                        Chrome on Windows{" "}
                        <span className="text-xs text-gray-400">(Current)</span>
                      </span>
                      <button className="text-red-500 hover:underline text-xs">
                        Sign out
                      </button>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Safari on iPhone</span>
                      <button className="text-red-500 hover:underline text-xs">
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-md p-6 mt-6">
              <h4 className="font-semibold text-lg mb-4">Account Actions</h4>
              <div className="flex flex-col gap-4">
                <button className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-gray-700">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                    />
                  </svg>
                  <span>Download My Data</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-2 rounded-md border border-red-500 text-red-600 hover:bg-red-50 transition">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0A9 9 0 11 3 12a9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Deactivate Account</span>
                </button>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-md p-6 mt-6">
              <h4 className="font-semibold text-lg mb-4">Help & Support</h4>
              <div className="flex flex-col gap-4">
                <Link
                  to="/help-center"
                  className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-gray-700"
                >
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8zm-9 4h.01"
                    />
                  </svg>
                  <span>Help Center</span>
                </Link>
                <Link
                  to="/contact-support"
                  className="flex items-center gap-3 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition text-gray-700"
                >
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                    />
                  </svg>
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
