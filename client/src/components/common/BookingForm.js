"use client";

import { baseURL } from "@/config/config";
import CalenderIcon from "@/ui/CalenderIcon";
import Loader from "@/ui/Loader";
import LocationIcon from "@/ui/LocationIcon";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";
import ViberIcon from "@/ui/ViberIcon";
import WhatsappIcon from "@/ui/WhatsappIcon";

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-500 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const BookingForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");

  const [showDetails, setShowDetails] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("np");
  const [bookingId, setBookingId] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const pickUp = searchParams.get("pickUp");
  const destination = searchParams.get("destination");
  const pickUpDate = searchParams.get("pickUpDate");
  const returnDate = searchParams.get("returnDate");
  const pickUpTime = searchParams.get("pickUpTime");
  const returnTime = searchParams.get("returnTime");
  const anotherDestination = searchParams.get("anotherDestination");

  console.log(`${anotherDestination} destination`);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loader, setLoader] = useState(false);

  // OTP Popup State
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const otpInputRefs = useRef([]);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const timerIntervalRef = useRef(null);

  const lineItems = [
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
  ];

  useEffect(() => {
    if (cardId) {
      getVehicleDetails();
    }
  }, [cardId]);

  const getVehicleDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/vehicle/get/${cardId}`);
      setSelectedCar(response.data.data);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function toDateInputValue(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const formattedPickupDate = formatDate(pickUpDate);
  const formattedReturnDate = formatDate(returnDate);

  const startOtpTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setOtpTimer(120);
    setCanResendOtp(false);
    timerIntervalRef.current = setInterval(() => {
      setOtpTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerIntervalRef.current);
          setCanResendOtp(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(0.5, "0")}:${String(seconds).padStart(0.5, "0")} Sec`;
  };

  const handleOtpChange = (element, index) => {
    const value = element.value;
    if (isNaN(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0 && otpInputRefs.current[index - 1]) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpInputRefs.current[index - 1].focus();
      }
    } else if (
      e.key === "ArrowLeft" &&
      index > 0 &&
      otpInputRefs.current[index - 1]
    ) {
      otpInputRefs.current[index - 1].focus();
    } else if (
      e.key === "ArrowRight" &&
      index < otp.length - 1 &&
      otpInputRefs.current[index + 1]
    ) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpPaste = (e, startIndex) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\s+/g, "")
      .slice(0, otp.length - startIndex);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (startIndex + i < otp.length) {
        newOtp[startIndex + i] = pasteData[i];
      }
    }
    setOtp(newOtp);

    let nextFocusIndex = startIndex + pasteData.length;
    if (nextFocusIndex >= otp.length) {
      nextFocusIndex = otp.length - 1;
    }
    if (otpInputRefs.current[nextFocusIndex]) {
      otpInputRefs.current[nextFocusIndex].focus();
    } else if (otpInputRefs.current[otp.length - 1]) {
      otpInputRefs.current[otp.length - 1].focus();
    }
  };

  const handleResendOtp = () => {
    console.log("Resending OTP...");
    setOtp(new Array(6).fill(""));
    if (otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
    startOtpTimer();
    Swal.fire({
      title: "OTP Resent",
      text: "A new OTP has been sent to your registered email.",
      icon: "info",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    try {
      const result = await axios({
        method: "PUT",
        url: `${baseURL}/booking/verify`,
        data: {
          OTP: enteredOtp,
          email: localStorage.getItem("email"),
        },
      });
      setShowOtpPopup(false);

      Swal.fire({
        title: "Booking Confirmed!",
        text: "Please check your email for details.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(
            `/complete-booking/booking-preview?bookingId=${bookingId}`
          );
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Invalid OTP",
        text: "The OTP you entered is incorrect. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      setOtp(new Array(6).fill(""));
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
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
        address: "Kathmandu",
        email,
        phone: customerPhone,
      },
      status: "pending",
      bookingDate: new Date().toISOString(),
      pickupDate: `${formattedPickupDate} | ${pickUpTime}`,
      returnDate: `${formattedReturnDate} | ${returnTime}`,
      anotherDestination,
      pickUp,
      destination,
      totalAmount: selectedCar?.vehiclePrice,
      paymentStatus: "pending",
      vehicleId: cardId,
      vehicleName: selectedCar?.vehicleName,
    };

    try {
      setLoader(true);
      const response = await axios.post(`${baseURL}/booking/create`, formData);
      setBookingId(response.data.data.id);
      setFirstName("");
      setLastName("");
      setCustomerPhone("9779801102259");
      setEmail("");
      setDetails("");
      setPickupDateValue("2025-04-24");
      setPickupTimeValue("12:30");
      setReturnDateValue("2025-04-24");
      setReturnTimeValue("12:30");

      setAgreedToTerms(false);
      setLoader(false);
      localStorage.setItem("email", email);
      setShowOtpPopup(true);
      startOtpTimer();
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
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

  const carPrice = Number(selectedCar?.vehiclePrice) || 0;

  return (
    <>
      <section className="flex flex-col lg:flex-row items-start justify-center px-4 md:px-8 py-9 gap-8 w-full max-w-[1700px] mx-auto">
        <form
          className="w-full lg:w-[60%] bg-white  rounded-xl p-6 md:p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold text-gray-700">
            Personal Details:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your First Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your Last Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="hellocarbooking@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <PhoneInput
                country={phoneCountryCode}
                value={customerPhone}
                onChange={(phone, countryData) => {
                  setCustomerPhone(phone);
                }}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  id: "phoneNumber",
                }}
                inputClass="!w-full !pl-12 !border !border-gray-300 !rounded-md !focus:ring-blue-500 !focus:border-blue-500 !h-[46px] !text-base !p-3"
                containerClass="w-full"
                buttonClass="!bg-white !border-y !border-l !border-gray-300 !rounded-l-md !h-[46px]"
                dropdownClass="!rounded-md !shadow-lg"
              />
            </div>
          </div>
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Date and time
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label
                  htmlFor="pickupDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pick-up date
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <span className="pl-3 text-gray-500">
                    <CalenderIcon />
                  </span>
                  <input
                    type="date"
                    id="pickupDate"
                    className="flex-grow p-3 bg-transparent focus:outline-none"
                    value={toDateInputValue(pickUpDate)}
                    onChange={(e) => setPickupDateValue(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="returnDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Return Date
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <span className="pl-3 text-gray-500">
                    <CalenderIcon />
                  </span>
                  <input
                    type="date"
                    id="returnDate"
                    className="flex-grow p-3 bg-transparent focus:outline-none"
                    value={toDateInputValue(returnDate)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Details
            </label>
            <textarea
              id="details"
              rows={2}
              placeholder="Enter a message..."
              className="w-full p-3 border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <button
                  type="button"
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
                          type="button"
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
              <p className="text-2xl font-bold text-gray-800">
                ${carPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <p className="text-sm font-semibold text-gray-700 underline">
              Important information about your reservation
            </p>
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-xs text-gray-600"
              >
                I have read and accept the rental information, the privacy
                policy and I acknowledge that I am booking a prepaid rate, where
                the total reservation price is immediately charged to the
                payment method I provided.
              </label>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              className="px-10 py-3 bg-primary cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
              disabled={loader}
            >
              {loader ? <Loader /> : "Book Now"}
            </button>
          </div>
        </form>

        {/* Right Summary Panel */}
        <div className="w-full lg:w-[40%] mt-8 lg:mt-0 sm:sticky top-[120px]">
          {" "}
          {selectedCar ? (
            <div className="bg-[#f0f9ff] p-5 md:p-6 rounded-xl sm:sticky top-5">
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <img
                  src={
                    selectedCar.vehicleImage ||
                    "https://via.placeholder.com/150x100?text=No+Image"
                  }
                  alt={selectedCar.vehicleName || "Vehicle Image"}
                  className="w-full sm:w-[150px] h-[100px] object-cover rounded-md flex-shrink-0 bg-gray-200"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedCar.vehicleName || "Vehicle Name"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedCar.vehicleDescription ||
                      "No description available."}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">
                      {selectedCar.features?.seats || "N/A"} Seats
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Number Plate: {selectedCar.numberPlate || "N/A"}
                  </p>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="py-3">
                <div className="flex items-start gap-3 mb-3">
                  <LocationIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Pickup</p>
                    <p className="text-sm text-gray-600">
                      {pickUp || "Kathmandu, KMC hospital"} {/* Example */}
                    </p>
                    <p className="text-xs text-gray-500">
                      {pickUpDate && pickUpTime
                        ? `${formattedPickupDate} | ${pickUpTime}`
                        : "April 14, 2025 | 12:00 PM"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LocationIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">
                      Destination / Return
                    </p>
                    <p className="text-sm text-gray-600">
                      {destination || "Kathmandu, KMC hospital"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {anotherDestination || "Kathmandu, KMC hospital"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {returnDate && returnTime
                        ? `${formattedReturnDate} | ${returnTime}`
                        : "April 14, 2025 | 12:00 PM"}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="py-3">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Your booking overview:
                </h4>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {[
                    "24/7 Roadside Assistance Hotline",
                    "GPS Navigation Included",
                    "Limited Mileage (as per terms)",
                    "Flexible Booking: Pay now, cancel/rebook (fees may apply)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-[#f0f9ff] p-6 rounded-xl text-center">
              <p>Loading car details...</p>
            </div>
          )}
          <br />
          <h1 className="text-xl font-bold">Connect with us</h1>
          <span className="flex gap-4 py-2">
            <a
              href="https://wa.me/9761637657"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 w-[140px] rounded-md flex items-center justify-center gap-2 text-sm"
            >
              <WhatsappIcon />
              WhatsApp
            </a>

            <a
              href="viber://chat?number=9761637657"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 w-[140px] rounded-md flex items-center justify-center gap-2 text-sm"
            >
              <ViberIcon />
              Viber
            </a>
          </span>
        </div>
      </section>

      {showOtpPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4 backdrop-blur-sm">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md font-sans">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-gray-800">
              OTP verification
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6 sm:mb-8 leading-relaxed">
              Please Enter the OTP (One-Time Password) sent to your registered
              email to complete your verification.
            </p>

            <div className="flex justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="tel"
                  name="otp"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  onPaste={(e) => handleOtpPaste(e, index)}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  autoComplete="off"
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-sm mb-6 sm:mb-8 px-1">
              <span className="text-gray-500tabular-nums">
                {formatTime(otpTimer)}
              </span>
              <span>
                <span className="text-gray-500">Don't receive code ? </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResendOtp}
                  className={`font-semibold ${
                    canResendOtp
                      ? "text-red-600 hover:text-red-700"
                      : "text-red-600 opacity-50 cursor-not-allowed"
                  }`}
                >
                  Re-send
                </button>
              </span>
            </div>

            <button
              type="button"
              onClick={handleOtpSubmit}
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 mb-3"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={() => {
                setShowOtpPopup(false);
                if (timerIntervalRef.current)
                  clearInterval(timerIntervalRef.current);
                Swal.fire({
                  title: "Cancelled",
                  text: "OTP verification was cancelled. Your booking is not yet complete.",
                  icon: "info",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3500,
                  timerProgressBar: true,
                });
              }}
              className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const BookingFormWithSuspense = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    }
  >
    <BookingForm />
  </Suspense>
);

export default BookingForm;
