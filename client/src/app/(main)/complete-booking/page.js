"use client";

import { baseURL } from "@/config/config";
import CalenderIcon from "@/ui/CalenderIcon";
import Loader from "@/ui/Loader";
import LocationIcon from "@/ui/LocationIcon";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";

const BookingForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");

  const [selectedCar, setSelectedCar] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      passengerInfo: {
        firstName,
        lastName,
        address: country,
        email,
        phone: customerPhone,
        message,
      },
      bookingDate: new Date().toLocaleString(),
      pickupDate: "2025-04-24",
      returnDate: "2025-04-25",
      totalAmount: selectedCar.vehiclePrice,
      status: "confirmed",
      paymentStatus: "pending",
      vehicleId: cardId,
      vehicleName: selectedCar.vehicleName,
    };

    try {
      setLoader(true);
      await axios.post(`${baseURL}/booking/create`, formData);
      setFirstName("");
      setLastName("");
      setCountry("");
      setCustomerPhone("");
      setEmail("");
      setMessage("");
      setLoader(false);

      Swal.fire({
        title: "Booking Confirmed! Please check your email.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/");
      });
    } catch (error) {
      console.error("Booking Error:", error);
      setLoader(false);
    }
  };

  const getVehicleDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/vehicle/get/${cardId}`);
      setSelectedCar(response.data.data);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  useEffect(() => {
    if (cardId) {
      getVehicleDetails();
    }
  }, [cardId]);

  return (
    <div className="bg-[#f2f2f2] text-black min-h-screen w-full">
      <main className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-between w-full px-12 py-6 border-b bg-white">
          <h1 className="text-3xl font-bold">Review your booking</h1>
          <h2 className="text-xl font-semibold">
            Total : Rs.
            <span className="text-2xl font-bold">
              {selectedCar?.vehiclePrice ?? 0}
            </span>
          </h2>
        </div>

        <section className="flex items-start justify-center px-12 py-8 gap-12 w-full">
          <form className="w-[60%]" onSubmit={handleSubmit}>
            <h1 className="font-bold text-xl pb-4">Personal Details:</h1>
            <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border p-3 border-gray-300 outline-blue-500 rounded-md"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="border p-3 border-gray-300 outline-blue-500 rounded-md"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Country</label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  className="border p-3 border-gray-300 outline-blue-500 rounded-md"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border p-3 border-gray-300 outline-blue-500 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="mb-1 font-medium block">Phone Number</label>
                <PhoneInput
                  country={"np"}
                  value={customerPhone}
                  onChange={(value) => setCustomerPhone(value)}
                  inputClass="!w-full !px-12 !outline-blue-500 !py-6 !bg-white !border !border-gray-300 !rounded-lg !text-black"
                  containerClass="!w-full"
                  buttonClass="!bg-white !border-r !border-gray-300"
                />
              </div>
              <div className="col-span-2">
                <label className="mb-1 font-medium">Message:</label>
                <textarea
                  rows={3}
                  placeholder="Enter a message..."
                  className="border p-3 border-gray-300 resize-none outline-blue-500 rounded-md w-full"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg mt-4 w-full shadow">
              <div className="flex justify-between mb-2 text-lg">
                <span>Base fare</span>
                <span>Rs. {selectedCar?.vehiclePrice ?? 0}</span>
              </div>
              <div className="flex justify-between mb-2 text-lg">
                <span>Taxes & fees</span>
                <span>Rs. 0</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-2">
                <span>Total</span>
                <span>Rs. {selectedCar?.vehiclePrice ?? 0}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 p-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-full w-[200px] flex justify-center items-center"
            >
              {loader ? <Loader /> : "Book Now"}
            </button>
          </form>

          {selectedCar && (
            <div className="w-[40%] mt-10 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start justify-between gap-5 w-full">
                <div className="w-[350px] object-cover h-[200px] overflow-hidden">
                  <img
                    src={selectedCar.vehicleImage}
                    alt={selectedCar.vehicleName}
                    className="object-cover rounded w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mt-4">
                    {selectedCar.vehicleName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {selectedCar.vehicleDetails}
                  </p>
                  <p className="text-sm text-gray-600">
                    Number plate: {selectedCar.numberPlate}
                  </p>
                </div>
              </div>
              <span className="flex gap-2">
                <LocationIcon />
                <div>From : Kathmandu || To : Pokhara</div>
              </span>
              <span className="mt-[10px] flex gap-2">
                <CalenderIcon />
                <div>April 24 - April 25</div>
              </span>

              <span className="mt-[10px] flex gap-2">
                Passenger Seat:
                <div>{selectedCar.features.seats}</div>
              </span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
};

export default Page;
