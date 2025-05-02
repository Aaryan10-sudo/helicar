"use client";
import Bellicon from "@/ui/Bellicon";
import DownArrowIcon from "@/ui/DownArrowIcon";
import LogoutIcon from "@/ui/LogoutIcon";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminNavbar = () => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {}
  };
  return (
    <nav className="w-full text-white shadow-md h-[70px] flex items-center justify-end px-12 gap-5">
      <section className="flex items-center relative">
        <Bellicon />
        <span className="absolute top-[-13px] left-[17px] text-red-600 font-bold text-3xl">
          •
        </span>
      </section>
      <span className="border-2 border-slate-200 h-[40px] w-[40px] rounded-full overflow-hidden">
        <img
          src="https://imgs.search.brave.com/7P_o6kn1f_baptNy60pfgUYtiA41-xJ0Ie_uvBqJl84/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/bG9zZS11cC1wb3J0/cmFpdC1jdXJseS1o/YW5kc29tZS1ldXJv/cGVhbi1tYWxlXzE3/NjUzMi04MTMzLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA"
          alt="avatar"
          className="h-full w-full object-cover"
        />
      </span>

      <button
        className="cursor-pointer text-black"
        onClick={() => setMenu(!menu)}
      >
        <DownArrowIcon className="cursor-pointer text-black" />
      </button>

      {menu ? (
        <div className="shadow-md absolute top-[70px] z-50 h-[80px] w-[150px] flex justify-center items-center bg-white">
          <button
            className="text-red-600 flex justify-center items-center font-bold gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            Log Out <LogoutIcon />
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default AdminNavbar;
