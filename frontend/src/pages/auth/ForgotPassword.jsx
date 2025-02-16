import { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import useAuthRedirect from "../../hooks/useAuth";
import { forgotPassword } from "../../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useAuthRedirect();

  const handleEmail = async () => {
    try {
      if (email === "") {
        toast.error("Please provide email");
        return;
      }

      setIsloading(true);
      const response = await forgotPassword(email);
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send email. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center gap-8 px-0.5">
      <div className="w-full max-w-md">
        <div>
          <h1 className="text-primary text-center text-5xl font-extrabold">
            Forgot Password?
          </h1>
          <h2 className="text-center opacity-50 mt-2">
            {" "}
            Enter your email address and we&apos;ll send the link to reset your
            password.
          </h2>
        </div>

        {/* Email label and input */}
        <form onSubmit={handleEmail}>
          <div className="mx-auto flex flex-col items-center w-fit ">
            <div className="relative w-70 mx-auto my-6">
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
                  className="flex-1 px-2 text-base text-gray-600 outline-none placeholder:text-sm"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="ramshrestha@gmail.com"
                />
              </div>
            </div>
            <Button isLoading={isLoading} text="Sending Email ...">
              Send Email
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
