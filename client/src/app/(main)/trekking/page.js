import { assets } from "@/assets/assets";
import TrekkingCard from "@/components/common/TrekkingCard";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Head>
        <title className="my-5">Trekking</title>
        <meta
          name="description"
          content="Learn more about our premium vehicle rental company. We provide top-notch rental services for cars, helicopters, and more in Nepal."
        />
      </Head>
      <section className="text-[#F9F9F9] flex flex-col gap-16">
        <article className="flex flex-col gap-12 px-5">
          <header className="text-center">
            <h1 className="font-Comfortaa font-bold text-primary text-[36px] md:text-[48px]">
              Trekking
            </h1>
            <p className="text-[14px] font-light leading-[18px] max-w-[100%] md:max-w-[785px] text-subheading mx-auto">
              Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
              dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
              eros. Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
              dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
              eros.
            </p>
          </header>

          {/* Image */}
          <div className="flex justify-center gap-10">
            <Image
              src={assets.contact1.src} // Use .src
              alt="Contact our company for more information."
              width={300}
              height={300}
              className="w-full max-w-[600px] md:max-w-[1190px] h-auto"
            />
            <span className="text-black flex justify-center items-center px-[10px] font-semibold text-[20px]">
              Trekking in Nepal is indeed a remarkable experience, offering a
              unique blend of natural beauty, cultural diversity, and warm
              hospitality from the local people. Here are some key points that
              highlight the appeal of trekking in Nepal: Spectacular Landscapes:
              Nepal is renowned for its stunning landscapes, with the majestic
              Himalayas serving as the backdrop. Trekkers can explore a wide
              range of terrain, from lush forests to rugged mountain passes and
              picturesque valleys. Cultural Diversity: Nepal is a melting pot of
              cultures and ethnic groups. Trekking in different regions allows
              you to interact with various ethnic communities, each with its own
              traditions, languages, and lifestyles. Flora and Fauna: The
              country’s biodiversity is rich and diverse. While trekking, you
              can encounter a wide variety of plant and animal species, from
              rhododendron forests to rare wildlife like snow leopards and red
              pandas.
            </span>
          </div>
        </article>
        <section className="px-10">
          <h1 className="text-blue-600  font-bold text-[40px] flex justify-center items-center">
            Trekking Packages
          </h1>
          <TrekkingCard />
        </section>
      </section>
    </>
  );
};

export default page;
