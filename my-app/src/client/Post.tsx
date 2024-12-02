import Image from "next/image";
import React from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useGetAllPostsQuery } from "@/redux/InstaApi";
import { CircleUser } from "lucide-react";
import VideoComponent from "./VideoComponent";

const Post = ({posts}:{posts:any}) => {


  return (
    <div className="space-y-8 mt-14">
      {posts?.data?.map((val: any, ind: number) => (
        <Card
          key={ind}
          className="rounded-lg shadow-sm  max-w-[470px] mx-auto"
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {val?.owner.avatar ? (
                <Image
                  src={val?.owner?.avatar}
                  width={40}
                  height={40}
                  alt="Profile Picture"
                  className="rounded-full"
                />
              ) : (
                <CircleUser className="w-10 h-10 text-gray-400" />
              )}

              <div className="text-sm">
                <p className="font-semibold">{val.owner.user_name}</p>
                <p className="text-slate-500 text-xs">1 day ago</p>
              </div>
            </div>
            <Button variant="ghost" className="text-blue-500">
              Follow
            </Button>
          </div>

          <div className="relative">
            {val.contentType === "image" ? (
              <Image
                src={val.contentUrl}
                alt="Post Content"
                className="w-full h-[470px] object-cover rounded-t-none"
                layout="responsive"
                width={470}
                height={470}
              />
            ) : (
              <VideoComponent src={val.contentUrl} />
            )}
          </div>

          <div className="p-4">
            <div className="flex space-x-4">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.25l8.84-8.84a5.5 5.5 0 000-7.78v0z"
                  />
                </svg>
              </button>
              <button>
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
              <button>
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
                    d="M21.75 11.25h-19.5m19.5 0l-8.25-8.25m8.25 8.25l-8.25 8.25"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-4 text-sm">
              <span className="font-semibold">{val.owner.user_name}</span>{" "}
              {val.caption}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Post;
