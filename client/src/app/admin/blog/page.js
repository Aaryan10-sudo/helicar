"use client";

import UploadIcon from "@/ui/Uploadicon";
import { useState } from "react";

export default function BlogSection() {
  const [activeTab, setActiveTab] = useState("card1");

  return (
    <div className="p-6  mx-auto w-full h-autorounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4">Landing page Customization</h2>

      <div className=" rounded-xl p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Blog Section</h3>
          <button className=" px-3 py-1 flex items-center justify-center rounded-sm">
            Update
          </button>
        </div>

        <div value={activeTab} onValueChange={setActiveTab}>
          <span className="mb-4 flex gap-3">
            <button
              value="card1"
              className="bg-gray-100 border border-gray-900 rounded-sm px-2 py-1"
            >
              Card 1
            </button>
            <button
              value="card2"
              className="bg-gray-100 border border-gray-900 rounded-sm px-2 py-1"
            >
              Card 1
            </button>
            <button
              value="card3"
              className="bg-gray-100 border border-gray-900 rounded-sm px-2 py-1"
            >
              Card 1
            </button>
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-5 justify-start ">
            <label className="block text-sm font-medium">Date</label>
            <div className="relative mt-1 gap-2 flex items-start">
              <input
                className="pr-10 outline-none border border-gray-300 px-3 py-2 placeholder:text-gray-50 rounded-sm"
                type="date"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Card Image</label>
            <input className="mt-1 flex justify-center items-center border border-dashed rounded-lg h-48 text-center text-sm text-gray-500" />
            <div>
              <UploadIcon />
              <p className="font-semibold">Drag your images here</p>
              <p className="text-xs text-gray-400">
                (Only *.jpeg, *.jpg, *.png images will accepted)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Blog Heading</label>
            <input
              placeholder="Are you ready travel with us ?"
              className="w-full px-3 py-2 outline-none border border-gray-400 rounded-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              placeholder="Are you ready travel with us ? "
              className="w-full outline-none border border-gray-400 rounded-sm px-3 py-2 resize-none h-[100px]"
            />
          </div>

          <div className="flex items-center justify-start gap-6">
            <button
              disabled
              className="opacity-50 border border-gray-500 rounded-sm cursor-pointer px-5 py-3"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
