import BlogCard from "@/components/common/BlogCard";
import { baseURL } from "@/config/config";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  console.log("=== GENERATING STATIC PARAMS ===");
  console.log("BaseURL:", baseURL);

  try {
    const fullUrl = `${baseURL}/blog/all`;
    console.log("Fetching from:", fullUrl);

    const res = await fetch(fullUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      console.error(`API call failed: ${res.status} ${res.statusText}`);
      // Return empty array to let Next.js handle dynamic routing
      return [];
    }

    // Check if response is JSON
    const contentType = res.headers.get("content-type");
    console.log("Content-Type:", contentType);

    if (!contentType || !contentType.includes("application/json")) {
      console.error("Response is not JSON!");
      const text = await res.text();
      console.error("Response body (first 500 chars):", text.substring(0, 500));
      return [];
    }

    const data = await res.json();
    console.log("API Response:", data);

    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error("Invalid data structure:", data);
      return [];
    }

    const params = data.data.map((blog) => {
      const slug = blog.slug || blog.name;
      console.log(
        "Processing blog:",
        blog.name || blog.title,
        "-> slug:",
        slug
      );
      return {
        slug: encodeURIComponent(slug),
      };
    });

    console.log("Generated params:", params);
    return params;
  } catch (error) {
    console.error("=== ERROR IN GENERATE STATIC PARAMS ===");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    console.error("BaseURL:", baseURL);

    // Return empty array to fallback to dynamic routing
    return [];
  }
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  console.log("=== BLOG PAGE RENDER ===");
  console.log("Original slug:", slug);
  console.log("Decoded slug:", decodedSlug);

  try {
    const fullUrl = `${baseURL}/blog/by-name?name=${decodedSlug}`;
    console.log("Fetching blog from:", fullUrl);

    const res = await fetch(fullUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Blog fetch status:", res.status);

    if (!res.ok) {
      console.error(`Blog fetch failed: ${res.status} ${res.statusText}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Blog data received:", !!data?.data);

    const blogData = data?.data;

    if (!blogData) {
      console.error("No blog data found");
      return (
        <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen">
          <div className="text-center py-10 text-xl text-red-500">
            Blog not found.
          </div>
        </section>
      );
    }

    console.log("Rendering blog:", blogData.mainTitle);

    return (
      <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen px-2 sm:px-4">
        <img
          src={blogData.coverImage || "/blog.jpg"}
          className="w-full max-w-[1250px] h-[220px] sm:h-[350px] md:h-[500px] lg:h-[750px] self-center my-5 rounded-lg object-cover"
          alt={blogData.mainTitle || "Blog cover"}
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
                    src={section.imageUrl || "/placeholder.svg"}
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
  } catch (error) {
    console.error("=== ERROR FETCHING BLOG ===");
    console.error("Error:", error.message);
    console.error("Slug:", decodedSlug);
    console.error("BaseURL:", baseURL);

    return (
      <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen">
        <div className="text-center py-10 text-xl text-red-500">
          Error loading blog post. Please try again later.
        </div>
      </section>
    );
  }
}
