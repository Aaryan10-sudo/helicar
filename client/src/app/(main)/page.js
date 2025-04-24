"use client";
import Blog from "@/components/common/Blog";
import Enquiry from "@/components/common/Enquiry";
import FAQ from "@/components/common/FAQ";
import Hero from "@/components/common/Hero";
import OurMission from "@/components/common/OurMission";
import PopularDestination from "@/components/common/PopularDestination";
import Rating from "@/components/common/Rating";
import WhyUs from "@/components/common/WhyUs";
import useGetVehicle from "@/hooks/useVehicle";

export default function Home() {
  const { loading, vehicles } = useGetVehicle();

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
                What Clients Say About Us
              </h1>
              <p className="text-sm md:text-base text-gray-600 max-w-[90%] md:max-w-[785px] mx-auto mt-2">
                Explore Nepal like never before with our top-notch vehicle
                rental services. Travel with ease and comfort, discovering
                breathtaking landscapes, rich cultures, and unforgettable
                experiences. Your adventure starts here!
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
