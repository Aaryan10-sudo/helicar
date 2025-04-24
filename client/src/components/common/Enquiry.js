import React from "react";
import EnquiryImage from "../../assets/Enquiry.png";
import Image from "next/image";
import SendIcon from "@/ui/SendIcon";

const Enquiry = () => {
  return (
    <section className="flex justify-between items-center w-full px-4 py-8 max-w-[1300px] mx-auto">
      <form className="flex flex-col gap-1 shadow-xl p-[30px] rounded-xl">
        <h1 className="font-bold text-2xl">Make an Enquiry</h1>
        <br />
        <label className="font-semibold text-lg">Full Name</label>
        <input
          placeholder="Enter your fullname"
          className="w-[400px] h-[40px] border px-[10px]"
        />
        <br />
        <label className="font-semibold text-lg">Email</label>
        <input
          placeholder="Enter your Email"
          className="h-[40px] border px-[10px]"
        />
        <br />
        <label className="font-semibold text-lg">Contact</label>
        <input
          placeholder="+977 9XXXXXXXXX"
          className="h-[40px] border px-[10px]"
        />
        <br />
        <label className="font-semibold text-lg">Message</label>
        <textarea
          placeholder="Message here"
          className="border h-[100px] p-[10px]"
        />

        <button className="bg-blue-700  w-[170px] h-[40px] text-white mt-[20px] self-end rounded-md font-bold text-lg flex justify-center items-center gap-2">
          Send
          <SendIcon />
        </button>
      </form>

      <Image src={EnquiryImage} height={500} w={200} />
    </section>
  );
};

export default Enquiry;
