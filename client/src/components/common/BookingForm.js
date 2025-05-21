"use client";

import { baseURL } from "@/config/config";
import CalenderIcon from "@/ui/CalenderIcon";
import Loader from "@/ui/Loader";
import LocationIcon from "@/ui/LocationIcon";
import { getName, getCode } from "country-list";
import Select from "react-select";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import enLocale from "i18n-iso-countries/langs/en.json";

import countries from "i18n-iso-countries";
import Swal from "sweetalert2";
import countryList from "react-select-country-list";
import ViberIcon from "@/ui/ViberIcon";
import WhatsappIcon from "@/ui/WhatsappIcon";

countries.registerLocale(enLocale);

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
  const [country, setCountry] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("np");

  const [selectedCar, setSelectedCar] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("hellocarbooking@gmail.com");
  const [details, setDetails] = useState("");

  const [pickupDateValue, setPickupDateValue] = useState("2025-04-24");
  const [pickupTimeValue, setPickupTimeValue] = useState("12:30");
  const [returnDateValue, setReturnDateValue] = useState("2025-04-24");
  const [returnTimeValue, setReturnTimeValue] = useState("12:30");

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loader, setLoader] = useState(false);

  const lineItems = [
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "4 Rental days x $60.64", amount: "$450.10" },
  ];

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (country) => {
    setCountry(country);
  };

  const handleSuggestionClick = (selected) => {
    setCountry(selected);
    setSuggestions([]);
    const code = getCode(selected);
    if (code) {
      setPhoneCountryCode(code);
    }
  };

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
        address: country, // 'country' state is used as address here
        email,
        phone: customerPhone,
        message: details, // 'details' state used as message
      },
      bookingDate: new Date().toISOString(), // Use ISO string for consistency
      pickupDateTime: `${pickupDateValue}T${pickupTimeValue}:00`,
      returnDateTime: `${returnDateValue}T${returnTimeValue}:00`,
      totalAmount: selectedCar?.vehiclePrice,
      status: "confirmed",
      paymentStatus: "pending",
      vehicleId: cardId,
      vehicleName: selectedCar?.vehicleName,
    };

    try {
      setLoader(true);
      await axios.post(`${baseURL}/booking/create`, formData);
      // Reset form fields
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
              placeholder="Enter your Full Name"
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
              placeholder="Enter your Full Name"
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
              onChange={(phone) => setCustomerPhone(phone)}
              inputProps={{
                name: "phoneNumber",
                required: true,
                id: "phoneNumber",
              }}
              inputClass="!w-full !pl-12 !border !border-gray-300 !rounded-md !focus:ring-blue-500 !focus:border-blue-500 !h-[40px] !text-base"
              containerClass="w-full"
              buttonClass="!bg-white !border-y !border-l !border-gray-300 !rounded-l-md"
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
                  value={pickupDateValue}
                  onChange={(e) => setPickupDateValue(e.target.value)}
                  required
                />
                <input
                  type="time"
                  className="p-3 border-l border-gray-300 bg-transparent focus:outline-none w-[120px]"
                  value={pickupTimeValue}
                  onChange={(e) => setPickupTimeValue(e.target.value)}
                  required
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
                  value={returnDateValue}
                  onChange={(e) => setReturnDateValue(e.target.value)}
                  required
                />
                <input
                  type="time"
                  className="p-3 border-l border-gray-300 bg-transparent focus:outline-none w-[120px]"
                  value={returnTimeValue}
                  onChange={(e) => setReturnTimeValue(e.target.value)}
                  required
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
            <p className="text-2xl font-bold text-gray-800">${carPrice}</p>
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
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-2 block text-xs text-gray-600">
              I have read and accept the rental information, the privacy and I
              acknowledge that I am booking a prepaid rate, where the total
              reservation price is immediately chargers to the payment method I
              provided.
            </label>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="px-10 py-3 bg-primary cursor-pointer text-white font-semibold rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
            disabled={loader}
          >
            {loader ? <Loader /> : "Book Now"}
          </button>
        </div>
      </form>

      {/* Right Summary Panel */}
      <div className="w-full lg:w-[40%] mt-8 lg:mt-0 sticky top-[120px]">
        {" "}
        {selectedCar ? (
          <div className="bg-[#f0f9ff] p-5 md:p-6 rounded-xl sticky top-5">
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <img
                src={
                  selectedCar.vehicleImage ||
                  "https://via.placeholder.com/150x100?text=Jeep"
                }
                alt={selectedCar.vehicleName}
                className="w-full sm:w-[150px] h-[100px] object-cover rounded-md flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedCar.vehicleName || "Jeep"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCar.vehicleDescription || "asdfnnsdfj"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">
                    {selectedCar.features?.seats || 9} Seats
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Number Plate: {selectedCar.numberPlate || "BA 1 JA 2023"}
                </p>
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="py-5">
              <div className="flex items-start gap-3 mb-3">
                <LocationIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className=" text-gray-500">Pickup</p>
                  <p className="text-sm text-gray-600">
                    Kathmandu, KMC hospital
                  </p>
                  <p className="text-xs text-gray-500">
                    April 14, 2025 | 08:00 AM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <LocationIcon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700">Destination</p>
                  <p className="text-sm text-gray-600">
                    Kathmandu, KMC hospital
                  </p>
                  <p className="text-xs text-gray-500">
                    April 14, 2025 | 12:00 PM
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="py-3">
              <h4 className="font-semibold text-gray-700 mb-2">
                Your booking overview:
              </h4>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {[
                  "24/7 Roadside Assistance Hotline",
                  "GPS",
                  "Limited Miles",
                  "Booking option: Best price- pay now, cancel and rebook for a free",
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
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 w-[140px] rounded flex items-center justify-center gap-2"
          >
            <WhatsappIcon />
            WhatsApp
          </a>

          <a
            href="viber://chat?number=9761637657"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 w-[140px] rounded flex items-center justify-center gap-2"
          >
            <ViberIcon />
            Viber
          </a>
        </span>
      </div>
    </section>
  );
};

export default BookingForm;
