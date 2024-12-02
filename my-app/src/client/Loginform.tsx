"use client";
import React from "react";
import Cookie from "js-cookie";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/InstaApi";
// import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
const Loginform = () => {
  
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password }).unwrap();
      console.log(data.data);
      Cookie.set("accessToken", data?.data?.accessToken,{ expires: 1 });
      //set the data in cookies
      router.push("/");
      console.log("User logged in successfully!");
    } catch (err) {
      console.error("Failed to log in user: ", err);
    }
  };

  return (
    <form action={""} onSubmit={(e) => handleSubmit(e)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
      </div>
      <Button className="bg-blue-500 w-full mt-4 text-white" type="submit">
        Login
      </Button>
    </form>
  );
};

export default Loginform;
