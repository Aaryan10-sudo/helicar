import React from "react";
import blogImage from "../../assets/blogImag.jpg";
import ArrowIcon from "@/ui/ArrowIcon";
import { Blog } from "@/lib/data";

const BlogCard = () => {
  return (
    <section className="flex gap-10 flex-wrap justify-center">
      {Blog.map((value, index) => (
        <div
          key={index}
          className="w-[370px] h-[475px] shadow-xl rounded-xl overflow-hidden"
        >
          <div
            className="bg-slate-100 w-full h-[230px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${blogImage?.src || "/default-hero.jpg"})`,
            }}
          ></div>
          <h2 className="px-5 py-3 text-blue-400 font-semibold">
            {value.date}
          </h2>
          <h1 className="px-5 text-blue-500 font-bold text-xl">
            {value.title}
          </h1>
          <p className="px-5 line-clamp-4 max-h-[100px] py-2">{value.text}</p>
          <button className="p-5 float-right text-xl font-medium flex items-center gap-2 cursor-pointer">
            Read more
            <ArrowIcon />
          </button>
        </div>
      ))}
    </section>
  );
};

export default BlogCard;
