"use client";
import CalenderIcon from "@/ui/CalenderIcon";
import LocationIcon from "@/ui/LocationIcon";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = () => {
  const [phone, setPhone] = useState("");
  const [selectedCar, setSelectedCar] = useState("carId");
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");
  console.log(selectedCar);

  const inputFields = [
    { label: "First Name", placeholder: "Enter your name", type: "text" },
    { label: "Last Name", placeholder: "Enter your Last name", type: "text" },
    { label: "Country", placeholder: "Enter your country", type: "text" },
    { label: "Email", placeholder: "Enter your emai", type: "email" },
  ];

  // console.log(cardId);

  const getVehicleDetails = async () => {
    try {
      let vehicleDetails = await axios({
        method: "GET",
        url: `http://192.168.1.14:3000/vehicle/get/${cardId}`,
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
          <div className="w-[60%]">
            <h1 className="font-bold text-xl pb-4">Personal Details:</h1>
            <form className="bg-white shadow-md rounded-lg p-6 grid grid-cols-2 gap-6">
              {inputFields.map((field, idx) => (
                <div className="flex flex-col" key={idx}>
                  <label className="mb-1 font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="border p-3 border-gray-300 outline-blue-500 rounded-md"
                    required
                  />
                </div>
              ))}

              <div className="col-span-2">
                <label className="mb-1 font-medium block">Phone Number</label>
                <PhoneInput
                  country={"np"}
                  value={phone}
                  onChange={setPhone}
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
                />
              </div>
            </form>

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

            <button className="mt-6 p-4 bg-blue-600 text-white font-semibold rounded-full w-[200px]">
              Book Now
            </button>
          </div>

          {selectedCar && (
            <div className="w-[40%] mt-10 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start justify-center gap-5 w-full ">
                <img
                  src={selectedCar.vehicleImage}
                  alt={selectedCar.vehicleName}
                  className="w-[50%] h-[200px] object-cover rounded"
                />
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
                <p>
                  <span className="font-medium">
                    <LocationIcon />
                    From:
                  </span>
                  Kathmandu
                </p>
                <p>
                  <span className="font-medium">To:</span> Pokhara
                </p>
                <p>
                  <span className="font-medium">
                    <CalenderIcon />
                    Date:
                  </span>{" "}
                  April 14, 2025
                </p>
                <p>
                  <span className="font-medium">Time:</span> 08:00 AM —
                  Duration: 6 hours
                </p>
                <p>
                  <span className="font-medium">Passengers:</span>{" "}
                  {selectedCar.seats}
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
