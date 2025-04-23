"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import BlogSkeleton from "../loader/blogSkeleton";

const Blog = ({ loading, vehicles, limit = 6 }) => {
  const displayedVehicles = limit
    ? vehicles?.data?.vehicles?.slice(0, limit)
    : vehicles?.data?.vehicles;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-6 items-end justify-center">
        {loading ? (
          <BlogSkeleton limit={limit} />
        ) : displayedVehicles?.length > 0 ? (
          displayedVehicles.map((vehicle, index) => (
            <div
              key={vehicle.id || index}
              className="w-[312px] h-[422px] bg-white border rounded-3xl hover:shadow-2xl transition-shadow border-gray-300 gap-2.5 shadow-lg overflow-hidden"
              style={{ transform: `translateY(-${index * 10}px)` }}
            >
              <div className="h-full flex flex-col p-4">
                <Image
                  src={vehicle.image || assets.blog.src}
                  width={200}
                  height={211}
                  className="w-full h-[211px] object-cover rounded"
                  alt={`Image of ${vehicle.name}`}
                  priority={index === 0}
                />
                <p className="text-primary mt-2.5 leading-[18px] font-normal font-Comfortaa">
                  July 12, 2020
                </p>
                <h2 className="mt-2.5 font-bold text-2xl text-primary leading-[22px]">
                  Chitwan Sauraha Tours
                </h2>
                <p className="text-xs mt-2.5 text-subheading">
                  Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
                  dignissim morbi egestas interdum viverra. Ac sed in egestas
                  mattis eros. Lorem ipsum dolor sit amet consectetur. Malesuada
                  a purus eu dignissim morbi egestas interdum viverra. Ac sed in
                  egestas mattis eros.
                </p>
                <div className="flex justify-end items-center mt-auto">
                  <button className="text-[#222121] flex items-center justify-end gap-2.5 hover:bg-primary px-6 py-2 rounded-2xl font-bold hover:bg-primary-dark transition-colors">
                    <p>Read More</p>
                    <Image
                      src={assets.rightArrow.src}
                      alt="Arrow pointing to more information"
                      width={20}
                      height={20}
                      className="h-4 w-4"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            <p className="font-bold text-2xl text-red-500">No Vlogs found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
