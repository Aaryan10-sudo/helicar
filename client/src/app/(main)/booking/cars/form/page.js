"use client";
import { baseURL } from "@/config/config";
import CalenderIcon from "@/ui/CalenderIcon";
import Loader from "@/ui/Loader";
import LocationIcon from "@/ui/LocationIcon";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Swal from "sweetalert2";

const Form = () => {
  const [phone, setPhone] = useState("");
  const [selectedCar, setSelectedCar] = useState("carId");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");

  console.log(customerPhone);
  const inputFields = [
    { label: "First Name", placeholder: "Enter your name", type: "text" },
    { label: "Last Name", placeholder: "Enter your Last name", type: "text" },
    { label: "Country", placeholder: "Enter your country", type: "text" },
    { label: "Email", placeholder: "Enter your emai", type: "email" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      passengerInfo: {
        firstName: firstName,
        lastName: lastName,
        address: country,
        email: email,
        phone: customerPhone,
        message: message,
      },
      bookingDate: new Date().toLocaleString(),
      pickupDate: "2025-04-24",
      returnDate: "2025-04-25",
      totalAmount: selectedCar.vehiclePrice,
      status: "confirmed",
      paymentStatus: "pending",
      vehicleId: cardId,
    };

    try {
      setLoader(true);
      let booking = await axios({
        method: "POST",
        url: `${baseURL}/booking/create`,
        data: formData,
      });
      setFirstName("");
      setLastName("");
      setCountry("");
      setCustomerPhone("");
      setEmail("");
      setLoader(false);

      Swal.fire({
        title: "Booking Confirmed! Please check your email.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const getVehicleDetails = async () => {
    try {
      let vehicleDetails = await axios({
        method: "GET",
        url: `${baseURL}/vehicle/get/${cardId}`,
      });
      console.log(vehicleDetails.data.data);
      setSelectedCar(vehicleDetails.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getVehicleDetails();
  }, []);

  return (
    <div className="bg-[#f2f2f2] text-black min-h-screen w-full">
      <main className="flex flex-col items-start justify-start">
        <div className="flex  items-center justify-between w-full px-12 py-6 border-b bg-white">
          <h1 className="text-3xl font-bold">Review your booking</h1>
          <h2 className="text-xl font-semibold">
            Total : Rs.
            <span className="text-2xl font-bold">
              {selectedCar.vehiclePrice}
            </span>
          </h2>
        </div>

        <section className="flex items-start justify-center px-12 py-8 gap-12 w-full">
          <form className="w-[60%]" onSubmit={handleSubmit}>
            <h1 className="font-bold text-xl pb-4">Personal Details:</h1>
            <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-2 gap-6">
              {inputFields.map((field, idx) => (
                <div className="flex flex-col" key={idx}>
                  <label className="mb-1 font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="border p-3 border-gray-300 outline-blue-500 rounded-md"
                    value={
                      field.label === "First Name"
                        ? firstName
                        : field.label === "Last Name"
                          ? lastName
                          : field.label === "Country"
                            ? country
                            : email
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (field.label === "First Name") setFirstName(val);
                      if (field.label === "Last Name") setLastName(val);
                      if (field.label === "Country") setCountry(val);
                      if (field.label === "Email") setEmail(val);
                    }}
                    required
                  />
                </div>
              ))}

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
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg mt-4 w-full shadow">
              <div className="flex justify-between mb-2 text-lg">
                <span>Base fare</span>
                <span>Rs. {selectedCar.vehiclePrice}</span>
              </div>
              <div className="flex justify-between mb-2 text-lg">
                <span>Taxes & fees</span>
                <span>price Rs.0</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-2">
                <span>Total</span>
                <span>Rs.{selectedCar.vehiclePrice}</span>
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
              <div className="flex items-start justify-between gap-5 w-full ">
                <div className="w-[350px] object-cover h-[200px] overflow-hidden">
                  <img
                    src={selectedCar.vehicleImage}
                    alt={selectedCar.vehicleName}
                    className=" object-cover rounded w-full h-full"
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
              <div className="border-t my-3" />
              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex items-center justify-between w-1/2">
                  <p className="flex items-center gap-1 ">
                    <span className="font-medium flex items-center justify-center">
                      <LocationIcon />
                      From:
                    </span>
                    Kathmandu
                  </p>
                  <p>
                    <span className="font-medium">To:</span> Pokhara
                  </p>
                </div>
                <p className="flex items-center gap-1">
                  <span className="font-medium flex items-center justify-center gap-1 ">
                    <CalenderIcon />
                    Date:
                  </span>{" "}
                  April 14, 2025
                </p>
                <p>
                  <span className="font-medium">Time:</span> 08:00 AM —
                  Duration: 1 Day
                </p>
                <p>
                  <span className="font-medium">Passengers:</span> 12
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Form;
