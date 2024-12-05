"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useChangeUserInfoMutation } from "@/redux/InstaApi";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim),
  bio: z.string(),
  fullName: z.string().min(2, "Fullname must be at leat 2 charectors"),

});

const EditProfile = ({ session }: any) => {
  
  const githubprofile = session?.user?.githubProfile;
//instead of githubprofile data use api data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: githubprofile?.login || "",
      bio: githubprofile,
      fullName: githubprofile?.name,
    
    },
  });
  const [changeUser,{isLoading,isError}]=useChangeUserInfoMutation()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const response= await changeUser({...values,userId:githubprofile?.login})
      console.log(response)
      
    } catch (error) {
      console.log(error,"error at edit profile")
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Bio" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
