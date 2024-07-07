"use client"
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { usePostNewUserMutation } from "@/redux/InstaApi";

const Login = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [postNewUser] = usePostNewUserMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await postNewUser({ email, password }).unwrap();
      console.log('Login successful:', result);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
            <p>OR</p>
            <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
          </CardFooter>
          <CardFooter className="flex-col gap-2">
            <Button variant="outline" className="bg-white w-full text-blue-700">
              Login with <Facebook strokeWidth={1} />
            </Button>
            <Link href="/accounts/forgot-password">Forgot password</Link>
          </CardFooter>
        </Card>
        <Card className="w-[350px] my-2 p-4">
          <p className="text-center">
            Don&#39;t have an account? <Link href="/accounts/signup" className="text-sky-500">Signup</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
