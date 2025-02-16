import { Outlet } from "react-router-dom";
import DashboardSideBar from "../common/DashboardSideBar";
import DashboardNavBar from "../common/Navbar/DashboardNavBar";

const CollegeDashboardLayout = () => {
  return (
    <div className="flex gap-[45px] px-[34px] py-[32px]">
      <DashboardSideBar Role="college" />
      <div className="flex flex-col gap-[21px] w-full">
        <DashboardNavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default CollegeDashboardLayout;
