import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurMission = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center w-full px-5 md:px-10 h-auto md:h-[537px] max-w-[1700px] mx-auto">
      <article className="  flex flex-col gap-6 justify-center px-4">
        <h2 className="font-Comfortaa font-bold text-primary text-[36px] md:text-[48px] text-left">
          Our Mission
        </h2>
        <p className="text-[14px] font-light leading-[18px] text-left max-w-full md:max-w-[80%] text-subheading">
          Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu dignissim
          morbi egestas interdum viverra. Ac sed in egestas mattis eros. Lorem
          ipsum dolor sit amet consectetur. Malesuada a purus eu dignissim morbi
          egestas interdum viverra. Ac sed in egestas mattis eros.
        </p>
        <Link href="/about" className="w-fit">
          <button className="bg-primary p-2.5 flex justify-center items-center w-[135px] h-[38px] rounded-[20px] hover:cursor-pointer">
            <p className="font-bold w-[91px] text-white leading-[17.84px]">
              Read More
            </p>
            <Image
              src={assets.rightArrow.src}
              alt="Arrow pointing to more information"
              width={assets.rightArrow.width}
              height={assets.rightArrow.height}
              className="h-3.5 w-3.5 text-white"
            />
          </button>
        </Link>
      </article>

      <div className="w-full md:w-1/2 flex justify-center items-center">
        <Image
          src={assets.contactCar.src}
          alt="Car image representing our transportation services."
          width={assets.contactCar.width}
          height={assets.contactCar.height}
          className="w-full max-w-[500px] h-auto md:block hidden"
        />
      </div>
    </section>
  );
};

export default OurMission;
