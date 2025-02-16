import { useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../../components/common/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/authApi";
import useAuthRedirect from "../../hooks/useAuth";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [newPassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useAuthRedirect();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      if (!newPassword || !confirmPassword) {
        toast.error("Please fill both fields.");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      setIsloading(true);
      const response = await resetPassword(token, newPassword);
      console.log(response);
      toast.success(response.data?.message || "Password updated successfully.");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update password.";
      toast.error(errorMessage);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-0.5">
      <div className="flex w-full max-w-md flex-col items-center gap-2">
        {/* Title and description */}
        <div>
          <h1 className="text-primary mb-6 text-center text-5xl font-extrabold">
            Change Password
          </h1>
          <div className="text-center opacity-50 md:px-[5px]">
            Set the new password for your account so you can login and access
            all features.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleReset} className="w-full max-w-xs">
          {/* New Password input */}
          <div className="relative mt-4">
            <label
              htmlFor="new-password"
              className="text-primary absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold"
            >
              New Password
            </label>
            <div className="border-primary flex items-center rounded-lg border px-3 py-2">
              <span className="text-xl">
                <img src={assets.lock} alt="password icon" />
              </span>
              <input
                onChange={(e) => setNewpassword(e.target.value)}
                value={newPassword}
                type={showPassword ? "text" : "password"}
                id="new-password"
                className="flex-1 px-2 text-base text-gray-600 outline-none placeholder:text-sm"
                placeholder="Enter new password"
              />
              <img
                src={showPassword ? assets.eyeclosed : assets.eyeopen}
                alt="show password"
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>

          {/* Confirm Password input */}
          <div className="relative mt-5">
            <label
              htmlFor="confirm-password"
              className="text-primary absolute -top-2 left-3 bg-white px-1 text-[11px] font-bold"
            >
              Confirm Password
            </label>
            <div className="border-primary flex items-center rounded-lg border px-3 py-2">
              <span className="text-xl">
                <img src={assets.lock} alt="lock icon" />
              </span>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type={showPasswordConfirm ? "text" : "password"}
                id="confirm-password"
                className="flex-1 px-2 text-base text-gray-600 outline-none placeholder:text-sm"
                placeholder="Re-enter password"
              />
              <img
                src={showPasswordConfirm ? assets.eyeclosed : assets.eyeopen}
                alt="show password"
                className="cursor-pointer"
                onClick={() => setShowPasswordConfirm((prev) => !prev)}
              />
            </div>
          </div>

          {/* Update Password Button */}
          <div className="mt-4 text-center">
            <Button isLoading={isLoading} text={"Updating ..."}>
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
