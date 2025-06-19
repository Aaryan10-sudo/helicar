import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import axios from "axios";
import { baseURL } from "@/config/config";

const WhyUs = () => {
  const [formData, setFormData] = useState({
    mainImage: "",
    features: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/why-choose-us`);
      setFormData(response.data.data.content || { mainImage: "", features: [] } );
    } catch (error) {
     console.error(error);
    }
  };

  return (
    <section className="w-full flex flex-col items-center py-10 px-4 lg:px-16">
      {/* Heading Section */}
      <div className="text-center mb-6 lg:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-Comfortaa text-primary font-bold">
          Why Choose Us
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-[90%] md:max-w-[785px] mx-auto mt-2">
          Explore Nepal like never before with our top-notch vehicle rental
          services. Travel with ease and comfort, discovering breathtaking
          landscapes, rich cultures, and unforgettable experiences. Your
          adventure starts here!
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-wrap justify-center items-center gap-8">
        {/* Main Image */}
        <div className="w-full lg:w-[45%] flex justify-center">
          <Image
            src={formData.mainImage}
            width={assets.whyUs1.width}
            height={assets.whyUs1.height}
            alt="Luxury rental vehicle in Nepal"
            className="w-full max-w-[553px] h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-[50%]">
          {/* Dynamically render features from fetched data */}
          {formData.features && formData.features.length > 0 ? (
            formData.features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <Image
                  src={feature.image || assets.whyUs2.src}
                  width={assets.whyUs2.width}
                  height={assets.whyUs2.height}
                  alt={feature.title || "Feature icon"}
                  className="w-full max-w-[300px] h-auto rounded-lg shadow-md"
                />
                <h2 className="text-xl md:text-2xl font-bold font-Comfortaa mt-3">
                  {feature.title}
                </h2>
                {feature.description && (
                  <p className="text-gray-600 mt-1">{feature.description}</p>
                )}
              </div>
            ))
          ) : (
            // Fallback static features if no data is fetched
            <>
              <div className="flex flex-col items-center text-center">
                <Image
                  src={assets.whyUs2.src}
                  width={assets.whyUs2.width}
                  height={assets.whyUs2.height}
                  alt="Best price guarantee icon"
                  className="w-full max-w-[300px] h-auto rounded-lg shadow-md"
                />
                <h2 className="text-xl md:text-2xl font-bold font-Comfortaa mt-3">
                  Awesome Customer Support
                </h2>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image
                  src={assets.whyUs2.src}
                  width={assets.whyUs2.width}
                  height={assets.whyUs2.height}
                  alt="Best price guarantee icon"
                  className="w-full max-w-[300px] h-auto rounded-lg shadow-md"
                />
                <h2 className="text-xl md:text-2xl font-bold font-Comfortaa mt-3">
                  Best Rate Guarantee
                </h2>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image
                  src={assets.whyUs3.src}
                  width={assets.whyUs3.width}
                  height={assets.whyUs3.height}
                  alt="Reliable customer support"
                  className="w-full max-w-[300px] h-auto rounded-lg shadow-md"
                />
                <h2 className="text-xl md:text-2xl font-bold font-Comfortaa mt-3">
                  24/7 Customer Support
                </h2>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image
                  src={assets.whyUs3.src}
                  width={assets.whyUs3.width}
                  height={assets.whyUs3.height}
                  alt="Reliable customer support"
                  className="w-full max-w-[300px] h-auto rounded-lg shadow-md"
                />
                <h2 className="text-xl md:text-2xl font-bold font-Comfortaa mt-3">
                  24/7 Customer Support
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
