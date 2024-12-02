import * as React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { githubLogin } from "@/action/auth";

import Loginform from "@/client/Loginform";
import { cookies } from "next/headers";



const Login = async () => {
  const session = await auth();
  if (session?.user) redirect("/");

  // https://instagram-nrdh.onrender.com/api/user-login

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Instagram</CardTitle>
          </CardHeader>
          <CardContent>
           <Loginform/>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
            <p>OR</p>
            <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
          </CardFooter>
          <CardFooter className="flex-col gap-2 w-full">
            <form action={githubLogin} className="w-full">
              <Button variant="outline" className="bg-white w-full text-black ">
                Login with <Github strokeWidth={1} className="mx-2" />
              </Button>
            </form>
            <Link href="/accounts/forgot-password">Forgot password</Link>
          </CardFooter>
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

export default Login;
