import axios from "axios";

interface AvatarProps {
  userId: string;
  username: string;
  online?: boolean;
  profilePic: string;
}

const Avatar = ({ userId, username, online, profilePic }: AvatarProps) => {
  profilePic = axios.defaults.baseURL + "/" + profilePic;

  const colors = [
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-fuchsia-200",
    "bg-rose-200",
  ];

  const userIdBase10 = parseInt(userId, 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <div
      className={
        "w-8 h-8 relative rounded-full flex items-center overflow-hidden " +
        color
      }
    >
      <img
        src={profilePic}
        alt="avatarIMG"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {online && (
        <div className="absolute w-3 h-3 bg-green-400 bottom-0 right-0 rounded-full border border-white "></div>
      )}

      {!online && (
        <div className="absolute w-3 h-3 bg-gray-200 bottom-0 right-0 rounded-full border border-white "></div>
      )}
    </div>
  );
};

export default Avatar;
