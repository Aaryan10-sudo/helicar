"use client";

import { baseURL } from "@/config/config";
import axios from "axios";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";

import PackageBookingForm from "@/components/common/PackageBookingForm";
import countries from "i18n-iso-countries";
import Swal from "sweetalert2";

countries.registerLocale(enLocale);

const Booking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");

  const [showDetails, setShowDetails] = useState(false);
  const [country, setCountry] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [pickupDateValue, setPickupDateValue] = useState("");
  const [pickupTimeValue, setPickupTimeValue] = useState("");
  const [returnDateValue, setReturnDateValue] = useState("");
  const [returnTimeValue, setReturnTimeValue] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loader, setLoader] = useState(false);

  const lineItems = [
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "Insurance + Protection", amount: "$150.00" },
    { description: "Tax and Fees", amount: "$35.00" },
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
      vehicleId: cardId,
      vehicleName: selectedCar?.vehicleName,
    };

    try {
      setLoader(true);
      await axios.post(`${baseURL}/booking/create`, formData);
      setFirstName("");
      setLastName("");
      setCountry("");
      setCustomerPhone("");
      setEmail("");
      setDetails("");
      setPickupDateValue("");
      setPickupTimeValue("");
      setReturnDateValue("");
      setReturnTimeValue("");
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
      <main>
        <div className="py-5 border-b">
          <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-5 sm:gap-0 w-full px-4 md:px-8 max-w-[1700px] mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold">
              Review your booking
            </h1>
          </div>
        </div>
        <PackageBookingForm
          selectedCar={selectedCar}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          country={country}
          setCountry={setCountry}
          customerPhone={customerPhone}
          setCustomerPhone={setCustomerPhone}
          details={details}
          setDetails={setDetails}
          pickupDateValue={pickupDateValue}
          setPickupDateValue={setPickupDateValue}
          pickupTimeValue={pickupTimeValue}
          setPickupTimeValue={setPickupTimeValue}
          returnDateValue={returnDateValue}
          setReturnDateValue={setReturnDateValue}
          returnTimeValue={returnTimeValue}
          setReturnTimeValue={setReturnTimeValue}
          agreedToTerms={agreedToTerms}
          setAgreedToTerms={setAgreedToTerms}
          loader={loader}
          handleSubmit={handleSubmit}
        />
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
