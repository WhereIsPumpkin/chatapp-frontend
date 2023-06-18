import axios from "axios";
import { useState, FormEvent, useContext } from "react";
import { UserContext } from "../UserContext.tsx";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const RegisterAndLoginForm = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<File>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = isLoginOrRegister === "register" ? "register" : "login";

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    if (isLoginOrRegister === "login") {
      const { data } = await axios.post(url, {
        username,
        password,
      });
      setLoggedInUsername(username);
      setId(data.id);
    } else {
      const { data } = await axios.post(url, formData);
      setLoggedInUsername(username);
      setId(data.id);
    }
  };

  function handleAvatarChange(e) {
    if (e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
      console.log(e.target.files[0]);
    } else {
      console.log("No avatar selected");
    }
  }
  return (
    <div className="bg-white h-screen flex flex-col gap-12 items-center px-7 pt-12 font-poppins">
      <img src={logo} className="w-40 h-30" />
      <form className="w-full mx-auto mb-12" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 mb-4">
          {isLoginOrRegister === "register" && (
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
          )}
          <div className="flex flex-col gap-[5px]">
            {username && (
              <label className="text-placeholder text-xs font-normal">
                Username
              </label>
            )}
            <input
              value={username}
              onChange={(el) => setUsername(el.target.value)}
              type="text"
              placeholder="Username"
              className="block w-full rounded-sm p-2 mb-2 border-b border-customGray font-normal focus:outline-none text-xs "
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            {password && (
              <label className="text-placeholder text-xs font-normal">
                Password
              </label>
            )}
            <input
              value={password}
              onChange={(el) => setPassword(el.target.value)}
              type="password"
              placeholder="Password"
              className="block w-full focus:outline-none rounded-sm p-2  border-b border-customGray text-xs font-normal"
            />
          </div>
          {isLoginOrRegister === "register" && (
            <label className="flex items-center gap-1 border-b p-2 border-customGray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
              <span className="text-placeholder font-normal text-xs">
                Choose Avatar
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          )}
        </div>
        {isLoginOrRegister === "login" && (
          <div className="text-right">
            <a
              onClick={() => navigate("/password-recovery")}
              className="text-customBlue text-xs font-normal"
            >
              Forgot Password?
            </a>
          </div>
        )}

        <button className="bg-customBlue text-white block w-full rounded mb-7 font-medium py-3 mt-7">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div className="text-[#ABB4BD] text-xs font-normal">
              Already a memeber?{" "}
              <button
                className="text-customBlue text-xs font-normal"
                onClick={() => setIsLoginOrRegister("login")}
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div className="text-[#ABB4BD] text-xs font-normal">
              Don’t have an account?{" "}
              <button
                className="text-customBlue text-xs font-normal"
                onClick={() => setIsLoginOrRegister("register")}
              >
                Register Now
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLoginForm;
