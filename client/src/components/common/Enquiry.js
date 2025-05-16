"use client";
import React, { useState } from "react";
import EnquiryImage from "../../assets/Enquiry.png";
import Image from "next/image";
import SendIcon from "@/ui/SendIcon";
import axios from "axios";
import { baseURL } from "@/config/config";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/ui/Loader";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const result = await axios({
        url: `${baseURL}/enquiry/create`,
        method: "POST",
        data: formData,
      });
      setFormData({
        name: "",
        email: "",
        contact: "",
        message: "",
      });
      setLoader(false);
      toast.success("Enquiry submitted sucessfully");
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };

  console.log(formData);

  return (
    <section className="flex justify-between items-center w-full px-4 py-8 max-w-[1300px] mx-auto sm:flex-wrap gap-5">
      <ToastContainer />
      <form
        className="flex flex-col gap-1 shadow-xl sm:p-[30px] rounded-xl w-full sm:w-auto p-[20px]"
        onSubmit={handelSubmit}
      >
        <h1 className="font-bold text-2xl">Make an Enquiry</h1>
        <br />
        <label className="font-semibold text-lg">Full Name</label>
        <input
          placeholder="Enter your fullname"
          className="w-full sm:w-[400px] h-[40px] border px-[10px]"
          value={formData.name}
          onChange={handleChange}
          name="name"
        />
        <br />
        <label className="font-semibold text-lg">Email</label>
        <input
          placeholder="Enter your Email"
          className="h-[40px] border px-[10px]"
          value={formData.email}
          onChange={handleChange}
          name="email"
        />
        <br />
        <label className="font-semibold text-lg">Contact</label>
        <input
          placeholder="+977 9XXXXXXXXX"
          className="h-[40px] border px-[10px]"
          value={formData.contact}
          onChange={handleChange}
          name="contact"
        />
        <br />
        <label className="font-semibold text-lg">Message</label>
        <textarea
          placeholder="Message here"
          className="border h-[100px] p-[10px]"
          value={formData.message}
          onChange={handleChange}
          name="message"
        />

        <button
          className="bg-blue-700 w-[170px] h-[40px] text-white mt-[20px] self-end rounded-md font-bold text-lg flex justify-center items-center gap-2"
          type="submit"
        >
          {loader ? (
            <Loader />
          ) : (
            <>
              Send <SendIcon />
            </>
          )}
        </button>
      </form>

      <Image
        src={EnquiryImage}
        height={500}
        w={200}
        className="hidden sm:block"
      />
    </section>
  );
};

export default Enquiry;
