import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

interface Props {
  username: string;
  profileImage: string;
  onFollow: (username: string) => void;
}

export default function SingleUserCard({
  username,
  profileImage,
  onFollow,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    onFollow(username);
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center my-5 justify-between">
      <div className=" flex space-x-2">
        <Image
          src={"https://avatars.githubusercontent.com/u/112757838?v=4"}
          alt={username}
          className="w-10 h-10 rounded-full"
          width={40}
          height={20}

        />
        <div className="flex flex-col space-x-1">
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-[0.8rem] text-gray-500">Suggested for you</p>
        </div>
      </div>
     
      <Button variant="ghost" className="text-blue-500">Follow</Button>
    </div>
  );
}
