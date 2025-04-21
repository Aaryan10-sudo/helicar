import Blogicon from "@/ui/Blogicon";
import BookingIcon from "@/ui/BookingIcon";
import DashboardIcon from "@/ui/DashboardIcon";
import DetailsIcon from "@/ui/DetailsIcon";
import EnquiryIcon from "@/ui/EnquiryIcon";
import PagesIcon from "@/ui/PagesIcon";
import ReviewIcon from "@/ui/ReviewIcon";
import ServicesIcon from "@/ui/ServicesIcon";
import SettingsIcon from "@/ui/SettingsIcon";
import VehicleIcon from "@/ui/VehicleIcon";
import Link from "next/link";
import React from "react";

const AdminSidebar = () => {
  const adminDashboardItems = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin",
    },
    {
      title: "Details",
      icon: <DetailsIcon />,
      path: "/admin/details",
    },
    {
      title: "Pages",
      icon: <PagesIcon />,
      path: "/admin/pages",
    },
    {
      title: "Servies",
      icon: <ServicesIcon />,
      path: "/admin/services",
    },
    {
      title: "Vechicles",
      icon: <VehicleIcon />,
      path: "/admin/vehicles",
    },
    {
      title: "Blog",
      icon: <Blogicon />,
      path: "/admin/blog",
    },
    {
      title: "Booking",
      icon: <BookingIcon />,
      path: "/admin/booking",
    },
    {
      title: "General Settings",
      icon: <SettingsIcon />,
      path: "/admin/general-settings",
    },
    {
      title: "Enquiry",
      icon: <EnquiryIcon />,
      path: "/admin/enqiry",
    },
    {
      title: "Review",
      icon: <ReviewIcon />,
      path: "/admin/review",
    },
  ];

  return (
    <div>
      <section className="flex items-start justify-center gap-10 flex-col bg-gray-100 w-[280px] h-screen px-4 py-6">
        <div className="flex flex-col gap-2 w-full">
          {adminDashboardItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center gap-4 w-full px-4 py-2 rounded-md hover:bg-gray-300 transition"
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminSidebar;
