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
import Link from "next/link";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = async () => {
  const session = await auth();
  // if (!session?.user) redirect("/login")

  const githubProfile = session?.user?.githubProfile;

  // if (!githubProfile) {
  //   return <div>GitHub profile information not available</div>
  // }

  const sideData = [
    {
      name: "Home",
      icon: <House />,
      href: "/",
    },
    {
      name: "Search",
      icon: <Search />,
      href: "/search",
    },
    {
      name: "Reels",
      icon: <Clapperboard />,
      href: "/reels",
    },
    {
      name: "Messages",
      icon: <MessageCircleHeart strokeWidth={1.25} />,
      href: "/messages",
    },
    {
      name: "Notifications",
      icon: <Heart strokeWidth={1.75} />,
      href: "/notifications",
    },
    {
      name: "Create",
      icon: <SquarePlus strokeWidth={1.5} />,
      href: "/create",
    },
    {
      name: "Profile",
      icon: (
        <Avatar className="size-8">
          <AvatarImage src={githubProfile?.avatar_url} alt={githubProfile?.name}  />
          <AvatarFallback>{githubProfile?.name[0]}</AvatarFallback>
        </Avatar>
      ),
      href: `/${githubProfile?.login}`,
    },
    {
      name: "More",
      icon: <AlignJustify strokeWidth={1.5} />,
      href: "/more",
    },
  ];

  if (!session?.user) return "";

  return (
    <div className="p-4 border border-zinc-500 w-[60px] h-screen fixed top-0 left-0 bg-foreground dark:bg-background">
      <div className="">
        <Link href={"/"}>
          <Instagram className="my-10" />
        </Link>
        <div className="gap-7  flex flex-col justify-between">
          {sideData?.map((item) => {
            return (
              <>
                <Link href={item.href}>{item.icon} </Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
