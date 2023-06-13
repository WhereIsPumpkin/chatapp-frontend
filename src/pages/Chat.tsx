import { useEffect, useState, useContext } from "react";
import Avatar from "../components/Avatar.jsx";
import { UserContext } from "../UserContext.js";

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | undefined>(undefined);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { username, id } = useContext(UserContext);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4040");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }

  function handleMessage(ev: MessageEvent) {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    }
  }
  const onlinePeopleExcl0User = { ...onlinePeople };
  delete onlinePeopleExcl0User[id];

  return (
    <div className="flex h-screen font-poppins">
      <div className="bg-white w-1/3 pl-4 pt-4">
        <div
          className="text-blue-600 font-bold font-poppins flex items-center  p-4
        "
        >
          ConnectChat
        </div>

        {Object.keys(onlinePeopleExcl0User).map((userId) => (
          <div
            key={userId}
            onClick={() => setSelectedUserId(userId)}
            className={
              " cursor-pointer border-b border-gray-100 flex items-center gap-2 " +
              (userId === selectedUserId ? "bg-blue-50" : "")
            }
          >
            {userId === selectedUserId && (
              <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>
            )}
            <div className="flex gap-2 py-2 pl-4 items-center  ">
              <Avatar username={onlinePeople[userId]} userId={userId} />
              <span className="text-gray-800">{onlinePeople[userId]}</span>
            </div>
          </div>
        ))}
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
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="bg-white flex-grow border p-2 rounded-sm "
            placeholder="Type your message here"
          />
          <button className="bg-blue-500 p-2 text-white rounded-sm ">
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
        </div>
      </div>
    </div>
  );
};

export default Chat;
