"use client";
import { baseURL } from "@/config/config";
import Loader from "@/ui/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const result = await axios({
        url: `${baseURL}/admin/login`,
        method: "POST",
        data: form,
      });
      setLoader(false);
      router.push("/admin/");
      localStorage.setItem("token", result.data.data.token);
      toast.success("User login successful");
    } catch (error) {
      setLoader(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unable to connect to the server");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl px-10 py-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-300 flex justify-center items-center"
        >
          {loader ? <Loader /> : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
