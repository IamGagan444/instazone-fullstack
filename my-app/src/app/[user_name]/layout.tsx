import React from "react";

export default function ProfileLayout({
  children,
  profileBar,
}: {
  children: React.ReactNode;
  profileBar: React.ReactNode;
}) {
  return (
    <div>
      {profileBar}
      {children} 
      
    </div>
  );
}
