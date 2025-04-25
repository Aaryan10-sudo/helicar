"use client";
import { Destination } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PopularDestinationCard = () => {
  const router = useRouter();

  return (
    <>
      {Destination.map((value, index) => (
        <section
          key={index}
          className=" w-[370px] h-[440px] rounded-lg bg-cover flex flex-col justify-end overflow-hidden cursor-pointer"
          style={{
            backgroundImage: `url(${value.image.src || "/default-hero.jpg"})`,
          }}
          onClick={() => {
            router.push(`/popular-destination?id=${value.id}`);
          }}
        >
          <div
            className="w-full h-[80px] flex justify-center items-center"
            style={{ backgroundColor: "rgba(226, 232, 240, 0.55)" }}
          >
            <h1 className="text-[30px] font-medium text-black">{value.name}</h1>
          </div>
        </section>
      ))}
    </>
  );
};

export default PopularDestinationCard;
