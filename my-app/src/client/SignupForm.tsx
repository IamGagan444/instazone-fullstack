"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostNewUserMutation } from "@/redux/InstaApi";
import { useRouter } from "next/navigation";

interface NewUser {
    email: string;
    password: string;
    user_name: string;
  }
const SignupForm = () => {

    const router= useRouter()
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
        router.push("/")
        console.log("User logged in successfully!");
      } catch (err) {
        console.error("Failed to log in user: ", err);
      }
    };

  return (
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
  )
}

export default SignupForm
