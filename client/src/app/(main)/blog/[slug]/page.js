import BlogCard from "@/components/common/BlogCard";
import { baseURL } from "@/config/config";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    console.log("🔄 Generating static params...");
    console.log("📍 BaseURL:", baseURL);

    const res = await fetch(`${baseURL}/blog/all`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `❌ Static params fetch failed: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const data = await res.json();
    console.log(
      `✅ Found ${data?.data?.length || 0} blogs for static generation`
    );

    return (data.data || []).map((blog) => ({
      slug: encodeURIComponent(blog.slug || blog.name),
    }));
  } catch (error) {
    console.error("❌ Error in generateStaticParams:", error.message);
    return [];
  }
}

export default async function BlogPage({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${baseURL}/blog/by-slug?slug=${slug}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("🔍 Response status:", res.status);
    console.log("🔍 Response OK:", res.ok);
    console.log(
      "🔍 Response headers:",
      Object.fromEntries(res.headers.entries())
    );

    if (!res.ok) {
      console.error(`❌ Blog fetch failed: ${res.status} ${res.statusText}`);
      const errorText = await res.text();
      console.error("❌ Error response body:", errorText.substring(0, 500));

      return (
        <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen">
          <div className="text-center py-10 text-xl text-red-500">
            Blog fetch failed: {res.status} {res.statusText}
            <br />
            <small className="text-sm">Check console for details</small>
          </div>
        </section>
      );
    }

    // Check content type before parsing
    const contentType = res.headers.get("content-type");
    console.log("🔍 Content-Type:", contentType);

    if (!contentType?.includes("application/json")) {
      const textResponse = await res.text();
      console.error("❌ Expected JSON but got:", contentType);
      console.error("❌ Response body:", textResponse.substring(0, 500));

      return (
        <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen">
          <div className="text-center py-10 text-xl text-red-500">
            API returned non-JSON response
            <br />
            <small className="text-sm">Expected JSON, got: {contentType}</small>
          </div>
        </section>
      );
    }

    const data = await res.json();
    console.log("🔍 API Response structure:", {
      hasData: !!data,
      hasDataProperty: !!data?.data,
      dataKeys: data ? Object.keys(data) : [],
      blogDataKeys: data?.data ? Object.keys(data.data) : [],
    });

    const blogData = data?.data;

    if (!blogData) {
      console.error("❌ No blog data found in response");
      console.error("❌ Full response:", JSON.stringify(data, null, 2));

      return (
        <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen">
          <div className="text-center py-10 text-xl text-red-500">
            Blog not found.
            <br />
            <small className="text-sm">Slug: {decodedSlug}</small>
          </div>
        </section>
      );
    }

    console.log("✅ Successfully loaded blog:", blogData.mainTitle);

    return (
      <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen px-2 sm:px-4">
        <img
          src={blogData.coverImage || "/blog.jpg"}
          className="w-full max-w-[1250px] h-[220px] sm:h-[350px] md:h-[500px] lg:h-[750px] self-center my-5 rounded-lg object-cover"
          alt={blogData.mainTitle || "Blog cover"}
        />
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-[50px] mb-5 w-full">
          <div className="w-full lg:w-[850px]">
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
    console.error("=== CRITICAL ERROR ===");
    console.error("❌ Error:", error.message);
    console.error("❌ Stack:", error.stack);
    console.error("❌ Slug:", decodedSlug);
    console.error("❌ BaseURL:", baseURL);

    return (
      <section className="flex flex-col max-w-[1700px] mx-auto min-h-screen">
        <div className="text-center py-10 text-xl text-red-500">
          Error loading blog post: {error.message}
          <br />
          <small className="text-sm text-gray-500">
            Check console for details
          </small>
        </div>
      </section>
    );
  }
}
