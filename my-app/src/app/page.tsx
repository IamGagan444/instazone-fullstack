"use client"
import { User } from "@/components/Models";
import ModeToggle from "@/components/Modetoggle";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import StoryCarousel from "@/components/StoryCaoursel";
import UserCard from "@/components/UserCard";

import Image from "next/image";

export default function Home() {
  const users: User[] = [
    {
      username: "swagatikasomanath.03.20",
      profileImage:
        "http://res.cloudinary.com/gaganbro/image/upload/v1720003374/juffxcl29wdd7xdcqagk.jpg",
    },
    {
      username: "rintusahu_0_45_",
      profileImage:
        "http://res.cloudinary.com/gaganbro/image/upload/v1720003374/juffxcl29wdd7xdcqagk.jpg",
    },
    {
      username: "cute_jyoti_238",
      profileImage:
        "http://res.cloudinary.com/gaganbro/image/upload/v1720003374/juffxcl29wdd7xdcqagk.jpg",
    },
    {
      username: "madhusmita14321",
      profileImage:
        "http://res.cloudinary.com/gaganbro/image/upload/v1720003374/juffxcl29wdd7xdcqagk.jpg",
    },
    {
      username: "siddhiiii_187",
      profileImage:
        "http://res.cloudinary.com/gaganbro/image/upload/v1720003374/juffxcl29wdd7xdcqagk.jpg",
    },
  ];

  return (
    
    <div className="flex justify-between">
      <Sidebar />
      <div className=" my-2 w-fit lg:ml-[140px] block mx-auto  ">
        <StoryCarousel />
        <Post />
      </div>
      <UserCard users={users} />
    </div>
  );
}
