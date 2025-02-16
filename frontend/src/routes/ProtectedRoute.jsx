import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
