// pages/booking-confirmation.jsx

import Image from "next/image";

export default function BookingConfirmation() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 flex-col items-center">
      <p className="text-center  text-gray-400 mt-4 text-lg mb-4">
        Your booking request Successful !!!
      </p>
      <div className="max-w-xl w-full bg-[#f3fbff] rounded-xl shadow-lg pb-6 flex flex-col items-center">
        <div className="w-[80%] flex justify-center mt-4">
          <img
            src="https://helicar.nnine.training/_next/image?url=%2Fblog.jpg&w=1920&q=75"
            alt="Car image"
            className="rounded-md shadow-md hover:scale-105 transition-transform duration-300 "
          />
        </div>

        <div className="px-6 mt-4 w-full">
          <p className="text-xl font-semibold mt-2">Jeep</p>
          <p className="text-gray-500">asdfnnsdfij</p>

          <div className="flex items-center mt-2 text-sm">
            <span className="mr-2">🧍‍♂️</span>
            <span>9 Seats</span>
          </div>

          <div className="flex items-center mt-1 text-sm">
            <span className="mr-2">🚗</span>
            <span>License: BA 1 JA 2023</span>
          </div>

          <hr className="my-4" />

          <div className="mt-2">
            <p className="font-semibold">📍 Pickup</p>
            <p>Kathmandu , KMC hospital</p>
            <p>April 14, 2025 | 08:00 AM</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold">📍 Destination</p>
            <p>Kathmandu , KMC hospital</p>
            <p>April 14, 2025 | 12:00 PM</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold">Your booking overview:</p>
            <ul className="list-none mt-2 space-y-1 text-sm">
              <li>
                <span className="text-green-600 font-bold">✓</span> 24/7
                Roadside Assistance Hotline
              </li>
              <li>
                <span className="text-green-600 font-bold">✓</span> GPS
              </li>
              <li>
                <span className="text-green-600 font-bold">✓</span> Limited
                Miles
              </li>
              <li>
                <span className="text-green-600 font-bold">✓</span> Booking
                option: Best price - pay now, cancel and rebook for a
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
