import Register from "./pages/RegisterAndLoginForm";
import Chat from "./pages/Chat";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Routes = () => {
  const { username } = useContext(UserContext);

  if (username) {
    return <Chat />;
  }

  return <Register />;
};

export default Routes;
