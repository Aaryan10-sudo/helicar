import React from "react";
import mustangImage from "../../assets/mustang.jpg";
import luklaImage from "../../assets/lukla.jpg";
import pokharaImage from "../../assets/pokhara.jpg";

const PopularDestination = () => {
  return (
    <main className="px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto py-12 lg:py-20">
      <section className="mb-8 lg:mb-12 flex flex-col gap-2.5">
        <h1 className="text-3xl sm:text-center font-Comfortaa sm:text-4xl md:text-5xl text-primary font-bold">
          Popular Destination
        </h1>
        <p className="text-[14px] md:text-[16px] text-start font-light leading-[18px] md:leading-[22px] max-w-[90%] md:max-w-[785px] text-subheading mx-auto">
          Explore Nepal like never before with our top-notch vehicle rental
          services. Travel with ease and comfort, discovering breathtaking
          landscapes, rich cultures, and unforgettable experiences. Your
          adventure starts here!
        </p>
      </section>
      <div className="flex justify-between gap-5">
        <div
          className="bg-black w-[370px] h-[440px] rounded-lg bg-cover flex flex-col justify-end overflow-hidden"
          style={{
            backgroundImage: `url(${mustangImage?.src || "/default-hero.jpg"})`,
          }}
        >
          <div
            className="w-full h-[80px] flex justify-center items-center"
            style={{ backgroundColor: "rgba(226, 232, 240, 0.55)" }}
          >
            <h1 className="text-[30px] font-medium text-black">Mustang</h1>
          </div>
        </div>
        <div
          className="bg-black w-[370px] h-[440px] rounded-lg bg-cover flex flex-col justify-end overflow-hidden"
          style={{
            backgroundImage: `url(${luklaImage?.src || "/default-hero.jpg"})`,
          }}
        >
          <div
            className="w-full h-[80px] flex justify-center items-center"
            style={{ backgroundColor: "rgba(226, 232, 240, 0.55)" }}
          >
            <h1 className="text-[30px] font-medium text-black">Lukla</h1>
          </div>
        </div>
        <div
          className="bg-black w-[370px] h-[440px] rounded-lg bg-cover flex flex-col justify-end overflow-hidden"
          style={{
            backgroundImage: `url(${pokharaImage?.src || "/default-hero.jpg"})`,
          }}
        >
          <div
            className="w-full h-[80px] flex justify-center items-center"
            style={{ backgroundColor: "rgba(226, 232, 240, 0.55)" }}
          >
            <h1 className="text-[30px] font-medium text-black">Pokhara</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PopularDestination;
