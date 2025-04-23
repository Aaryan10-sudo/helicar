import Bellicon from "@/ui/Bellicon";
import DownArrowIcon from "@/ui/DownArrowIcon";
import React from "react";

const AdminNavbar = () => {
  return (
    <>
      <nav className=" text-white shadow-md h-[70px] w-full flex items-center justify-end px-12 gap-5">
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
        <DownArrowIcon className="cursor-pointer" />
      </nav>
    </>
  );
};

export default AdminNavbar;
