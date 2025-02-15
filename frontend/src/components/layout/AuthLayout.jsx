import { Outlet } from "react-router-dom";
import authBgImg from "../../assets/AuthLayoutPhoto.png";
import { assets } from "../../assets/assets";

const AuthLayout = () => {
  return (
    <div className="md:bg-primary flex h-dvh items-center justify-center bg-white px-0 md:px-[100px]">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white md:h-[600px] md:w-[1100px] md:flex-row">
        {/* Image Section (Hidden Below md) */}
        <div className="hidden w-1/2 md:flex">
          <img
            src={authBgImg}
            alt="auth img"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mx-auto mt-[50px] h-[120px] w-[120px] md:hidden">
          <img
            src={assets.reading}
            alt="reading img"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section (Full Width Below md, Centered) */}
        <div className="flex w-full items-center sm:mt-[60px] justify-center md:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
