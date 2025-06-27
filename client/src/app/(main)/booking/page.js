"use client";
import VehicleSkeleton from "@/components/loader/vehicleSkeleton";
import { baseURL } from "@/config/config";
import BluetickIcon from "@/ui/BluetickIcon";
import Loggages from "@/ui/Loggages";
import ManualIcon from "@/ui/ManualIcon";
import PeopleIcon from "@/ui/PeopleIcon";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

const VehicleBooking = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [busList, setBusList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const searchParams = useSearchParams();
  const vehicle = searchParams.get("vehicle");
  const pickUp = searchParams.get("pickUp");
  const destination = searchParams.get("destination");
  const pickUpDate = searchParams.get("date");
  const returnDate = searchParams.get("returnDate");
  const pickUpTime = searchParams.get("pickupTime");
  const returnTime = searchParams.get("returnTime");
  const anotherDestination = searchParams.get("anotherDestination");

  const lineItems = [
    { description: "4 Rental days x $60.64", amount: "$450.10" },
    { description: "Insurance + Protection", amount: "$150.00" },
    { description: "Tax and Fees", amount: "$35.00" },
  ];

  const handleBookNow = (cardId) => {
    router.push(
      `/complete-booking?cardId=${cardId}` +
        `&pickUp=${pickUp}` +
        `&destination=${destination}` +
        `&pickUpDate=${pickUpDate}` +
        `&returnDate=${returnDate}` +
        `&pickUpTime=${pickUpTime}` +
        `&returnTime=${returnTime}` +
        `&anotherDestination=${anotherDestination}`
    );
  };

  const handleVehicleClick = (vehicle) => {
    if (selectedVehicle && selectedVehicle.id === vehicle.id) {
      setSelectedVehicle(null);
    } else {
      setSelectedVehicle(vehicle);
      setShowDetails(false);
    }
  };

  const getAllBus = async () => {
    try {
      setLoading(true);
      const bus = await axios.get(`${baseURL}/vehicle/get/${vehicle}`);
      setBusList(bus.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bus list:", error.message);
      setBusList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBus();
    // eslint-disable-next-line
  }, []);

  const vehiclesPerRow = 4;

  const chunkArray = (array, size) => {
    if (!array) return [];
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const vehicleRows = chunkArray(busList, vehiclesPerRow);

  return (
    <div className="bg-[#f8f9fa] text-black w-full py-10 min-h-screen">
      <section className="max-w-[1900px] mx-auto">
        <h2 className="font-Comfortaa text-2xl sm:text-3xl font-semibold border-b-2 px-4 sm:px-8 md:px-16 lg:px-[120px] pb-4 border-gray-400">
          Which bus do you want to ride?
        </h2>

        <div className="flex flex-col md:flex-row px-4 sm:px-8 md:px-16 lg:px-[120px] gap-4 md:gap-10 pt-6">
          <span className="flex flex-col w-full md:w-auto">
            <label className="mb-2 font-bold text-base sm:text-lg">
              Price Range
            </label>
            <input
              placeholder="Select as per choice"
              className="px-3 h-10 border border-slate-400 w-full md:w-[250px] rounded-md"
            />
          </span>
          <span className="flex flex-col w-full md:w-auto">
            <label className="mb-2 font-bold text-base sm:text-lg">
              Sort By
            </label>
            <input
              placeholder="Select as per choice"
              className="px-3 h-10 border border-slate-400 w-full md:w-[250px] rounded-md"
            />
          </span>
        </div>

        <div className="px-2 sm:px-4 md:px-10 lg:px-[100px] pt-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <VehicleSkeleton key={index} />
              ))}
            </div>
          ) : vehicleRows.length > 0 ? (
            vehicleRows.map((row, rowIndex) => (
              <div key={`row-wrapper-${rowIndex}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {row.map((vehicle) => (
                    <div
                      key={vehicle.id || vehicle._id}
                      className="bg-[url('/vehicleImage.jpg')] bg-center bg-cover rounded-lg shadow-lg w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[485px] flex flex-col justify-between cursor-pointer"
                      onClick={() => handleVehicleClick(vehicle)}
                      style={{
                        backgroundImage: vehicle.imagePath
                          ? `url(${vehicle.imagePath})`
                          : "url('/vehicleImage.jpg')",
                      }}
                    >
                      <div className="w-full p-4 sm:p-5 bg-opacity-40 rounded-t-lg">
                        <h1 className="text-white font-bold text-lg sm:text-2xl">
                          {vehicle.vehicleName}
                        </h1>
                        <p className="text-white text-xs sm:text-sm">
                          or Similar |{" "}
                          {vehicle?.category?.name?.toUpperCase() || "N/A"}
                        </p>
                        <div className="flex flex-wrap items-center text-white justify-between gap-x-2 gap-y-1 py-2 sm:py-3 text-xs">
                          <p className="flex items-center gap-1">
                            <Loggages width="16" height="16" />{" "}
                            {vehicle.features?.luggage || "N/A"} luggage
                          </p>
                          <p className="flex items-center gap-1">
                            <PeopleIcon width="16" height="16" />{" "}
                            {vehicle.features?.seats || "N/A"} persons
                          </p>
                          <p className="flex items-center gap-1">
                            <ManualIcon width="16" height="16" />{" "}
                            {vehicle.features?.transmission || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-4 sm:p-5 bg-opacity-40 rounded-b-lg">
                        <p className="text-lg sm:text-xl font-semibold text-white mb-2">
                          Rs. {vehicle.vehiclePrice}{" "}
                          <span className="text-sm font-normal">per Day</span>
                        </p>
                        <p className="flex gap-2 text-white text-xs sm:text-sm">
                          <BluetickIcon /> Limited miles only
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedVehicle &&
                  row.some(
                    (v) =>
                      v.id === selectedVehicle.id ||
                      v._id === selectedVehicle._id
                  ) && (
                    <div className="flex justify-center my-6">
                      <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-full md:max-w-[1200px] overflow-hidden flex flex-col md:flex-row">
                        <div
                          className="w-full md:w-[50%] h-[350px] sm:h-[300px] md:h-[480px] bg-cover bg-center p-4 sm:p-5 flex flex-col justify-between text-white"
                          style={{
                            backgroundImage: selectedVehicle.imagePath
                              ? `url(${selectedVehicle.imagePath})`
                              : "url('/vehicleImage.jpg')",
                          }}
                        >
                          <div className="bg-opacity-40 p-2 sm:p-3 rounded">
                            <h1 className="font-bold text-lg sm:text-[24px] md:text-[30px]">
                              {selectedVehicle.vehicleName}
                            </h1>
                            <p className="text-xs sm:text-md md:text-lg">
                              or Similar |{" "}
                              {selectedVehicle?.category?.name?.toUpperCase() ||
                                "N/A"}
                            </p>
                          </div>
                          <div className="bg-opacity-40 p-2 sm:p-3 rounded">
                            <div className="flex flex-wrap gap-x-4 gap-y-2 py-2 md:py-4 text-xs sm:text-sm md:text-base">
                              <p className="flex items-center gap-1">
                                <Loggages width="18" height="18" />{" "}
                                {selectedVehicle.features?.luggage || "N/A"}{" "}
                                luggage
                              </p>
                              <p className="flex items-center gap-1">
                                <PeopleIcon width="18" height="18" />{" "}
                                {selectedVehicle.features?.seats || "N/A"}{" "}
                                persons
                              </p>
                              <p className="flex items-center gap-1">
                                <ManualIcon width="18" height="18" />{" "}
                                {selectedVehicle.features?.transmission ||
                                  "N/A"}
                              </p>
                            </div>
                            <p className="flex gap-2 items-center text-xs sm:text-sm md:text-base">
                              <BluetickIcon /> Limited miles only
                            </p>
                            <p className="font-bold text-lg sm:text-xl md:text-2xl mt-1">
                              Rs. {selectedVehicle.vehiclePrice}{" "}
                              <span className="text-sm font-normal">
                                per day
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="w-full md:w-[50%] p-4 sm:p-6 md:p-10 flex flex-col justify-between">
                          <div>
                            <h1 className="text-lg sm:text-2xl font-bold mb-4">
                              Booking option
                            </h1>
                            <div className="space-y-2 sm:space-y-3 mb-4">
                              <label className="flex items-center gap-2 text-base sm:text-lg cursor-pointer">
                                <input
                                  type="radio"
                                  name="priceOption"
                                  value="best"
                                  defaultChecked
                                  className="form-radio h-5 w-5 text-blue-600"
                                />{" "}
                                Best Price
                              </label>
                              <label className="flex items-center gap-2 text-base sm:text-lg cursor-pointer">
                                <input
                                  type="radio"
                                  name="priceOption"
                                  value="flexible"
                                  className="form-radio h-5 w-5 text-blue-600"
                                />{" "}
                                Flexible Option
                              </label>
                            </div>
                            <p className="text-lg sm:text-xl font-bold mt-3">
                              Rs. {selectedVehicle.vehiclePrice}{" "}
                              <span className="text-sm font-normal">
                                / Per Day
                              </span>
                            </p>
                            <button
                              onClick={() => setShowDetails(!showDetails)}
                              className="mt-2 text-blue-600 underline hover:text-blue-800 text-xs sm:text-sm"
                            >
                              {showDetails
                                ? "Hide price details"
                                : "Price details"}
                            </button>

                            {showDetails && (
                              <div className="mt-3 border border-gray-300 p-3 sm:p-4 rounded-md bg-gray-50">
                                <h3 className="font-semibold text-sm sm:text-md mb-2">
                                  Price Details
                                </h3>
                                {lineItems.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2"
                                  >
                                    <span>{item.description}</span>
                                    <span className="font-medium">
                                      {item.amount}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex justify-between text-sm md:text-base font-bold mt-2 pt-2 border-t border-gray-300">
                                  <span>Total (approx.)</span>
                                  <span>$635.10</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end mt-4 sm:mt-6 md:mt-0">
                            <button
                              onClick={() =>
                                handleBookNow(
                                  selectedVehicle.id || selectedVehicle._id
                                )
                              }
                              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 transition duration-150"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No {vehicle} found.
            </div>
          )}
        </div>
      </section>
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
      <VehicleBooking />
    </Suspense>
  );
};

export default Page;
