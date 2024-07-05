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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const Login = () => {
  return (
    <div className=" h-screen flex justify-center items-center ">
     <div>
     <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className=" text-center">Instagram</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">password</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
            </div>
            <Button className="bg-blue-500 w-full mt-4 text-white">
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
          <Button variant="outline" className=" bg-white w-full text-blue-700">
            Login with <Facebook strokeWidth={1} />
          </Button>
          <Link href={"/accounts/forgot-password"}>forgot password</Link>
        </CardFooter>
       
      </Card>
      <Card className="w-[350px] my-2 p-4">
          <p className=" text-center">
            Don&#39;t have an account ? <Link href={"/accounts/signup"} className="text-sky-500">Signup</Link>
          </p>
        </Card>
     </div>
    </div>
  );
};

export default Login;
