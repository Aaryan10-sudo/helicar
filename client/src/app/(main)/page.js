"use client";
import Blog from "@/components/common/Blog";
import Enquiry from "@/components/common/Enquiry";
import FAQ from "@/components/common/FAQ";
import Hero from "@/components/common/Hero";
import OurMission from "@/components/common/OurMission";
import PopularDestination from "@/components/common/PopularDestination";
import Rating from "@/components/common/Rating";
import WhyUs from "@/components/common/WhyUs";
import { baseURL } from "@/config/config";
import useGetVehicle from "@/hooks/useVehicle";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const { loading, vehicles } = useGetVehicle();
  const [reviews, setReviews] = useState();
  // const [loading, setLoading] = useState(true);
  console.log("bsss",reviews);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/client-reviews`);
     setReviews(response.data.data.content);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <section>
        <Hero />
        <PopularDestination />

        <WhyUs />
        <section className="w-full flex flex-col items-center py-10 px-4 lg:px-16">
          <Blog limit={3} loading={loading} vehicles={vehicles} />
          <OurMission />
          <div className="text-center mb-6 flex flex-col gap-4 lg:mb-10">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-Comfortaa text-primary font-bold">
                {reviews?.header || "Why Choose Us?"}
              </h1>
              <p className="text-sm md:text-base text-gray-600 max-w-[90%] md:max-w-[785px] mx-auto mt-2">
                {reviews?.headerDescription}
              </p>
            </div>
            <Rating />
          </div>
        </section>
        <Enquiry />
        <FAQ />
      </section>
    </div>
  );
}
