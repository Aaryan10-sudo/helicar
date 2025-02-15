import { MessageIcon, NotificationBellIcon } from "../../../assets/NavBarIcons";
import Avatar from "./Avatar";
import SearchBar from "./SearchBar";

const DashboardNavBar = () => {
  return (
    <div className="pl-10 w-full flex items-center justify-between">
      <div>
        <SearchBar />
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="flex items-center gap-3">
          <Avatar
            img={
              "https://res.cloudinary.com/dw5pctae7/image/upload/v1737712422/cld-sample.jpg"
            }
          />
          <div className="flex flex-col gap-0">
            <span className="font-semibold text-[16px] capitalize">
              {localStorage.getItem("fullName") || "User"}
            </span>
            <span className="text-[#00000080] text-[16px] capitalize">
              {localStorage.getItem("userRole") || "Role"}
            </span>
          </div>
        </div>
        <NotificationBellIcon />
        <MessageIcon />
      </div>
    </div>
  );
};

export default DashboardNavBar;
