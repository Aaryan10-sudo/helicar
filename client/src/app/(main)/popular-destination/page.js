import { Destination } from "@/lib/data";
import BusIcon from "@/ui/BusIcon";
import CarIcon from "@/ui/CarIcon";
import HiaceIcon from "@/ui/HiaceIcon";
import JeepIcon from "@/ui/JeepIcon";
import Link from "next/link";

export default async function PopularDestinationPage({ searchParams }) {
  const { id } = await searchParams;

  const destinationData = Destination.find((item) => item.id === parseInt(id));

  if (!destinationData) {
    return <div>Destination not found</div>;
  }
  console.log(destinationData);
  return (
    <div className="m-10">
      <section className="w-full flex justify-between gap-15  max-w-[1700px] mx-auto">
        <div className="w-[60%]">
          <img
            src={destinationData.image.src}
            className="h-[400px] w-full rounded-lg"
          />
        </div>
        <div className=" flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-black text-center">
            Explore vehicles and services
          </h1>
          <br />
          <ul className="flex flex-col gap-4 w-[100%]">
            <li className="flex items-center gap-2 px-4 py-2 w-[180px] bg-gray-100 rounded-full shadow-sm">
              <CarIcon /> Car
            </li>
            <li className="flex items-center gap-2 px-4 py-2 w-[180px] bg-gray-100 rounded-full shadow-sm">
              <JeepIcon /> Jeep
            </li>
            <li className="flex items-center gap-2 px-4 py-2 w-[180px] bg-gray-100 rounded-full shadow-sm">
              <HiaceIcon /> Hiace
            </li>
            <li className="flex items-center gap-2 px-4 py-2 w-[180px] bg-gray-100 rounded-full shadow-sm">
              <BusIcon /> Bus
            </li>
            <li className="flex items-center gap-2 px-4 py-2 w-[180px] bg-gray-100 rounded-full shadow-sm">
              <BusIcon /> Tourist Bus
            </li>
          </ul>
        </div>
      </section>
      <section className="flex justify-between max-w-[1700px] mx-auto">
        <div className="w-[60%]">
          <h1 className="my-5 text-[30px] font-bold">{destinationData.name}</h1>
          <h2 className="text-[20px] font-bold">Itinerary</h2>
          <p>
            Delight in the fascinating sights of Turkey, from the bazaars
            of Istanbul to the fairy chimneys of Cappadocia. Cruise on
            the Bosphorus, discover the caves of the Goreme Valley and visit
            the Cotton Castle of Pamukkale. Discover the ancient ruins
            of Ephesus before discovering the heritage of Izmir and Canakkale at
            the archaeological sites of Pergamon and Troy!
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d446891.8324680704!2d83.53400836948978!3d28.947565914842453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39be6c7eb19f2ab7%3A0x2c40a8c5a03d3c04!2sMustang!5e0!3m2!1sen!2snp!4v1745476878468!5m2!1sen!2snp"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="my-[20px] w-full h-[500px] "
          ></iframe>
        </div>
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-[20px]">More Destination to discover</h2>
          {Destination.filter((value) => value.id !== parseInt(id))
            .slice(0, 2)
            .map((value, index) => (
              <section
                key={index}
                className="h-[320px] w-[400px] shadow-xl py-[20px]"
              >
                <div
                  className="h-[240px] bg-cover"
                  style={{
                    backgroundImage: `url(${value.image.src || "/default-hero.jpg"})`,
                  }}
                ></div>
                <h1 className="px-[5px] font-bold text-[20px]">{value.name}</h1>
                <p className="px-[5px]">One day trip from Kathmandu</p>
              </section>
            ))}
        </div>
      </section>
    </div>
  );
}
