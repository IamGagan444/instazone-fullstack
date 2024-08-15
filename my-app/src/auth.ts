import NextAuth, { AuthError } from "next-auth";
import github from "next-auth/providers/github";
import { User } from "./model/user";
import { connectDatabase } from "./lib/utils";
import { cookies } from "next/headers";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log(profile);
      if (account?.provider === "github" && account.access_token) {
        await connectDatabase();
        try {
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create a new user if they don't exist
            existingUser = await User.create({
              user_name: profile?.login,
              email: user.email,
              githubId: account.id,
            });
          } else {
            // Update user information if necessary
            existingUser.githubId = account.id?.toString();
            await existingUser.save();
          }
         

          const refreshToken = await existingUser.generateRefreshToken();
          const accessToken = await existingUser.generateAccessToken();
          console.log(refreshToken, accessToken);
          // Store tokens in cookies
          cookies().set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60, // 1 hour
          });
          cookies().set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
          });

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
