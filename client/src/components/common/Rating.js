import { assets } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import RatingCard from "./RatingCard";
import RatingCardSkeleton from "../loader/ratingCardSkeleton";
import axios from "axios";
import { baseURL } from "@/config/config";

// const ratings = [
//   {
//     id: 1,
//     name: "Prina Tamang",
//     review:
//       "Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu dignissim morbi egestas interdum viverra.",
//     image: assets.women,
//     ratingImage: assets.star,
//     ratingValue: 4,
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     review:
//       "Great experience! The service was excellent, and I highly recommend it to everyone.",
//     image: assets.women,
//     ratingImage: assets.star,
//     ratingValue: 2,
//   },
//   {
//     id: 3,
//     name: "Jane Smith",
//     review: "Absolutely loved the experience! Will definitely come back again.",
//     image: assets.women,
//     ratingImage: assets.star,
//     ratingValue: 5,
//   },
//   {
//     id: 4,
//     name: "Alice Johnson",
//     review: "Fantastic service and great atmosphere. Highly recommended!",
//     image: assets.women,
//     ratingImage: assets.star,
//     ratingValue: 3,
//   },
// ];

const Rating = () => {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  // console.log("ratings", ratings);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/client-reviews`);
      setRatings(response.data.data.content.reviews || []);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="w-full sm:w-[670px] md:sm:w-[1240px] max-w-[1240px] flex flex-col gap-4 justify-center items-center p-4 shadow-2xl rounded-xl">
      {/* Container for the first row with less gap */}
      <div className="w-full max-w-[1240px] flex flex-wrap gap-8 sm:gap-[77px] justify-center ">
        {loading
          ? [1, 2].map((_, index) => <RatingCardSkeleton key={index} />)
          : ratings
              .slice(0, 2)
              .map((rating) => <RatingCard key={Math.random()} rating={rating} />)}
      </div>
      <div className="w-full max-w-[1240px] flex flex-wrap justify-center gap-[77px] sm:gap-[288px] mt-8">
        {loading
          ? [1, 2].map((_, index) => <RatingCardSkeleton key={index} />)
          : ratings
              .slice(2, 4)
              .map((rating) => <RatingCard key={Math.random()} rating={rating} />)}
      </div>
    </div>
  );
};

export default Rating;
