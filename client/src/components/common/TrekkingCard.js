import { Trekking } from "@/lib/data";
import ClockIcon from "@/ui/ClockIcon";
import React from "react";

const TrekkingCard = () => {
  return (
    <section className="py-5 w-full">
      <div className="text-black flex flex-col gap-10 justify-center items-center flex-wrap">
        {Trekking.map((value, index) => (
          <span key={index}>
            <h1 className="font-semibold text-[30px] py-[10px] ">
              {value.region} :
            </h1>
            <section className="flex flex-col sm:flex-row justify-center items-center w-[full] gap-10">
              {value.tours.map((tours, index) => (
                <div
                  className="pb-[10px] w-[400px] shadow-md rounded-lg overflow-hidden object-cover "
                  key={index}
                >
                  <img
                    src={tours.imageUrl}
                    className="h-[250px] w-full object-cover"
                  />
                  <h1 className="p-[10px] text-blue-600 font-semibold text-[20px]">
                    {tours.name}
                  </h1>
                  <span className="text-gray-500 px-[10px] flex gap-2 items-center">
                    <ClockIcon /> {tours.duration}
                  </span>
                  <p className="text-2xl p-[10px] font-bold">$ {tours.price}</p>
                </div>
              ))}
            </section>
          </span>
        ))}
      </div>
    </section>
  );
};

export default TrekkingCard;
