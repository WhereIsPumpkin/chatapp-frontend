import Register from "./RegisterAndLoginForm";
import Chat from "./Chat";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Routes = () => {
  const { username, id } = useContext(UserContext);

  if (username) {
    return <Chat />;
  }

  return <Register />;
};

export default Routes;
