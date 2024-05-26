import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import Event from "components/Event";

const Home: NextPage = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Run this effect once on mount
    const handleResize = () => {
      // Consider "mobile" if width is less than or equal to 768 pixels
      setIsMobile(window.innerWidth <= 768);
    };
    // Check once on mount
    handleResize();
    // Optionally listen for resize events if you want to dynamically change the view
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow justify-center mt-8 mx-20">
        {!isMobile ? (
          <Event />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span>Unavailable on mobile</span>
          </div>
        )}
      </div>
      <Toaster />
      <ToasterSonner position="bottom-right" />
    </div>
  );
};

export default Home;
