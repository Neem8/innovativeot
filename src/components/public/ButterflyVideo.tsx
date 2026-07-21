'use client';

import React, { useRef, useEffect } from 'react';

interface ButterflyVideoProps {
  className?: string;
  overlayOpacity?: string;
}

export const ButterflyVideo: React.FC<ButterflyVideoProps> = ({ 
  className = "w-full h-full",
  overlayOpacity = "bg-[#0F3854]/35"
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* HTML5 Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-105"
      >
        <source src="/videos/file.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-monarch-butterfly-on-a-flower-42861-large.mp4" type="video/mp4" />
      </video>

      {/* Light Overlay to preserve text contrast while keeping video visible */}
      <div className={`absolute inset-0 ${overlayOpacity} pointer-events-none`} />
    </div>
  );
};
