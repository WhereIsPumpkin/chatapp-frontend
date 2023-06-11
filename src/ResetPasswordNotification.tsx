import emailIcon from "./assets/Mail.png";
import { useNavigate } from "react-router-dom";

const ResetPasswordNotification = () => {
  const navigate = useNavigate();
  return (
    <div className="px-10 pt-8 font-poppins flex flex-col items-center">
      <svg
        onClick={() => navigate("/")}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-7 h-7 ml-auto mb-20"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <div className="flex flex-col max-w-[201px] items-center gap-5">
        <img src={emailIcon} alt="Email" />
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-[#1D2029] font-semibold text-xl">
            Check you Email
          </h1>
          <p className="text-placeholder text-sm font-normal w-[276px] text-center">
            We have sent you a reset password link on your registered email
            address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordNotification;
