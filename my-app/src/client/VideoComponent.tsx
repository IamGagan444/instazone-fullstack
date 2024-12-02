"use client";
import React, { useEffect, useRef } from "react";

interface VideoComponentProps {
  src: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 } 
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      width="320"
      height="240"
      controls
      autoPlay
      loop
      muted // Consider muting for autoplay
      className="w-full h-[470px] object-cover rounded-t-none"
    >
      <source src={src} type="video/mp4" />
      <track src={src} kind="subtitles" srcLang="en" label="English" />
    </video>
  );
};

export default VideoComponent;
