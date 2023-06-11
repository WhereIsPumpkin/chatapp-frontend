import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassowrd = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/reset-password-notification");
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
          <h1 className="text-[#1D2029] font-bold text-2xl">Forgot Password</h1>
          <p className="text-[#ABB4BD] font-normal text-sm">
            Please enter your registered email or mobile to reset your password.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[5px]">
            {email && (
              <label className="text-placeholder text-xs font-normal">
                Email
              </label>
            )}
            <input
              value={email}
              onChange={(el) => setEmail(el.target.value)}
              type="Email"
              placeholder="Email"
              className="block w-full rounded-sm p-2 mb-2 border-b border-customGray font-normal focus:outline-none text-xs "
            />
          </div>
          <button className="bg-customBlue text-white block w-full rounded  font-medium py-3 mt-7">
            Recover Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassowrd;
