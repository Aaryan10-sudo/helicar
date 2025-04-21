import React from "react";

const PeopleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 16 16"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <circle cx={5} cy={9} r={2.25}></circle>
        <circle cx={11} cy={4} r={2.25}></circle>
        <path d="M7.75 9.25c0-1 .75-3 3.25-3s3.25 2 3.25 3m-12.5 5c0-1 .75-3 3.25-3s3.25 2 3.25 3"></path>
      </g>
    </svg>
  );
};

export default PeopleIcon;
