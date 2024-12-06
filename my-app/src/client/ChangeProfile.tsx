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
    
    if (file) {
      try {
        // Compress the image
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        // Create a preview of the compressed image
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string);
        };
        reader.readAsDataURL(compressedFile);

        // Prepare form data
        const formData = new FormData();
        formData.append('avatar', compressedFile, compressedFile.name);
        formData.append('userId', profile?.user_name || "");

        // Send the request
        const response = await changePic(formData).unwrap();
        console.log('Upload successful:', response);

        // You might want to update the profile avatar here if the API returns the new URL
        // setPreviewImage(response.newAvatarUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        // You might want to show an error message to the user here
      }
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

