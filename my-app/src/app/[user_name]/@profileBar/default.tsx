"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetUserByIdQuery } from "@/redux/InstaApi";
import { Bookmark, Clapperboard, Grid3x3, SquareUserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import Post from "@/client/Post";
const ProfileBar = ({ params }: { params: { user_name: string } }) => {
  const { isLoggedIn } = useAuth();

  console.log("islogged in", Cookies.get());
  const user_name = params.user_name;
  const pathNames = usePathname();
console.log("pathNames",pathNames,user_name)

  const { isLoading, data } = useGetUserByIdQuery(user_name, {
    skip: !user_name,
  });
  const profile = data?.data[0];


  const paths = [
    {
      href: `/${user_name}`,
      name: "posts",
      icon: <Grid3x3 className="size-5 mx-2 " />,
    },

    {
      href:profile?.post?.length>0? `/${user_name}/reels`:"",
      name: profile?.post?.length>0?"reels":"",
      icon: profile?.post?.length>0?<Clapperboard className="size-5 mx-2" />:"",
    },
    {
      href: `/${user_name}/saved`,
      name: "saved",
      icon: <Bookmark className="size-5 mx-2" />,
    },
    {
      href: `/${user_name}/tagged`,
      name: "Tagged",
      icon: <SquareUserRound className="size-5 mx-2" />,
    },
  ];
  console.log(pathNames===`/${profile?.user_name}`)

if(isLoading) return "Loading..."

  return (
    <div className=" mx-auto w-fit my-16">
      {/* first two divs for reels part and profile*/}
      <div className="mx-auto w-[650px] p-2 flex space-x-14 ">
        <Image
          src={"https://avatars.githubusercontent.com/u/112757838?v=4"}
          alt=""
          width={200}
          height={100}
          className="rounded-full"
        />
        <div className=" flex flex-col space-y-6">
          <div className="flex space-x-6 items-center">
            <h2>{profile?.user_name || "no_user_xx"}</h2>
            <Button variant="secondary">Edit Profile</Button>
            <Button variant="secondary">View Archive</Button>
          </div>
          <div className="flex space-x-6 items-center">
            <div>
              <p>
                <span className="font-semibold">{profile?.totalPosts} </span>
                posts
              </p>
            </div>
            <p>{profile?.totalFollowers.length} followers</p>
            <p>{profile?.totalFollowing.length} following</p>
          </div>
          <div className="">
            <p className="text-sm"></p>
          </div>
        </div>
      </div>
      <div className="my-2 border-t border-gray-700 flex justify-center">
        {paths.map((item: any, index: number) => {
          const activeLink =
            pathNames === item.href || pathNames === `${item.href}/`;

          return (
            <Link
              href={item.href}
              key={index}
              className={`py-2 mx-4 uppercase  text-sm font-semibold flex  ${
                activeLink
                  ? "border-t border-white text-white"
                  : "text-gray-400"
              }`}
            >
              {item.name} {item.icon}
            </Link>
          );
        })}
      </div>
      {(profile?.posts?.length) ? (
        <Post posts={profile?.posts} />
      ) : (
        <p className="text-center capitalize font-semibold my-20">
       { pathNames===`/${profile?.user_name}` ? "You have't posted anything":""}
        </p>
      )}
    </div>
  );
};

export default ProfileBar;
