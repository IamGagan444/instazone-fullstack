import EditProfile from "@/client/EditProfile";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Settings } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChangeProfile from "@/client/ChangeProfile";

const page = async() => {
  const session = await auth();
  // if (session?.user) {
  //   return redirect("/accounts/login");
  // }
  return (
    <div className="flex justify-center items-center">
      <div className="my-10">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className=" flex items-center justify-center">
              Settings <Settings className="size-3 mx-2 " />
            </CardTitle>
          </CardHeader>
          <CardContent>
            
            <EditProfile session={session}/>
          </CardContent>
        </Card>
        <Card className="w-[350px] my-2 p-4">
          <p className="text-center">
            Don&#39;t have an account?{" "}
            <Link href="/accounts/signup" className="text-sky-500">
              Signup
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};
export default page;
