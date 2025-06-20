import Image from "next/image";
import starImage from "@/assets/star.svg";

const RatingCard = ({ rating }) => {
  const ratingStars = Array.from(
    { length: rating.rating },
    (_, index) => index < rating.rating 
  );
  // console.log("ratindksjbasfjdb",rating);
  return (
    <div className="relative bg-[#F5F5F5] shadow-lg rounded-3xl flex items-center p-6 w-full max-w-[400px] sm:max-w-[325px] h-[160px]">
      <div
        className="absolute bg-cover bg-center left-[-33px] z-10 top-[-10px] border-subheading border-[2px] rounded-full overflow-hidden h-[186px] w-[110px]"
        style={{
          backgroundImage: `url(${rating.photo || "@/assets/women.svg"})`,
        }}
      ></div>

      <div className="flex flex-col w-full justify-center items-start pl-20 pr-4">
        <h1 className="text-[#222121] font-Comfortaa font-bold text-lg leading-7">
          {rating.name || "Anonymous User"}
        </h1>
        <p className="text-subheading text-start w-full text-sm font-light font-LeagueSpartan">
          {rating.comment || "No comment provided."}
        </p>
        <div className="flex mt-2">
          {ratingStars.map((isFilled, index) => (
            <Image
              key={index}
              src={starImage}
              height={20}
              width={20}
              alt="rating star"
              className={isFilled ? "opacity-100" : "opacity-40"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
