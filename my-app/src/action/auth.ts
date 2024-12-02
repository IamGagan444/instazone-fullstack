"use server"
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
export const githubLogin=async()=>{
    await signIn("github");
    redirect("/");
}