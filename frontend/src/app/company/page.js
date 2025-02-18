import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "../../assets/assets";
import Head from "next/head";

const Company = () => {
  return (
   <>
      <Head>
        <title>About Our Company - Premium Vehicle Rental Services</title>
        <meta
          name="description"
          content="Learn more about our premium vehicle rental company. We provide top-notch rental services for cars, helicopters, and more in Nepal."
        />
      </Head>
    <section className="text-[#F9F9F9] flex flex-col gap-16">
      {/* Company Section */}
      <article className="flex flex-col gap-12 px-5">
        {/* Heading & Paragraph */}
        <header className="text-center">
          <h1 className="font-Comfortaa font-bold text-primary text-[36px] md:text-[48px]">
            Our Company
          </h1>
          <p className="text-[14px] font-light leading-[18px] max-w-[90%] md:max-w-[785px] text-subheading mx-auto">
            Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
            dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
            eros. Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
            dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
            eros.
          </p>
        </header>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src={assets.contact1.src} // Use .src
            alt="Contact our company for more information."
            width={assets.contact1.width}
            height={assets.contact1.height}
            className="w-full max-w-[600px] md:max-w-[1190px] h-auto"
          />
        </div>
      </article>

      {/* Our Mission Section */}
      <section className="flex flex-col md:flex-row justify-center items-center w-full px-5 md:px-10 h-auto md:h-[537px] gap-10">
        {/* Left Column: Mission Text */}
        <article className="w-full md:w-1/2 flex flex-col gap-6 justify-center px-4">
          <h2 className="font-Comfortaa font-bold text-primary text-[36px] md:text-[48px] text-left">
            Our Mission
          </h2>
          <p className="text-[14px] font-light leading-[18px] text-left max-w-full md:max-w-[80%] text-subheading">
            Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
            dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
            eros. Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
            dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
            eros.
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
                className="h-3.5 w-3.5"
              />
            </button>
          </Link>
        </article>

        {/* Right Column: Car Image */}
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
    </section>
   </>
  );
};

export default Company;
