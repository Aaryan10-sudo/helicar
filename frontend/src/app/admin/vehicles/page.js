import SettingsIcon from "@/ui/SettingsIcon";
import UploadIcon from "@/ui/UploadIcon";
import Link from "next/link";
import React from "react";

const page = () => {
  const vehicleBoxes = Array(4).fill({
    icon: <UploadIcon />,
    title: "Drag your images here",
    note: "Only *jpeg, *jpg, *png images will accepted",
  });

  return (
    <div className="p-6">
      <section className="flex items-center justify-center flex-col rounded-md bg-[#eaf4fb]   h-auto p-10">
        <div className="">
          <h1 className="text-3xl font-semibold mb-6">
            Landing page Customization
          </h1>

          <div className="bg-gray-50 w-full shadow-md rounded-sm p-8">
            <div className="flex items-center justify-between px-6 py-4 rounded-md ">
              <div className="flex items-center gap-2 text-lg font-medium">
                <SettingsIcon />
                <span>Vehicles</span>
              </div>
              <Link
                href="/vehicles"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
              >
                Update
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6  p-6 rounded-md">
              {vehicleBoxes.map((box, index) => (
                <label
                  key={index}
                  className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-md bg-white text-center cursor-pointer hover:bg-gray-50 transition"
                >
                  <div className="text-blue-500">{box.icon}</div>
                  <p className="mt-2 font-medium">{box.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{box.note}</p>
                  <input type="file" accept=".jpg,.jpeg,.png" hidden />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-16">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Are you ready travel with us?"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center gap-6">
              <label className="block mb-1 font-medium">Description</label>
              <input
                type="text"
                placeholder="Are you ready travel with us?"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
