import BlogCard from "@/components/common/BlogCard";
import { baseURL } from "@/config/config";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    console.log(
      `Fetching metadata for: ${baseURL}/blog/by-name?name=${decodedSlug}`
    );
    const res = await fetch(`${baseURL}/blog/by-name?name=${decodedSlug}`);

    if (!res.ok) {
      console.error(`Metadata fetch failed: ${res.status} ${res.statusText}`);
      return {
        title: "Blog Post",
        description: "Read our latest blog post",
      };
    }

    const data = await res.json();
    return {
      title: data?.data?.mainTitle || "Blog Post",
      description: data?.data?.description || "Read our latest blog post",
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Blog Post",
      description: "Read our latest blog post",
    };
  }
}

// Comment out generateStaticParams for now
// export async function generateStaticParams() {
//   try {
//     console.log(`Fetching all blogs from: ${baseURL}/blog/all`)
//     const res = await fetch(`${baseURL}/blog/all`)

//     // Check if the response is ok
//     if (!res.ok) {
//       console.error(`Static params fetch failed: ${res.status} ${res.statusText}`)
//       return []
//     }

//     // Check content type
//     const contentType = res.headers.get("content-type")
//     if (!contentType || !contentType.includes("application/json")) {
//       console.error(`Expected JSON but got: ${contentType}`)
//       const text = await res.text()
//       console.error("Response body:", text.substring(0, 200) + "...")
//       return []
//     }

//     const data = await res.json()
//     console.log(`Found ${data?.data?.length || 0} blogs`)

//     return (data.data || []).map((blog) => ({
//       slug: encodeURIComponent(blog.slug || blog.name),
//     }))
//   } catch (error) {
//     console.error("Error generating static params:", error)
//     console.error("BaseURL:", baseURL)
//     return []
//   }
// }

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  try {
    console.log(`Fetching blog: ${baseURL}/blog/by-name?name=${decodedSlug}`);
    const res = await fetch(`${baseURL}/blog/by-name?name=${decodedSlug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Blog fetch failed: ${res.status} ${res.statusText}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const blogData = data?.data;

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
    console.error("Error fetching blog data:", error);
    return (
      <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen">
        <div className="text-center py-10 text-xl text-red-500">
          Error loading blog post. Please try again later.
        </div>
      </section>
    );
  }
}
