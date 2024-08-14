"use client";
import * as React from "react";
import { Car, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { usePostNewUserMutation } from "@/redux/InstaApi";

interface NewUser {
  email: string;
  password: string;
  user_name: string;
}

const Signup = () => {
  const [credentials, setCredential] = React.useState<NewUser[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredential((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const [postNewUser, { isLoading, isSuccess, isError, error }] =
    usePostNewUserMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(credentials);
    try {
      await postNewUser(credentials)
      console.log("User logged in successfully!");
    } catch (err) {
      console.error("Failed to log in user: ", err);
    }
  };
  return (
    <div className=" h-screen flex justify-center items-center ">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className=" text-center">Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={""} onSubmit={(e) => handleSubmit(e)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="name"
                    placeholder="Email address"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">username</Label>
                  <Input
                    id="name"
                    placeholder="username"
                    name="user_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">password</Label>
                  <Input
                    id="name"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button
                className="bg-blue-500 w-full mt-4 text-white hover:text-black"
                type="submit"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
            <p>OR</p>
            <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
          </CardFooter>
          <CardFooter>
            <Button variant="outline" className="bg-white w-full text-blue-700">
              Login with <Facebook strokeWidth={1} />
            </Button>
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
