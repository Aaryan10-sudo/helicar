import BlogCard from "@/components/common/BlogCard";
import { Blog } from "@/lib/data";
import Image from "next/image";

const bloglanding = {
  title: "Our Blogs",
  name: "landingimage",
  imageUrl: "/blog.jpg",
  description:
    "Welcome to our blog  and here you can explore all the recent activities of the week or the monthWelcome to our blog  and here you can explore all the recent activities of the week or the month",
};
const categories = [{ title: "Recent", link: "" }];

const page = () => {
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center gap-7 py-5 w-full justify-center">
        <h1 className="text-primary text-4xl font-semibold">
          {bloglanding.title}
        </h1>
        <p className="text-gray-600 px-[50px] text-center max-w-[1000px]">
          {bloglanding.description}
        </p>
        <Image
          src={bloglanding.imageUrl}
          alt={bloglanding.name}
          height={500}
          width={1300}
          className="object-cover rounded-lg"
        />
        <div className="w-[1300px]">
          <ul className="flex flex-wrap max-w-[1700px] mx-auto gap-10">
            {Blog.map((blog, index) => (
              <li
                key={index}
                className="text-gray-600 text-lg font-medium my-2 cursor-pointer hover:text-primary"
              >
                {blog.category}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-wrap justify-center gap-10 py-5">
        <BlogCard />
      </section>
    </main>
  );
};

export default page;
