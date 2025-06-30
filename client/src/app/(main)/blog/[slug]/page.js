import BlogCard from "@/components/common/BlogCard";
import { baseURL } from "@/config/config";

async function getBlog(slug) {
  try {
    const res = await fetch(`${baseURL}/blog/by-name?name=${slug}`, {
      cache: "no-store", // or revalidate: 0 if using next 14+ cache strategy
    });
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export default async function Page({ params }) {
  const blogData = await getBlog(params.slug);

  if (!blogData) {
    return (
      <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen">
        <div className="text-center py-10 text-xl text-red-500">
          Blog not found.
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen px-2 sm:px-4">
      <img
        src={blogData.coverImage || "/blog.jpg"}
        className="w-full max-w-[1250px] h-[220px] sm:h-[350px] md:h-[500px] lg:h-[750px] self-center my-5 rounded-lg object-cover"
        alt={blogData.mainTitle}
      />
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-[50px] mb-5 w-full">
        <div className="w-full lg:w-[750px]">
          <h1 className="text-primary font-Comfortaa text-2xl sm:text-3xl font-medium">
            {blogData.mainTitle}
          </h1>
          <p className="text-primary font-semibold text-lg sm:text-xl">
            {blogData.date}
          </p>
          {(blogData.content || []).map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h2 className="text-lg sm:text-xl font-bold pt-4 underline">
                  {section.title}
                </h2>
              )}
              {section.imageUrl && (
                <img
                  src={section.imageUrl}
                  className="py-5 rounded-lg w-full"
                  alt={section.title || "Blog Section"}
                />
              )}
              <p className="text-base sm:text-lg text-gray-500">
                {section.description}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-[325px] mt-8 lg:mt-0">
          <p className="text-primary underline text-lg sm:text-xl font-Comfortaa pb-5">
            Related Posts
          </p>
          <BlogCard />
        </div>
      </div>
    </section>
  );
}
