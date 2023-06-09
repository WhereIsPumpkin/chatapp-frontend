/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext, useRef } from "react";
import Contact from "../components/Contact.js";
import { uniqBy } from "lodash";
import { UserContext } from "../UserContext.js";
import axios from "axios";

interface Person {
  _id: string;
  username: string;
  avatar: string;
}

interface User {
  username: string;
  avatar: string;
}

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [offlinePeople, setOfflinePeople] = useState<{
    [userId: string]: Person;
  }>({});

  const [messages, setMessages] = useState<
    { sender: string; text: string; file: string | null; _id: number }[]
  >([]);

  const { id, setId, setUsername } = useContext(UserContext);
  const divUnderMessages = useRef<HTMLDivElement>(null);

  useEffect(() => {
    connectToWs();
  }, []);

  function connectToWs() {
    const ws = new WebSocket(
      "wss://chatapp-backend-production-9079.up.railway.app"
    );
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.onmessage = (event) => {
      handleMessage(JSON.parse(event.data));
    };
    ws.addEventListener("close", () => {
      setTimeout(() => {
        connectToWs();
      }, 1000);
    });
  }

  function showOnlinePeople(
    peopleArray: { userId: string; username: string; avatar: string }[]
  ) {
    const people: { [key: string]: { username: string; avatar: string } } = {};
    peopleArray.forEach(({ userId, username, avatar }) => {
      people[userId] = { username, avatar };
    });
    setOnlinePeople(people);
  }

  function handleMessage(ev: MessageEvent) {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (
        messageData.sender === selectedUserId ||
        messageData.recipient === id
      ) {
        setMessages((prevMessages) => [...prevMessages, { ...messageData }]);
      }
    }
  }

  function sendMessage(ev: React.FormEvent | null, file: File | null = null) {
    if (ev) ev.preventDefault();

    if (ws) {
      ws.send(
        JSON.stringify({
          recipient: selectedUserId,
          text: newMessageText,
          file,
        })
      );
    }

    if (file) {
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    } else {
      setNewMessageText("");
      setMessages((prev) => [
        ...prev,
        {
          text: newMessageText,
          sender: String(id),
          recipient: selectedUserId,
          _id: Date.now(),
          file: null,
        },
      ]);
    }
  }

  function sendFile(ev: React.ChangeEvent<HTMLInputElement>) {
    if (ev.target.files && ev.target.files.length > 0) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const fileToSend = new File([arrayBuffer], file.name, {
          type: file.type,
        });
        sendMessage(null, fileToSend);
      };
    }
  }

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    axios.get<Person[]>("/people").then((res) => {
      const offlinePeopleArr = res.data
        .filter((p) => p._id !== id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople: { [key: string]: Person } = {};

      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p;
      });
      setOfflinePeople(offlinePeople);
    });
  }, [id, onlinePeople]);

  useEffect(() => {
    if (selectedUserId) {
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  function logout() {
    axios.post("/logout").then(() => {
      setWs(null);
      setId(null);
      setUsername(null);
    });
  }

  useEffect(() => {
    if (selectedUserId && ws) {
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId, ws]);

  const onlinePeopleExcl0User: { [userId: string]: User } = { ...onlinePeople };

  if (id !== null) {
    delete onlinePeopleExcl0User[id];
  }

  const messagesWithoutDupes = uniqBy(messages, "_id");

  return (
    <div className="flex h-screen font-poppins">
      <div className="bg-white w-1/3 flex flex-col">
        <div
          className="text-blue-600 font-bold font-poppins flex items-center p-4 max-[400px]:pl-4 max-[400px]:text-sm
        "
        >
          ConnectChat
        </div>

        <div className="flex-grow">
          {Object.keys(onlinePeopleExcl0User).map((userId) => (
            <Contact
              key={userId}
              id={userId}
              online={true}
              username={onlinePeopleExcl0User[userId].username}
              onClick={() => setSelectedUserId(userId)}
              selected={userId === selectedUserId}
              profilePic={onlinePeopleExcl0User[userId].avatar}
            />
          ))}

          {Object.keys(offlinePeople).map((userId) => (
            <Contact
              key={userId}
              id={userId}
              online={false}
              username={offlinePeople[userId].username}
              onClick={() => setSelectedUserId(userId)}
              selected={userId === selectedUserId}
              profilePic={offlinePeople[userId].avatar}
            />
          ))}
        </div>

        <div className="p-2 text-center ml-auto mr-auto">
          <button
            onClick={logout}
            className="text-sm bg-blue-100 py-1 px-2 text-gray-500 border rounded-sm flex gap-1 items-center"
          >
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            logout
          </button>
        </div>
      </div>

      <div className="flex flex-col bg-blue-50 w-2/3 p-2">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex h-full items-center justify-center">
              <div className="text-gray-300">
                &larr; Select a person from the sidebar
              </div>
            </div>
          )}
          {!!selectedUserId && (
            <div className="relative h-full">
              <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                {messagesWithoutDupes.map((message) => (
                  <div
                    key={message._id}
                    className={
                      message.sender === id ? "text-right" : "text-left"
                    }
                  >
                    <div
                      className={
                        "  text-left inline-block p-2 my-2 rounded-md text-sm " +
                        (message.sender === id
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-500")
                      }
                    >
                      {message.text}
                      {message.file && (
                        <div>
                          <a
                            target="_blank"
                            className=" flex items-center gap-1 border-b"
                            href={
                              axios.defaults.baseURL +
                              "/uploads/" +
                              message.file
                            }
                          >
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

                            {message.file}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessages}></div>
              </div>
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              value={newMessageText}
              onChange={(ev) => setNewMessageText(ev.target.value)}
              type="text"
              className="bg-white flex-grow border p-2 rounded-sm max-[400px]:w-[20px] "
              placeholder="Type your message here"
            />
            <label className="bg-blue-200 p-2 text-gray-600 rounded-sm border border-blue-200 cursor-pointer">
              <input
                type="file"
                className="hidden cursor-pointer"
                onChange={sendFile}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <button
              type="submit"
              className="bg-blue-500 p-2 text-white rounded-sm "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
