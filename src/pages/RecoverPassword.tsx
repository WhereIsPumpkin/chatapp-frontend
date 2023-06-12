import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("passwords do not match");
      return;
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      await axios.post("/reset-password", {
        token,
        password,
      });
      navigate("/");
    } catch (error) {
      if (error) throw error;
    }
  };

  return (
    <div className="flex flex-col gap-8 px-8 pt-4 font-poppins">
      <div>
        <svg
          onClick={() => navigate("/")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-[#1D2029] font-bold text-2xl">Reset Password</h1>
          <p className="text-[#ABB4BD] font-normal text-sm">
            Please enter your new password and confirm the password.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-[5px]">
              {password && (
                <label className="text-placeholder text-xs font-normal">
                  Password
                </label>
              )}
              <input
                value={password}
                onChange={(el) => setPassword(el.target.value)}
                type="Password"
                placeholder="Password"
                className="block w-full rounded-sm p-2 mb-2 border-b border-customGray font-normal focus:outline-none text-xs "
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              {confirmPassword && (
                <label className="text-placeholder text-xs font-normal">
                  Confirm Password
                </label>
              )}
              <input
                value={confirmPassword}
                onChange={(el) => setConfirmPassword(el.target.value)}
                type="Password"
                placeholder="Confirm Password"
                className="block w-full rounded-sm p-2 mb-2 border-b border-customGray font-normal focus:outline-none text-xs "
              />
            </div>
          </div>
          <button className="bg-customBlue text-white block w-full rounded font-medium py-3 mt-7">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
