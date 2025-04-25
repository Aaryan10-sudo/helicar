"use client";
import { baseURL } from "@/config/config";
import Loader from "@/ui/Loader";
import axios from "axios";
import React, { useState } from "react";

const GeneralSettings = () => {
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const result = await axios({
        url: `${baseURL}/admin/reset-password/`,
        data: { password },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PATCH",
      });
      setPassword("");
      setLoader(false);
      console.log(result);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  return (
    <form
      className="p-10 flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-[30px]">Change Password</h1>
        <br />
        <input
          type="password"
          className="h-[40px] w-[300px] px-[10px] border-2 rounded-sm"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button
          className="bg-blue-600 text-white font-bold w-[100px] h-[40px] rounded-sm flex justify-center items-center"
          type="submit"
        >
          {loader ? <Loader /> : "Change"}
        </button>
      </div>
    </form>
  );
};

export default GeneralSettings;
