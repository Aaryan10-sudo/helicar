import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RatingCardSkeleton = () => {
  const ratingStarsSkeleton = Array.from({ length: 5 });

  return (
    <div className="relative bg-[#F5F5F5] shadow-lg rounded-3xl flex items-center p-6 w-full max-w-[400px] sm:max-w-[325px] h-[160px]">
      <div className="absolute left-[-33px] z-10 top-[-10px] border-subheading border-[2px] rounded-full overflow-hidden h-[186px] w-[110px]">
        <Skeleton circle height={186} width={110} />
      </div>
      <div className="absolute z-0 left-[-40px] rounded-full overflow-hidden h-[186px] w-[110px]">
        <Skeleton circle height={186} width={110} />
      </div>

      <div className="flex flex-col w-full justify-center items-start pl-20 pr-4">
        <Skeleton height={24} width={150} className="mb-2" />
        <Skeleton height={40} count={2} className="mb-2" />

        <div className="flex mt-2">
          {ratingStarsSkeleton.map((_, index) => (
            <Skeleton
              key={index}
              circle
              height={20}
              width={20}
              className="mr-1"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingCardSkeleton;
