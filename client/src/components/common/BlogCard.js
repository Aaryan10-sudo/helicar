import React from "react";
import blogImage from "../../assets/blogImag.jpg";
import ArrowIcon from "@/ui/ArrowIcon";

const blog = [
  {
    date: "Jul 12, 2020",
    title: "Chitwan Sauraha Tours",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua labore et dolore ut labore et dolore magna.",
  },
  {
    date: "Aug 15, 2021",
    title: "Pokhara Adventure",
    text: "Explore the beauty of Pokhara with its serene lakes, breathtaking mountain views, and thrilling adventures. A perfect getaway for nature lovers.",
  },
  {
    date: "Sep 10, 2022",
    title: "Kathmandu Heritage Walk",
    text: "Discover the rich cultural heritage of Kathmandu with its ancient temples, bustling markets, and vibrant traditions.",
  },
];

const BlogCard = () => {
  return (
    <section className="flex gap-10 flex-wrap justify-center">
      {blog.map((value, index) => (
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
