// import { useEffect } from "react";
// import NProgress from "nprogress";

// const RoutingLoader = () => {
//   useEffect(() => {
//     NProgress.start();

//     return () => {
//       NProgress.done();
//     };
//   }, []);
// };

// export default RoutingLoader;

const Spinner = ({ size = "w-24 h-24", color = "border-blue-500" }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-8 border-t-transparent ${size} ${color}`}
      ></div>
    </div>
  );
};

export default Spinner;
