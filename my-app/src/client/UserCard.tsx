"use client";

import { useState } from "react";
import SingleUserCard from "./SingleUserCard";
import { AppProps } from "../types/Models";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { useGetAllPostsQuery } from "@/redux/InstaApi";

function UserCard({ users }: AppProps) {
  const [following, setFollowing] = useState<string[]>([]);

  const handleFollow = (username: string) => {
    setFollowing([...following, username]);
  };

  return (
    <div className=" hidden lg:block w-fit px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Image
            src="https://avatars.githubusercontent.com/u/112757838?v=4"
            alt="profile"
            className="w-10 h-10 rounded-full"
            width={40}
            height={20}
          />

          <h1 className="text-2xl font-bold">father_of_jesus08</h1>
        </div>
        <Button variant="ghost" className="text-blue-500">
          Switch
        </Button>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Suggested for you</h2>
        {users.map((user) => (
          <SingleUserCard
            key={user.username}
            username={user.username}
            profileImage={user.profileImage}
            onFollow={handleFollow}
          />
        ))}
      </div>
      <div className="text-center">
        <p className="text-gray-500">
          About · Help · Press · API · Jobs · Privacy · Terms ·
        </p>
        <p className="text-gray-500">Locations · Language · Meta Verified</p>
        <p className="text-gray-500">© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}

export default UserCard;
