"use client";

import { baseURL } from "@/config/config";
import axios from "axios";
import { getCode } from "country-list";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import "react-phone-input-2/lib/style.css";

import BookingForm from "@/components/common/BookingForm";
import countries from "i18n-iso-countries";
import countryList from "react-select-country-list";
import Swal from "sweetalert2";

countries.registerLocale(enLocale);

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");

  const [showDetails, setShowDetails] = useState(false);
  const [country, setCountry] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const [pickupDateValue, setPickupDateValue] = useState("2025-04-24");
  const [pickupTimeValue, setPickupTimeValue] = useState("12:30");
  const [returnDateValue, setReturnDateValue] = useState("2025-04-24");
  const [returnTimeValue, setReturnTimeValue] = useState("12:30");

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const lineItems = [
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
  ];

  useEffect(() => {
    if (carId) {
      getVehicleDetails();
    }
  }, [carId]);

  const getVehicleDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/vehicle/get/${carId}`);
      setSelectedCar(response.data.data);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      Swal.fire({
        title: "Agreement Required",
        text: "Please agree to the terms and conditions before booking.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const formData = {
      passengerInfo: {
        firstName,
        lastName,
        address: country,
        email,
        phone: customerPhone,
        message: details,
      },
      bookingDate: new Date().toISOString(),
      pickupDateTime: `${pickupDateValue}T${pickupTimeValue}:00`,
      returnDateTime: `${returnDateValue}T${returnTimeValue}:00`,
      totalAmount: selectedCar?.vehiclePrice,
      status: "confirmed",
      paymentStatus: "pending",
      vehicleId: carId,
      vehicleName: selectedCar?.vehicleName,
    };

    try {
      setLoader(true);
      await axios.post(`${baseURL}/booking/create`, formData);
      setFirstName("");
      setLastName("");
      setCountry("Nep");
      setCustomerPhone("9779801102259");
      setEmail("hellocarbooking@gmail.com");
      setDetails("");
      setPickupDateValue("2025-04-24");
      setPickupTimeValue("12:30");
      setReturnDateValue("2025-04-24");
      setReturnTimeValue("12:30");
      setAgreedToTerms(false);
      setLoader(false);

      Swal.fire({
        title: "Booking Confirmed!",
        text: "Please check your email for details.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/");
      });
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire({
        title: "Booking Failed",
        text: error.response?.data?.message || "An unexpected error occurred.",
        icon: "error",
      });
      setLoader(false);
    }
  };

  const carPrice = selectedCar?.vehiclePrice ?? 0;

  return (
    <div className="bg-[#F3F4F6] text-gray-800 min-h-screen w-full">
      <main className="">
        <div className="py-5 border-b">
          <div className="  flex sm:flex-row flex-col sm:items-center justify-between gap-5 sm:gap-0 w-full px-4 md:px-8 max-w-[1700px] mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold">
              Review your booking
            </h1>
            <div className="text-start flex gap-10 ">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-xs cursor-pointer text-gray-400 underline  hover:text-blue-600"
                >
                  Price details
                </button>

                {showDetails && (
                  <div className="fixed inset-0 bg-black/10  flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full font-sans relative">
                      <div className="flex justify-end mb-4">
                        <button
                          onClick={() => setShowDetails(false)}
                          className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <h2 className="text-3xl font-bold mb-6 text-black">
                        PRICE DETAILS
                      </h2>

                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">
                          Rental charges
                        </h3>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-700">
                            4 Rental days x $60.64
                          </span>
                          <span className="font-semibold text-black">
                            $450.10
                          </span>
                        </div>
                        <hr className="border-gray-300 mb-4" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">
                          Taxes and fees
                        </h3>
                        {lineItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center mb-3"
                          >
                            <span className="text-gray-700">
                              {item.description}
                            </span>
                            <span className="font-semibold text-black">
                              {item.amount}
                            </span>
                          </div>
                        ))}
                        <hr className="border-gray-300 mb-6" />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-black">
                          Total (incl. tax)
                        </span>
                        <span className="text-3xl font-bold text-black">
                          $450.10
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-2xl md:text-3xl font-bold">${carPrice}</p>
            </div>
          </div>
        </div>
        <BookingForm />
      </main>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen text-xl">
          Loading page...
        </div>
      }
    >
      <Booking />
    </Suspense>
  );
};

export default Page;
