import React from "react";

const BlogSkeleton = ({ limit = 6 }) => {
  return (
    <div className="flex flex-wrap gap-6 items-end justify-center">
      {[...Array(limit)].map((_, index) => (
        <div
          key={index}
          className="w-[312px] h-[422px] bg-gray-200 border rounded-3xl border-gray-300 gap-2.5 shadow-lg overflow-hidden animate-pulse"
          style={{ transform: `translateY(-${index * 10}px)` }}
        >
          <div className="h-full flex flex-col p-4">
            <div className="w-full h-[211px] bg-gray-300 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-400 mt-4 rounded"></div>
            <div className="w-1/2 h-6 bg-gray-500 mt-4 rounded"></div>
            <div className="w-full h-12 bg-gray-300 mt-4 rounded"></div>
            <div className="flex justify-end items-center mt-auto">
              <div className="w-24 h-8 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSkeleton;
