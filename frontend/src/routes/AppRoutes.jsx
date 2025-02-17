import { lazy, Suspense } from "react";
import RoutingLoader from "../components/loaders/RoutingLoader";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AuthLayout = lazy(() => import("../components/layout/AuthLayout"));
const Login = lazy(() => import("../pages/auth/Login"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
<<<<<<< Updated upstream
=======
const ContactUs = lazy(() => import("../pages/user/Company"));
const VehicleRental = lazy(() => import("../pages/user/VehicleRental"));
>>>>>>> Stashed changes

const CollegeDashboardLayout = lazy(
  () => import("../components/layout/CollegeDashboardLayout")
);
const Dashboard = lazy(() => import("../pages/college/dashboard/Dashboard"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<RoutingLoader />}>
      <Routes>
<<<<<<< Updated upstream
=======
        <Route path="/company" element={<ContactUs />} />
        <Route path="/vehicle-rental" element={<VehicleRental />} />
>>>>>>> Stashed changes
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* College Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<CollegeDashboardLayout />}>
            <Route path="/college/dashboard" element={<Dashboard />} />
            <Route path="/college/students" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
