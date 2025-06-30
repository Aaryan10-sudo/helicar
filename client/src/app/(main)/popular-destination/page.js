"use client";
import { Destination } from "@/lib/data";
import BusIcon from "@/ui/BusIcon";
import CarIcon from "@/ui/CarIcon";
import HiaceIcon from "@/ui/HiaceIcon";
import JeepIcon from "@/ui/JeepIcon";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/config/config";
import { useSearchParams } from "next/navigation";

const PopularDestinationPage = () => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const [dataDestination, setDestinationData] = useState({});
  const [openItinerary, setOpenItinerary] = useState({});
  const vehicleTypes = [
    { name: "Cars", icon: <CarIcon />, slug: "cars" },
    { name: "Jeep", icon: <JeepIcon />, slug: "jeeps" },
    { name: "Toyota Hiace", icon: <HiaceIcon />, slug: "hiace" },
    { name: "Bus", icon: <BusIcon />, slug: "bus" },
  ];

  const getEmbedUrl = (url) => {
    if (!url) return "https://www.google.com/maps";
    try {
      const shortPattern = /^https:\/\/maps\.app\.goo\.gl\/(.+)/;
      const placePattern = /\/maps\/place\/([^/]+)/;

      if (placePattern.test(url)) {
        const place = url.match(placePattern)[1];
        return `https://www.google.com/maps?q=${decodeURIComponent(place)}&output=embed`;
      }

      if (shortPattern.test(url)) {
        return "";
      }

      return url.includes("output=embed") ? url : `${url}&output=embed`;
    } catch {
      return "https://www.google.com/maps";
    }
  };

  const handleToggle = (index) => {
    setOpenItinerary((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    async function getDestinationDetails() {
      try {
        const result = await axios({
          url: `${baseURL}/popular-destination/get-by-name?name=${destination}`,
          method: "GET",
        });
        setDestinationData(result.data.data);
      } catch (error) {
        setDestinationData({});
      }
    }

    if (destination) getDestinationDetails();
  }, [destination]);

  const destinationData =
    dataDestination && Object.keys(dataDestination).length > 0
      ? dataDestination
      : Destination.find((item) => item.name === destination);

  if (!destinationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Destination not found
          </h1>
          <p className="text-gray-600">
            The destination you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Kathmandu
            </Link>
            <span>›</span>
            <span className="text-gray-900">{destinationData.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Hero Image */}
          <div className="lg:col-span-2">
            <div className="relative h-[400px] rounded-xl overflow-hidden object-cover object-center ">
              <Image
                src={
                  typeof destinationData.image === "string"
                    ? destinationData.image
                    : destinationData.image?.src || "/placeholder.svg"
                }
                alt={destinationData.name || "Destination"}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right Column - Vehicle Services */}
          <div className=" rounded-xl p-6  h-fit">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
              Explore vehicles and services
            </h2>
            <div className="space-y-3">
              {vehicleTypes.map((vehicle, index) => (
                <Link
                  key={index}
                  href={`/booking?vehicle=${vehicle.slug}&pickUp=Kathmandu&package=${destinationData.name}`}
                  className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 group"
                >
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {vehicle.icon}
                  </div>
                  <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                    {vehicle.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Destination Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className=" rounded-xl p-6 ">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {destinationData.name}
              </h1>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Itinerary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {destinationData.description}
                </p>
              </div>

              {destinationData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {Array.isArray(destinationData.itinerary) &&
                  destinationData.itinerary.length > 0 ? (
                    destinationData.itinerary.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-1 text-sm text-gray-600 border rounded-lg p-3 bg-white shadow"
                      >
                        <button
                          type="button"
                          className="flex items-center gap-2 font-semibold focus:outline-none hover:text-blue-600 transition"
                          onClick={() => handleToggle(index)}
                        >
                          <Calendar className="w-4 h-4 mt-1" />
                          {item.day ? `Day ${item.day}` : `Day ${index + 1}`}
                          {item.title && (
                            <>
                              {" "}
                              - <span>{item.title}</span>
                            </>
                          )}
                          <span className="ml-auto text-xs text-blue-500">
                            {openItinerary[index] ? "Hide" : "Show"}
                          </span>
                        </button>
                        {openItinerary[index] && (
                          <div className="text-gray-500 mt-2">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 col-span-3">
                      No itinerary available.
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>1st day - Kathmandu on board</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>2nd day - Pokhara</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>3rd day - Pokhara</span>
                  </div>
                </div>
              )}

              {/* --- Price Section: One Way & Two Way --- */}
              <div className="mt-8 rounded-xl p-6 bg-blue-50 border border-blue-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">💸</span>
                  Price
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-700 mb-2">
                      One Way
                    </span>
                    <span className="text-2xl font-bold text-blue-700">
                      Rs. 10,000
                    </span>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-700 mb-2">
                      Two Way
                    </span>
                    <span className="text-2xl font-bold text-blue-700">
                      Rs. 20,000
                    </span>
                  </div>
                </div>
              </div>
              {/* --- End Price Section --- */}

              {/* Trip Details */}
            </div>

            <div className=" rounded-xl p-6 ">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location
              </h3>
              <div className="rounded-lg overflow-hidden">
                {getEmbedUrl(destinationData.location) ? (
                  <iframe
                    src={getEmbedUrl(destinationData.location)}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[400px] border-0"
                  />
                ) : (
                  <p className="text-gray-500">
                    Map preview not available.{" "}
                    <a
                      href={destinationData.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View on Google Maps
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - More Destinations */}
          <div className="space-y-6">
            <div className=" rounded-xl p-6 ">
              <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
                More Destination to Discover
              </h2>
              <div className="space-y-4">
                {Destination.filter((value) => value.name !== destination)
                  .slice(0, 2)
                  .map((value, index) => (
                    <div
                      key={index}
                      className=" rounded-lg  overflow-hidden shadow-xl transition-shadow duration-200"
                    >
                      <div className="relative h-48">
                        <Image
                          src={
                            value.image?.src ||
                            "/placeholder.svg?height=200&width=400"
                          }
                          alt={value.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {value.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          One day trip from Kathmandu
                        </p>
                        <Link
                          href={`/popular-destination?destination=${value.name}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Explore destination →
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <PopularDestinationPage />
    </Suspense>
  );
};

export default Page;
