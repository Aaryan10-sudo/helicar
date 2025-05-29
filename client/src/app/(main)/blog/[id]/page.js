"use client";
import BlogCard from "@/components/common/BlogCard";
import { Blog } from "@/lib/data";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const id = params.id;

  const blogData = Blog.find((item) => item.id === parseInt(id));
  console.log(blogData);

  return (
    <section className="flex flex-col max-w-[1700px] mx-auto">
      <img
        src={"/blog.jpg"}
        className="w-[1250px] h-[750px] self-center my-5 rounded-lg"
      />
      <span className=" flex justify-center items-start gap-[50px]">
        <div className="w-[750px]">
          <h1 className="text-primary font-Comfortaa text-[25px] font-medium">
            {blogData.title}
          </h1>
          <p className="text-primary font-semibold text-[20px]">
            {blogData.date}
          </p>
          <p className="text-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Fusce quis erat nec
            enim dignissim condimentum. Nullam nec orci nec lacus ultricies
            lacinia. Duis vel magna feugiat, vulputate ante sit amet, rhoncus
            odio. Vestibulum scelerisque turpis vel sapien scelerisque luctus.
            Maecenas ac metus ac est congue volutpat. Nulla facilisi. Nam ac
            sapien euismod, dictum lorem id, sollicitudin odio. Aliquam erat
            volutpat. Suspendisse consectetur magna vitae orci tincidunt, at
            cursus nisi rhoncus. In in efficitur neque. Nullam nec tellus in
            eros luctus posuere. Suspendisse potenti. Pellentesque a dui eget
            nunc faucibus vulputate. Vestibulum fermentum justo nec hendrerit
            suscipit. Vivamus a risus sed justo egestas suscipit. Nulla
            convallis purus nec tincidunt vestibulum. Donec nec leo at lorem
            porttitor tristique. Sed sed nulla sed neque eleifend tempus. Duis
            porttitor purus vitae leo viverra sollicitudin. Curabitur accumsan
            nisi sapien, sed efficitur lacus tempor eget. Sed sit amet arcu eget
            sapien hendrerit faucibus. Proin vestibulum varius quam, in dapibus
            felis convallis a. Integer at massa vel elit convallis congue. Nam
            tincidunt nisi et ligula volutpat, sed vehicula justo tristique.
            Etiam luctus, velit ut malesuada sodales, elit tellus egestas augue,
            in hendrerit orci felis sed purus. Etiam nec augue at justo ultrices
            tincidunt. Nullam eu erat nec velit facilisis pulvinar. Nulla
            facilisi. Maecenas ac velit quis leo cursus gravida. Integer posuere
            erat in neque placerat, ut fermentum massa tincidunt. Mauris ornare,
            ipsum a tempor convallis, orci tellus suscipit orci, a hendrerit
            nulla justo id sapien. Etiam commodo, lorem nec tincidunt pulvinar,
            urna leo laoreet elit, et hendrerit purus ante vitae eros. Cras
            rutru
          </p>
          <img src={"/blog.jpg"} className="py-5 rounded-lg" />
          <p className="text-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Fusce quis erat nec
            enim dignissim condimentum. Nullam nec orci nec lacus ultricies
            lacinia. Duis vel magna feugiat, vulputate ante sit amet, rhoncus
            odio. Vestibulum scelerisque turpis vel sapien scelerisque luctus.
            Maecenas ac metus ac est congue volutpat. Nulla facilisi. Nam ac
            sapien euismod, dictum lorem id, sollicitudin odio. Aliquam erat
            volutpat. Suspendisse consectetur magna vitae orci tincidunt, at
            cursus nisi rhoncus. In in efficitur neque. Nullam nec tellus in
            eros luctus posuere. Suspendisse potenti. Pellentesque a dui eget
            nunc faucibus vulputate. Vestibulum fermentum justo nec hendrerit
            suscipit. Vivamus a risus sed justo egestas suscipit. Nulla
            convallis purus nec tincidunt vestibulum. Donec nec leo at lorem
            porttitor tristique. Sed sed nulla sed neque eleifend tempus. Duis
            porttitor purus vitae leo viverra sollicitudin. Curabitur accumsan
            nisi sapien, sed efficitur lacus tempor eget. Sed sit amet arcu eget
            sapien hendrerit faucibus. Proin vestibulum varius quam, in dapibus
            felis convallis a. Integer at massa vel elit convallis congue. Nam
            tincidunt nisi et ligula volutpat, sed vehicula justo tristique.
            Etiam luctus, velit ut malesuada sodales, elit tellus egestas augue,
            in hendrerit orci felis sed purus. Etiam nec augue at justo ultrices
            tincidunt. Nullam eu erat nec velit facilisis pulvinar. Nulla
            facilisi. Maecenas ac velit quis leo cursus gravida. Integer posuere
            erat in neque placerat, ut fermentum massa tincidunt. Mauris ornare,
            ipsum a tempor convallis, orci tellus suscipit orci, a hendrerit
            nulla justo id sapien. Etiam commodo, lorem nec tincidunt pulvinar,
            urna leo laoreet elit, et hendrerit purus ante vitae eros. Cras
            rutru
          </p>
          <img src={"/blog.jpg"} className="py-5 rounded-lg" />
        </div>
        <div className="w-[325px]">
          <p className="text-primary underline text-[20px] font-Comfortaa pb-5">
            Related Posts
          </p>
          <BlogCard />
        </div>
      </span>
    </section>
  );
};

export default Page;
