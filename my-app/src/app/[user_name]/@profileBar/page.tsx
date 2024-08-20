"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileBar = ({ params }: { params: { user_name: string } }) => {
  const user_name = params.user_name;
  const pathNames = usePathname();
  const paths = [
    {
      href: `/${user_name}` ,
      name: "posts",
    },
    {
      href: `/${user_name}/feeds`,
      name: "feeds",
    },
    {
      href: `/${user_name}/reels`,
      name: "reels",
    },
    {
      href: `/${user_name}/saved`,
      name: "saved",
    },
  ];

  return (
    <div className="my-16">
      {/* first two divs for reels part and profile*/}
      <div className="mx-auto w-[650px] p-2 flex space-x-14 border border-red-500">
        <Image
          src={"https://avatars.githubusercontent.com/u/112757838?v=4"}
          alt=""
          width={200}
          height={100}
          className="rounded-full"
        />
        <div className=" flex flex-col space-y-6">
          <div className="flex space-x-6 items-center">
            <h2>gagan_palai45</h2>
            <Button variant="secondary">Edit Profile</Button>
            <Button variant="secondary">View Archive</Button>
          </div>
          <div className="flex space-x-6 items-center">
            <p>posts</p>
            <p>followers</p>
            <p>following</p>
          </div>
          <div className="">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              officiis aut iure sunt blanditiis voluptas vel magnam distinctio
              numquam animi!
            </p>
          </div>
        </div>
      </div>
      <div className="my-2 border-t border-gray-700">
        {paths.map((item: any, index: number) => {
          const activeLink =
            pathNames === item.href || pathNames === `${item.href}/`;
        
          return (
            <Link
              href={item.href}
              key={index}
              className={`my-2 mx-4 ${
                activeLink ? "border-2 border-white" : ""
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileBar;
