import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const Post = () => {
  return (
    <div>
        <p className=" my-4">Suggested posts</p>
      <div className="flex space-x-2 items-center">
        <Image
          src="https://avatars.githubusercontent.com/u/112757838?v=4"
          width={40}
          height={40}
          alt="Picture of the author"
          className="rounded-full aspect-square"
        />
        <div className=" text-sm">
        <p>Sam curron</p>
        <p className="text-slate-500">1day</p>
        </div>
        <Button variant="ghost" className="text-blue-500">Follow</Button>
      </div>
    <Card className="my-4">
    <Image
          src="https://avatars.githubusercontent.com/u/112757838?v=4"
          width={400}
          height={400}
          alt="Picture of the author"
          className="aspect-auto mx-auto"
        />
    </Card>
    </div>
  );
};

export default Post;
