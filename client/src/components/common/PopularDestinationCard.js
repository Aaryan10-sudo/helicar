"use client";
import { Destination } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RightArrowIcon from "@/ui/RightArrowIcon";
import LeftArrowIcon from "@/ui/LeftArrowIcon";

const PopularDestinationCard = () => {
  const router = useRouter();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full">
      <div
        ref={prevRef}
        className="z-10 absolute top-1/2 -left-15 transform -translate-y-1/2 w-10 h-10 rounded-full sm:flex items-center justify-center cursor-pointer  transition hidden"
      >
        <LeftArrowIcon />
      </div>

      <div
        ref={nextRef}
        className="z-10 absolute top-1/2 -right-15 transform -translate-y-1/2 w-10 h-10  bg-opacity-80 rounded-full  sm:flex items-center justify-center cursor-pointer transition hidden"
      >
        <RightArrowIcon />
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {Destination.map((value, index) => (
          <SwiperSlide key={index}>
            <section
              className="w-full h-[440px] rounded-lg bg-cover flex flex-col justify-end overflow-hidden cursor-pointer transition-transform"
              style={{
                backgroundImage: `url(${value.image.src || "/default-hero.jpg"})`,
              }}
              onClick={() => {
                router.push(`/popular-destination?id=${value.id}`);
              }}
            >
              <div
                className="w-full h-[130px] text-white px-5"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.60)" }}
              >
                <h1 className="text-[30px] font-semibold font-Comfortaa">
                  {value.name}
                </h1>
                <p>{value.name} in 7 days</p>
                <span className="flex justify-between items-center">
                  <p className="py-5 font-bold text-[20px]">From 10$</p>
                  <div className="bg-primary h-[30px] w-[60px] flex justify-center items-center rounded-md">
                    -10%
                  </div>
                </span>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularDestinationCard;
