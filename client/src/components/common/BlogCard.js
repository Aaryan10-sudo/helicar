"use client";
import { baseURL } from "@/config/config";
import ArrowIcon from "@/ui/ArrowIcon";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const result = await axios({
          method: "GET",
          url: `${baseURL}/blog/`,
        });
        setBlogs(result.data.data || []);
        console.log(`${result} yo ho hai`);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBlogs();
  }, []);
  return (
    <section className="flex gap-10 flex-wrap justify-center">
      {blogs.map((value, index) => (
        <div
          key={index}
          className="w-[370px] h-[475px] shadow-xl rounded-xl overflow-hidden"
        >
          <div
            className="bg-slate-100 w-full h-[230px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${value.coverImage || "/default-hero.jpg"})`,
            }}
          ></div>
          <h2 className="px-5 py-3 text-blue-400 font-semibold">
            {value.date}
          </h2>
          <h1 className="px-5 text-blue-500 font-bold text-xl font-Comfortaa">
            {value.mainTitle}
          </h1>
          <p className="px-5 line-clamp-4 max-h-[100px] py-2">
            {value.content?.[0]?.description || ""}
          </p>
          <Link
            href={`/blog/${encodeURIComponent(value.mainTitle)}`}
            className="p-5 float-right text-xl font-medium flex items-center gap-2 cursor-pointer font-Comfortaa"
          >
            Read more
            <ArrowIcon />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default BlogCard;
