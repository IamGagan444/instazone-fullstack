// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "./ReduxProvider";
import Sidebar from "@/client/Sidebar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instazon",
  description: "Developed by Gagan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className=" " >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          
            <div className="">
            <Sidebar/>
            </div>
           <SessionProvider>

           <div className="ml-[60px]">
            {children}
            </div>
           </SessionProvider>
            
            
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
