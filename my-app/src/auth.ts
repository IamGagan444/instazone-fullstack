import NextAuth, { AuthError } from "next-auth";
import github from "next-auth/providers/github";
import { User } from "./model/user";
import { connectDatabase } from "./lib/utils";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECREAT,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      console.log(user, account);
      if (account?.provider === "github" && account.access_token) {
        await connectDatabase();
        try {
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create a new user if they don't exist
            existingUser = await User.create({
              user_name: user.name,
              email: user.email,
              githubId: account.id,
            });
            return true;
          } else {
            // Update user information if necessary
            existingUser.githubId = account.id?.toString();

            await existingUser.save();
            return true;
          }
          return true;
        } catch (error) {
          console.log(error);
          throw new AuthError("Something went wrong");
        }
      }

      return false;
    },
  },
});
