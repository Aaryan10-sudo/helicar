import { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import useAuthRedirect from "../../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  useAuthRedirect();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const response = await login(email, password);
      console.log(response);

      // Redirect based on role
      switch (response.user?.role) {
        case "admin":
          navigate("/college/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          navigate("/");
      }

      toast.success("Logged in successfuly");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center gap-8">
      <div className="w-full max-w-md">
        <div>
          <h1 className="text-primary text-center text-5xl font-extrabold">
            Welcome
          </h1>
          <h2 className="text-center text-2xl font-bold">Login</h2>
        </div>

        {/* Email label and input */}
        <form onSubmit={handleLogin}>
          <div className="relative w-70 md:w-68 mt-6">
            <label
              htmlFor="email"
              className="text-primary absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold"
            >
              Email Id
            </label>
            <div className="border-primary flex items-center rounded-lg border px-3 py-2">
              <span className="text-xl">
                <img src={assets.sms} alt="email icon" />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-2 text-base text-gray-600 outline-none placeholder:text-sm"
                placeholder="ramshrestha@gmail.com"
              />
            </div>
          </div>

          {/* Password label and input */}
          <div className="relative w-70 md:w-68 mt-7">
            <label
              htmlFor="password"
              className="text-primary absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold"
            >
              Password
            </label>
            <div className="border-primary flex items-center rounded-lg border px-3 py-2">
              <span className="text-xl">
                <img src={assets.lock} alt="lock icon" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-2 text-base text-gray-600 outline-none placeholder:text-sm"
                placeholder="***********"
              />

              <img
                src={showPassword ? assets.eyeclosed : assets.eyeopen}
                alt="show password"
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>
          <span className="text-primary md:mr-4 mt-3 flex justify-end text-[15px] font-bold hover:underline">
            <Link to={"/forgot-password"}>Forgot your password?</Link>
          </span>
          <div className="mt-6 flex justify-center">
            <Button isLoading={isLoading} text="Logging in ...">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
