import Booking from "@/ui/Booking";
import EarningIcon from "@/ui/EarningIcon";
import PassengerIcon from "@/ui/PassengerIcon";
import Dashboard2 from "./Dashboard2";
import EarningSummaryChart from "./EarningSummaryChart";
import GroupedBarChart from "./GroupedBarChart";

const Dashboard = () => {
  return (
    <main className="sm:m-[30px] sm:px-[30px] py-[10px] rounded-xl flex flex-col sm:flex-row justify-between w-full ">
      <div className="sm:w-[60%] w-full">
        <h1 className="text-[30px] font-bold">Dashboard</h1>
        <span className="my-[10px] flex flex-col sm:flex-row justify-between w-[100%] gap-5">
          <div className="bg-blue-700  sm:w-[30%] w-full rounded-lg p-[10px]">
            <div className="bg-white h-[50px] w-[80px] rounded-md flex justify-center items-center">
              <EarningIcon />
            </div>
            <h1 className="py-[20px] sm:text-xl text-white sm:font-extrabold">
              Rs. 95,000
            </h1>
            <h2 className="text-white sm:font-medium">Earning</h2>
          </div>
          <div className="bg-red-600 sm:w-[30%] w-full rounded-lg p-[10px]">
            <div className="bg-white h-[50px] w-[80px] rounded-md flex justify-center items-center">
              <PassengerIcon />
            </div>
            <h1 className="py-[20px] sm:text-xl text-white sm:font-extrabold">
              1000
            </h1>
            <h2 className="text-white sm:font-medium">Passengers</h2>
          </div>
          <div className="bg-yellow-500 sm:w-[30%] w-full rounded-lg p-[10px]">
            <div className="bg-white h-[50px] w-[80px] rounded-md flex justify-center items-center">
              <Booking />
            </div>
            <h1 className="py-[20px] sm:text-xl text-white sm:font-extrabold">
              500
            </h1>
            <h2 className="text-white sm:font-medium">Bookings</h2>
          </div>
        </span>
        <br />
        <EarningSummaryChart />
        <br />
        <GroupedBarChart />
      </div>
      <Dashboard2 />
    </main>
  );
};

export default Dashboard;
