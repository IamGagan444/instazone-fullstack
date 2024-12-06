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
import {
  useChangeUserInfoMutation,
  useGetUserByIdQuery,
} from "@/redux/InstaApi";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim),
  bio: z.string(),
  fullName: z.string().min(2, "Fullname must be at least 2 characters"),
});

import { useEffect } from "react";
import ChangeProfile from "./ChangeProfile";

const EditProfile = ({ session }: any) => {
  const githubprofile = session?.user?.githubProfile;

  // Fetch user data
  const { isLoading: loading, data } = useGetUserByIdQuery(
    githubprofile?.login,
    {
      skip: !githubprofile?.login,
    }
  );

  const profile = data?.data[0];

  // Initialize the form with react-hook-form and zodResolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
      fullName: "",
    },
  });

  const [changeUser, { isLoading, isError }] = useChangeUserInfoMutation();

  // Update form values when profile data is available
  useEffect(() => {
    if (profile) {
      form.reset({
        username: profile?.user_name || "",
        bio: profile?.bio || "",
        fullName: profile?.fullName || "",
      });
    }
  }, [profile, form]);

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await changeUser({
        ...values,
        userId: githubprofile?.login,
      });
      window.location.href = `/${profile?.user_name}`;
    } catch (error) {
      console.log(error, "error at edit profile");
    }
  }

  return (
    <div>
      <ChangeProfile profile={profile} />

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

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isDirty || isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
