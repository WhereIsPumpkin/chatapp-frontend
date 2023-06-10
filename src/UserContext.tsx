import axios from "axios";
import { createContext, useState, useEffect } from "react";

interface UserContextValue {
  username: string;
  setUsername: (value: string) => void;
  id: number | null;
  setId: (value: number | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  username: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUsername: () => {},
  id: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setId: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [username, setUsername] = useState<string>("");
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    axios.get("/profile").then((response) => {
      setId(response.data.userId);
      setUsername(response.data.username);
    });
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
