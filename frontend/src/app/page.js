"use client";
import { assets } from "@/assets/assets";
import Blog from "@/components/common/Blog";
import Hero from "@/components/common/Hero";
import OurMission from "@/components/common/OurMission";
import PopularVehicles from "@/components/common/PopularVehicle";
import Rating from "@/components/common/Rating";
import WhyUs from "@/components/common/WhyUs";
import useGetVehicle from "@/hooks/useVehicle";
import Image from "next/image";


export default function Home() {
  const { loading, vehicles } = useGetVehicle();

  return (
    <div>
      <section>
       <Hero/>
       <div className="px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto py-12 lg:py-20">
          <div className="mb-8 lg:mb-12 flex flex-col gap-2.5">
            <h1 className="text-3xl sm:text-center font-Comfortaa sm:text-4xl md:text-5xl text-primary font-bold">
              Popular Services:
            </h1>
            <p className="text-[14px] md:text-[16px] text-start font-light leading-[18px] md:leading-[22px] max-w-[90%] md:max-w-[785px] text-subheading mx-auto">
            Explore Nepal like never before with our top-notch vehicle rental services. 
            Travel with ease and comfort, discovering breathtaking landscapes, rich cultures, and unforgettable experiences. 
            Your adventure starts here!
          </p>
          </div>
          <PopularVehicles loading={loading} limit={3} vehicles={vehicles} />
        </div>
        <WhyUs/>
          <section className="w-full flex flex-col items-center py-10 px-4 lg:px-16">
              {/* Heading Section */}
              <div className="text-center mb-6 lg:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-Comfortaa text-primary font-bold">
                  Blogs
                </h1>
                <p className="text-sm md:text-base text-gray-600 max-w-[90%] md:max-w-[785px] mx-auto mt-2">
                  Explore Nepal like never before with our top-notch vehicle rental services. 
                  Travel with ease and comfort, discovering breathtaking landscapes, rich cultures, and unforgettable experiences. 
                  Your adventure starts here!
                </p>
              </div>
        
              {/* Content Section */}
              <Blog limit={3} loading={loading} vehicles={vehicles} />
              <OurMission/>
              <div className="text-center mb-6 flex flex-col gap-4 lg:mb-10">
               <div>
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-Comfortaa text-primary font-bold">
                  What Clients Say About Us
                </h1>
                <p className="text-sm md:text-base text-gray-600 max-w-[90%] md:max-w-[785px] mx-auto mt-2">
                  Explore Nepal like never before with our top-notch vehicle rental services. 
                  Travel with ease and comfort, discovering breathtaking landscapes, rich cultures, and unforgettable experiences. 
                  Your adventure starts here!
                </p>
               </div>
                <Rating/>
              </div>
            </section>
      </section>
    </div>
  );
}
