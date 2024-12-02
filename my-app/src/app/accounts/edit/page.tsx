import EditProfile from '@/client/EditProfile'
import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import Link from "next/link";
import { Settings } from 'lucide-react';

 const page = () => {
  return (
    <div className="h-screen flex justify-center items-center">
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className=" flex items-center justify-center">Settings <Settings className='size-3 mx-2 '/></CardTitle>
        </CardHeader>
        <CardContent>
         <EditProfile/>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
          <p>OR</p>
          <div className="border border-zinc-400 dark:border-zinc-700 w-[40%]"></div>
        </CardFooter>
        <CardFooter className="flex-col gap-2 w-full">
         
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
  )
}
export default page