"use client";

import { useChangeProfilePicMutation } from "@/redux/InstaApi";
import Image from "next/image";
import React, { useState, useRef } from "react";
import imageCompression from "browser-image-compression";

interface Profile {
  avatar?: string;
  user_name: string;
}

interface ChangeProfileProps {
  profile?: Profile;
}

const ChangeProfile: React.FC<ChangeProfileProps> = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const [changePic, { isLoading }] = useChangeProfilePicMutation();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("file selected:", file); // Log file to check if it exists
  
    if (file) {
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("userId", profile?.user_name || "");
  
        // Log FormData contents using entries()
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
  
        // You could also log the formData size or content more explicitly if needed
        console.log("FormData contents:");
        Array.from(formData.entries()).forEach(([key, value]) => {
          console.log(`${key}:`, value);
        });
  
        // Send the FormData to the API
        const response = await changePic(formData);  // Ensure API can handle FormData
        console.log('Upload successful:', response);
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    } else {
      console.log("No file selected");
    }
  };
  

  const avatarSrc = previewImage || profile?.avatar || "/placeholder.svg";

  return (
    <div
      className="relative w-[200px] h-[200px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Image
        src={avatarSrc}
        alt="Profile"
        width={200}
        height={200}
        className="rounded-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center transition-opacity duration-300">
          <span className="text-white text-lg font-semibold">
            {isLoading ? "Uploading..." : "Upload"}
          </span>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </div>
  );
};

export default ChangeProfile;

