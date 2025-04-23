const VehicleSkeleton = () => {
    return (
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl shadow-xl transition-shadow animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
        <div className="flex justify-between text-sm">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-10 bg-gray-300 rounded-lg w-1/4"></div>
        </div>
      </div>
    );
  };
  
  export default VehicleSkeleton;
  