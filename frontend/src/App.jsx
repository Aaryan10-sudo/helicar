import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer
        autoClose={2200}
        pauseOnHover
        closeOnClick
        position="top-right"
      />
    </Router>
  );
}

export default App;
