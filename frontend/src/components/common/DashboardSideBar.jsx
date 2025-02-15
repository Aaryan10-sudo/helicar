import { Link, useLocation } from "react-router-dom";
import EMIS_LOGO from "../../assets/SideBarIcons/EMIS_LOGO.svg?react";
import { SideBarLinks } from "../../utils/SideBarLinks.jsx";
import { LogOutIcon } from "../../assets/SideBarIcons/index.js";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import ConfirmationPopUp from "./ConfirmationPopUp.jsx";
import { logout } from "../../services/authService.js";
import { toast } from "react-toastify";

const DashboardSideBar = ({ Role }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 780);
  const [showLogOut, setShowLogOut] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      toast.error("Logout Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const location = useLocation();
  return (
    <div>
      <button
        onClick={() => toggleSidebar()}
        className={`absolute ${isOpen ? "left-[300px]" : "left-[50px]"} hover:bg-primary hover:text-white rounded-[5px] p-1`}
      >
        <FiMenu size={30} />
      </button>
      {showLogOut && (
        <ConfirmationPopUp
          message="Are you sure you want to logout?"
          confirmMessage="Logout"
          cancelMessage="Cancel"
          onClose={() => setShowLogOut(false)}
          onConfirm={() => handleLogOut()}
          onCancel={() => setShowLogOut(false)}
          loading={loading}
        />
      )}
      <div
        className={`flex flex-col gap-12 w-[233px] min-h-screen py-12 bg-primary rounded-3xl transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full hidden"} duration-300`}
      >
        <div className="flex justify-center w-full">
          <div className="w-[128px] h-[128px] flex items-center justify-center">
            <EMIS_LOGO />
          </div>
        </div>
        <div className="w-full flex justify-center">
          {/* Menus of Sidebar */}
          <div className="w-[156px]">
            <ul>
              {SideBarLinks[Role].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li
                    key={item.label}
                    className={`flex items-center gap-4 text-[18px] mb-12 hover:text-[#FFFFFF] hover:font-[600] hover:cursor-pointer ${isActive ? "text-white font-[600]" : "text-[#FFFFFF80]"}`}
                  >
                    <Link className="flex items-center gap-3" to={item.path}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Log Out Button */}
        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => setShowLogOut(true)}
            className="flex items-center justify-center gap-3 text-[18px] font-normal text-[#FFFFFFBF] hover:cursor-pointer hover:text-white hover:font-semibold"
          >
            <LogOutIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
