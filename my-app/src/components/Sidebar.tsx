import React from "react";
import {
  Instagram,
  House,
  Search,
  Clapperboard,
  MessageCircleHeart,
  Heart,
  SquarePlus,
  CircleUser,
  AlignJustify,
} from "lucide-react";

const Sidebar = () => {
  return (
   <div className="p-4 border border-zinc-500 w-fit h-screen">
     <Instagram  className="my-10"/>
    <div className="gap-7  flex flex-col justify-between">
 
      <House />
      <Search />
      <Clapperboard />
      <MessageCircleHeart strokeWidth={1.25} />
      <Heart strokeWidth={1.75} />
      <SquarePlus strokeWidth={1.5} />
      <CircleUser strokeWidth={1.5} />
      <AlignJustify strokeWidth={1.5} />
    </div>
   </div>
  );
};

export default Sidebar;
