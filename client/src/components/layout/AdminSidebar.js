"use client";
import { assets } from "@/assets/assets";
import Blogicon from "@/ui/Blogicon";
import BookingIcon from "@/ui/BookingIcon";
import DashboardIcon from "@/ui/DashboardIcon";
import DetailsIcon from "@/ui/DetailsIcon";
import EnquiryIcon from "@/ui/EnquiryIcon";
import PagesIcon from "@/ui/PageIcon";
import ReviewIcon from "@/ui/ReviewIcon";
import ServicesIcon from "@/ui/ServicesIcon";
import SettingsIcon from "@/ui/SettingsIcon";
import UserIcon from "@/ui/UserIcon";
import VehicleIcon from "@/ui/VehicleIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  const adminDashboardItems = [
    { title: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { title: "Details", icon: <DetailsIcon />, path: "/admin/details" },
    { title: "Pages", icon: <PagesIcon />, path: "/admin/pages" },
    { title: "Servies", icon: <ServicesIcon />, path: "/admin/services" },
    { title: "Vehicles", icon: <VehicleIcon />, path: "/admin/vehicles" },
    { title: "Blog", icon: <Blogicon />, path: "/admin/blog" },
    { title: "Booking", icon: <BookingIcon />, path: "/admin/booking" },
    {
      title: "General Settings",
      icon: <SettingsIcon />,
      path: "/admin/general-settings",
    },
    { title: "Enquiry", icon: <EnquiryIcon />, path: "/admin/enquiry" },
    { title: "Review", icon: <ReviewIcon />, path: "/admin/review" },
    { title: "Users", icon: <UserIcon />, path: "/admin/users" },
  ];

  return (
    <div>
      <section className="flex items-start gap-10 flex-col bg-white sm:w-[280px] h-screen px-2 py-6 shadow-xl">
        <Link
          href={"/admin"}
          className="flex gap-2 items-center cursor-pointer"
        >
          <Image
            src={assets.navlogo.src}
            height={assets.navlogo.height}
            width={assets.navlogo.width}
            alt="navlogo"
            className="w-[50px]"
          />
          <h1 className="text-blue-500 text-xl font-bold hidden sm:block">
            Helicar Booking
          </h1>
        </Link>

        <div className="flex flex-col gap-2 w-full">
          {adminDashboardItems.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={index}
                href={item.path}
                className={`flex items-center justify-center sm:justify-start gap-4 w-full sm:px-4 py-2 rounded-md transition ${
                  isActive ? "bg-gray-300" : "hover:bg-gray-300"
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:block">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AdminSidebar;
