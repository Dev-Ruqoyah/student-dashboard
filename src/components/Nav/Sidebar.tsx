import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  User,
} from "lucide-react";

const Sidebar = ({
  collapsed,
  toggleSidebar,
}: {
  collapsed: boolean;
  toggleSidebar: () => void;
}) => {
  const navItems = [
    { name: "Home", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Courses", path: "/courses", icon: <BookOpen size={18} /> },
    { name: "Assignments", path: "/dashboard/assignments", icon: <ClipboardList size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
    // {name:"Logout",path:"",icon:<FaArrowAltCircleDown size={18}/>}
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-white text-primary flex flex-col shadow-lg transition-all duration-300`}
    >
      {/* Logo / Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && <span className="text-xl font-bold">Academia</span>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {collapsed ? (
            <span className="p-3 py-2 rounded-full bg-primary text-white">A</span>
          ) : null}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 pt-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white"
                  : "text-primary/70 hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
