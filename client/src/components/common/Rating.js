import { assets } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import RatingCard from "./RatingCard";
import RatingCardSkeleton from "../loader/ratingCardSkeleton";
import axios from "axios";
import { baseURL } from "@/config/config";

const defaultRatings = [
  {
    id: 1,
    name: "Prina Tamang",
    comment:
      "Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu dignissim morbi egestas interdum viverra.",
    photo: "@/assets/women.svg",
    rating: 4,
  },
  {
    id: 2,
    name: "John Doe",
    comment:
      "Great experience! The service was excellent, and I highly recommend it to everyone.",
    photo: "@/assets/women.svg",
    rating: 2,
  },
  {
    id: 3,
    name: "Jane Smith",
    comment: "The booking process was smooth and the staff was very helpful.",
    photo: "@/assets/women.svg",
    rating: 5,
  },
  {
    id: 4,
    name: "Alex Johnson",
    comment: "I enjoyed my flight! Will definitely book again.",
    photo: "@/assets/women.svg",
    rating: 3,
  },
];

const Rating = () => {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/client-reviews`);
      setRatings(response?.data?.data?.content?.reviews || []);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setRatings([]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Use defaultRatings if ratings is empty or null
  const displayRatings =
    ratings && ratings.length > 0 ? ratings : defaultRatings;

  return (
    <div className="w-full sm:w-[670px] md:sm:w-[1240px] max-w-[1240px] flex flex-col gap-4 justify-center items-center p-4 shadow-2xl rounded-xl">
      <div className="w-full max-w-[1240px] flex flex-wrap gap-8 sm:gap-[77px] justify-center ">
        {loading
          ? [1, 2].map((_, index) => <RatingCardSkeleton key={index} />)
          : displayRatings
              .slice(0, 2)
              .map((rating, index) => (
                <RatingCard key={index} rating={rating} />
              ))}
      </div>
      <div className="w-full max-w-[1240px] flex flex-wrap justify-center gap-[77px] sm:gap-[288px] mt-8">
        {loading
          ? [1, 2].map((_, index) => <RatingCardSkeleton key={index} />)
          : displayRatings
              .slice(2, 4)
              .map((rating, index) => (
                <RatingCard key={index} rating={rating} />
              ))}
      </div>
    </div>
  );
};

export default Rating;
