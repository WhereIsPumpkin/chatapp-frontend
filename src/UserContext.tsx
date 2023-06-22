import axios from "axios";
import { createContext, useState, useEffect } from "react";

interface UserContextValue {
  username: string | null;
  setUsername: (value: string | null) => void;
  id: number | string | null;
  setId: (value: number | string | null) => void;
  profilePic: string;
  setProfilePic: (value: string) => void;
}

export const UserContext = createContext<UserContextValue>({
  username: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUsername: () => {},
  id: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setId: () => {},
  profilePic: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProfilePic: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [username, setUsername] = useState<string | null>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [id, setId] = useState<number | string | null>(null);

  useEffect(() => {
    axios.get("/profile").then((response) => {
      setId(response.data.userId);
      setUsername(response.data.username);
      setProfilePic("/" + response.data.avatar);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ username, setUsername, id, setId, setProfilePic, profilePic }}
    >
      {children}
    </UserContext.Provider>
  );
}
