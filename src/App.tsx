import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { Route, Routes as RoutesDOM, Navigate } from "react-router-dom";
import Routes from "./Routes";
import ResetPasswordNotification from "./ResetPasswordNotification";
import ForgotPassowrd from "./ForgotPassowrd";

function App() {
  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <RoutesDOM>
        <Route path="/" element={<Routes />} />
        <Route path="/password-recovery" element={<ForgotPassowrd />} />
        <Route
          path="/reset-password-notification"
          element={<ResetPasswordNotification />}
        />
      </RoutesDOM>
    </UserContextProvider>
  );
}

export default App;
