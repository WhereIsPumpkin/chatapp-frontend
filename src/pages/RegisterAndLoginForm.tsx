import axios from "axios";
import { useState, FormEvent, useContext } from "react";
import { UserContext } from "../UserContext.tsx";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const RegisterAndLoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("login");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = isLoginOrRegister === "register" ? "register" : "login";

    const { data } = await axios.post(url, { username, password, email });
    setLoggedInUsername(username);
    setId(data.id);
  };

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
        </div>
        {isLoginOrRegister === "login" && (
          <div className="text-right">
            <button
              onClick={() => navigate("/password-recovery")}
              className="text-customBlue text-xs font-normal"
            >
              Forgot Password?
            </button>
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
