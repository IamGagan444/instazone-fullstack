"use client";
import StoryCarousel from "@/components/StoryCaoursel";
import { User } from "@/types/Models";
import React from "react";
import Post from "./Post";
import UserCard from "./UserCard";
import { useGetAllPostsQuery } from "@/redux/InstaApi";
import { redirect } from "next/navigation";



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

const HomePage = () => {


  const {
    data: posts,
    error,
    isLoading,
  } = useGetAllPostsQuery({
    skip: 0,
    limit: 10,
  });
  console.log("posts", posts);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return redirect("/accounts/login");
  }
  return (
    <div className="flex justify-between">
      <div className=" my-2 w-fit lg:ml-[140px] block mx-auto  ">
        <StoryCarousel />
        <Post posts={posts} />
      </div>
      <UserCard users={users} />
    </div>
  );
};

export default HomePage;
