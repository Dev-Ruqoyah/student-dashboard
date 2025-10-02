import { useEffect, useState } from "react";
import { FaAward, FaCamera, FaEdit, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getProfileData } from "../../../utils/studentServices";
import { useAuth } from "../../../contexts/useAuthContext";
import type { profileProps } from "./ProfileEdit";
import { useLoading } from "../../../contexts/useLoadingContext";

const Profile = () => {
  const [userProfileData, setUserProfileData] = useState<profileProps>({
    first_name: "",
    profile_url: "",
    last_name: "",
    email: "",
    bio: "",
    academic_advisor: "",
    date_of_birth: "",
    emergency_contact: "",
    is_updated: 1,
    major: "",
    minor: "",
    role: "",
    tel_phone: "",
    current_year: "",
  });
  // const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const {setLoading}= useLoading()
  // Handle user profile
  const getUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfileData(user?.id);
      if (response) {
        setUserProfileData(response);
      }
      // console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);


  return (
    <>
      <div className="">
        {/* header */}
        <div>
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-gray-800">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Card body */}
        <div className="grid md:grid-cols-6 mt-5 gap-5">
          <div className="md:col-span-4">
            <div className="bg-white shadow-md p-8 rounded-md">
              {/* header */}
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">Profile Information</p>

                <Link to={"/profile/edit"}>
                  <button className="flex cursor-pointer items-center gap-2 p-2 px-3 bg-primary text-neutral rounded-md">
                    <FaEdit /> 
                  </button>
                </Link>
              </div>

              {/* profile photo */}
              <div className="flex items-center gap-8  mt-6">
                <div className="relative w-28 h-28">
                  <img
                    src={
                      "https://ui-avatars.com/api/?name=Student&background=0D8ABC&color=fff"
                    }
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  <input
                    type="file"
                    id="profile-photo-upload"
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="profile-photo-upload">
                    <button
                      type="button"
                      className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100"
                      title="Change photo"
                    >
                      <FaCamera className="text-primary" />
                    </button>
                  </label>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{userProfileData.last_name} {userProfileData.first_name}</h3>
                  <p className="text-base">{userProfileData.major} Major</p>
                  <span>Studend ID : 2025001</span>
                </div>
              </div>

              {/* info form */}
              <form className="">
                <div className="grid md:grid-cols-2 gap-4 py-4 mt-8">
                  {/* first name */}
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
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                      defaultValue={userProfileData.first_name}
                      readOnly
                    />
                  </div>

                  {/* last name */}
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
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                      defaultValue={userProfileData.last_name}
                      readOnly
                    />
                  </div>

                  {/* email */}
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
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                      defaultValue={userProfileData.email}
                      readOnly
                    />
                  </div>

                  {/* tel_phone */}
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
                      className="w-full outline-0 bg-gray-100  rounded-md p-2 "
                       defaultValue={userProfileData.tel_phone}
                      readOnly
                    />
                  </div>

                  {/* DOB */}
                  <div>
                    <label
                      className="block text-sm  text-gray-700 mb-1"
                      htmlFor="dob"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      id="dob"
                      name="dob"
                      className="w-full outline-0 bg-gray-100  rounded-md p-2 "
                       defaultValue={userProfileData.date_of_birth}
                      readOnly
                    />
                  </div>

                  {/* current year */}
                  <div>
                    <label
                      className="block text-sm  text-gray-700 mb-1"
                      htmlFor="emergencyContact"
                    >
                      Year
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      className="w-full outline-0 bg-gray-100  rounded-md p-2 "
                       defaultValue={userProfileData.current_year}
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* academic info */}
            <div className="bg-white shadow-md p-8 rounded-md mt-5">
              <p className="font-medium text-lg">Academic Information</p>

              <form action="">
                <div className="grid md:grid-cols-2 gap-4 mt-8 py-4">

                  {/* major */}
                  <div>
                    <label
                      htmlFor="major"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      Major
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                       defaultValue={userProfileData.major}
                      readOnly
                    />
                  </div>

                  {/* minor */}
                  <div>
                    <label
                      htmlFor="major"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      Minor
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                       defaultValue={userProfileData.minor}
                      readOnly
                    />
                  </div>
                    
                    {/* GPA */}
                  <div>
                    <label
                      htmlFor="major"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      GPA
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                      defaultValue={"3.45"}
                      readOnly
                    />
                  </div>

                    {/* academic advisor */}
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
                      id="firstName"
                      name="firstName"
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                       defaultValue={userProfileData.academic_advisor}
                      readOnly
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="academicAdvisor"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      {" "}
                      Credits Completed
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                      defaultValue={"90/120"}
                      readOnly
                    />
                  </div>

                    {/* EXPECTED graduation */}
                  <div>
                    <label
                      htmlFor="academicAdvisor"
                      className="block text-sm  text-gray-700 mb-1"
                    >
                      {" "}
                      Expected Graduation
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full  outline-0 bg-gray-100  rounded-md p-2 "
                      defaultValue={"May 2027"}
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-span-2">
            {/* Quick Stats */}
            <div className="bg-white shadow-md rounded-md p-6">
              <h4 className="text-lg font-semibold mb-4">Quick Stats</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Current Courses</span>
                  <span className="font-bold text-primary">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Assignments Due</span>
                  <span className="font-bold text-primary">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Study Groups</span>
                  <span className="font-bold text-primary">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Classmates</span>
                  <span className="font-bold text-primary">28</span>
                </div>
              </div>
            </div>

            {/* Achiement */}
            <div className="bg-white shadow-md rounded-md p-6 mt-5">
              <h4 className="text-lg font-semibold mb-4">Achievements</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="bg-primary text-white rounded-full p-2">
                    <FaStar />
                  </span>
                  <div>
                    <span className="font-medium">Dean's List</span>
                    <span className="block text-sm text-gray-500">
                      Fall 2024
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-primary text-white rounded-full p-2">
                    <FaAward />
                  </span>
                  <div>
                    <span className="font-medium">Outstanding Student</span>
                    <span className="block text-sm text-gray-500">
                      Spring 2024
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-primary text-white rounded-full p-2">
                    <FaAward />
                  </span>
                  <div>
                    <span className="font-medium">Perfect Attendance</span>
                    <span className="block text-sm text-gray-500">
                      Fall 2024
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
