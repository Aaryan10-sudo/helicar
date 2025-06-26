"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import BlogSkeleton from "../loader/blogSkeleton";
import BlogCard from "./BlogCard";

const Blog = ({ loading, vehicles, limit = 6 }) => {
  const displayedVehicles = limit
    ? vehicles?.data?.vehicles?.slice(0, limit)
    : vehicles?.data?.vehicles;

  return (
    <section className="sm:px-4 py-8">
      <div className="sm:text-center mb-6 lg:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl px-4 font-Comfortaa text-primary font-bold">
          Blogs
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-[90%] md:max-w-[785px] mx-auto mt-2">
          Explore Nepal like never before with our top-notch vehicle rental
          services. Travel with ease and comfort, discovering breathtaking
          landscapes, rich cultures, and unforgettable experiences. Your
          adventure starts here!
        </p>
      </div>
      <BlogCard />
    </section>
  );
};

export default Blog;
