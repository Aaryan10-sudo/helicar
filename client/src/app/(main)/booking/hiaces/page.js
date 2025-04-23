"use client";
import VehicleSkeleton from "@/components/loader/vehicleSkeleton";
import { baseURL } from "@/config/config";
import { dummyCars } from "@/data/dummyData";
import Loggages from "@/ui/Loggages";
import ManualIcon from "@/ui/ManualIcon";
import PeopleIcon from "@/ui/PeopleIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hiace, setHiace] = useState([]);

  const handleBookNow = (cardId) => {
    router.push(`/complete-booking?cardId=${cardId}`);
  };

  const getAllHiace = async () => {
    try {
      setLoading(true);
      let hiace = await axios({
        method: "GET",
        url: `${baseURL}/vehicle/get/hiace`,
      });
      setHiace(hiace.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllHiace();
  }, []);

  return (
    <div className="bg-[#f8f9fa] text-black w-full h-auto py-[10px]">
      <main>
        <section>
          <h2 className="text-3xl font-semibold border-b px-[120px] py-[30px] border-gray-400">
            Which hiace do you want to ride?
          </h2>
          <div className="flex items-center justify-between gap-5 flex-wrap flex-row-4">
            {loading ? (
              // Show 6 skeleton placeholders while loading
              [...Array(8)].map((_, index) => <VehicleSkeleton key={index} />)
            ) : (
              <div className="grid grid-cols-4 mt-[30px] w-full">
                {hiace.map((value, index) => (
                  <div
                    key={index}
                    className="p- m-4 bg-white rounded-lg shadow-lg flex items-start justify-start flex-col w-[340px] h-[402px]"
                  >
                    <div className="relative w-full h-[60%]">
                      <img
                        src={value.vehicleImage}
                        alt="car"
                        className="w-full h-full object-cover rounded-tr-md rounded-tl-md"
                      />
                      <span className="absolute bottom-2 left-2 bg-[#212529] text-white text-lg bg-opacity-70 px-2 py-1 font-semibold rounded">
                        {value.vehicleName}
                      </span>
                    </div>

                    <div className="p-2 flex items-center gap-3.5 justify-between flex-col w-full">
                      <div className="mt-2 flex items-center text-gray-500 justify-between gap-3">
                        <p className="flex items-center justify-center gap-1">
                          <Loggages /> {value.features.luggage} luggage
                        </p>
                        <p className="flex items-center gap-1">
                          <PeopleIcon /> {value.features.seats} persons
                        </p>
                        <p className="flex items-center gap-1">
                          <ManualIcon /> {value.features.transmission}
                        </p>
                      </div>
                      <div className="mt-3 p-1 flex items-center justify-between w-full">
                        <p className="text-xl font-semibold flex items-center justify-center gap-1">
                          Rs. {value.vehiclePrice}/{" "}
                          <span className="text-sm">per Day</span>
                        </p>

                        {value.vehicleStatus === "Occupied" ? (
                          <button
                            disabled
                            className="bg-red-600 cursor-not-allowed text-white px-4 py-2 rounded-full mt-2"
                          >
                            Occupied
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBookNow(value.id)}
                            type="submit"
                            className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-full mt-2"
                          >
                            Book now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="flex items-center justify-center flex-col bg-gray-100">
          {/* <img src="" alt="" /> */}
        </section>
      </main>
    </div>
  );
};

export default page;
