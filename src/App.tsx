import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { Route, Routes as RoutesDOM } from "react-router-dom";
import Routes from "./Routes";
import ResetPasswordNotification from "./pages/ResetPasswordNotification";
import UpdatePassowrd from "./pages/RecoverPassword";
import ForgotPassowrd from "./pages/ForgotPassowrd";

function App() {
  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <RoutesDOM>
        <Route path="/" element={<Routes />} />
        <Route path="/password-recovery" element={<ForgotPassowrd />} />
        <Route path="/password-update" element={<UpdatePassowrd />} />
        <Route
          path="/reset-password-notification"
          element={<ResetPasswordNotification />}
        />
      </RoutesDOM>
    </UserContextProvider>
  );
}

export default App;
