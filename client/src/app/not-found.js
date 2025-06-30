import Navbar from "@/components/layout/navbar";
import NotFoundAnimation from "@/ui/404";
import React from "react";

const notfound = () => {
  return (
    <div className="">
      <Navbar />
      <NotFoundAnimation />
    </div>
  );
};

export default notfound;
