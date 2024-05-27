import type { NextPage } from "next";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import Event from "components/Event";

const Home: NextPage = () => {
  

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow justify-center mt-8">
        <Event />
      </div>
      <Toaster />
      <ToasterSonner position="bottom-right" />
    </div>
  );
};

export default Home;
