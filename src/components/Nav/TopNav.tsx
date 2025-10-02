import { Bell, Menu } from "lucide-react";
import { useAuth } from "../../contexts/useAuthContext";
import { useEffect, useState } from "react";
import { signOut } from "../../contexts/useLoginService";

interface TopNavBarProps {
  toggleSidebar: () => void;
}

const TopNavBar = ({ toggleSidebar }: TopNavBarProps) => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(()=>{
    setUserDetails(user?.user_metadata)
  },[])
  

  return (
    <header className="flex items-center justify-between bg-white text-primary px-6 py-3 shadow-md border-b border-gray-200">
      {/* Left: Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Right: Search + Notifications + Profile */}
      <div className="flex justify-end items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-black"
          />
        </div>

        {/* Notification */}
        <button className="relative hover:text-primary/70">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-primary/70">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-primary"
          />
          <span className="hidden md:inline">
            {userDetails
              ? `${userDetails.first_name || ""}`
              : "Loading..."}
          </span>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
