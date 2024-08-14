
import * as React from "react";
import { Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import SignupForm from "@/client/SignupForm";

const Signup = () => {
  return (
    <div className=" h-screen flex justify-center items-center ">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className=" text-center">Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
            <p>OR</p>
            <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
          </CardFooter>
          <CardFooter>
            <form
              action={async () => {
                "use server";
                await signIn("github",{redirectTo:"/"});
               
              }}
              className="w-full"
            >
              <Button
                variant="outline"
                className="bg-white w-full text-blue-700"
              >
                Login with <Facebook strokeWidth={1} />
              </Button>
            </form>
          </CardFooter>
        </Card>
        <Card className="w-[350px] my-2 p-4">
          <p className=" text-center">
            Don&#39;t have an account ?{" "}
            <Link href={"/accounts/login"} className="text-sky-500">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
