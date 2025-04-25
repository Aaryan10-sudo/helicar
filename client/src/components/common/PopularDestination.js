import PopularDestinationCard from "./PopularDestinationCard";

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
        <PopularDestinationCard />
      </div>
    </main>
  );
};

export default PopularDestination;
