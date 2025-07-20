import Hero from "@/components/Hero/Hero";

import ExploreMenu from "@/components/Home/HomePage/ExploreMenu/ExploreMenu";

import FoodDisplay from "@/components/Home/HomePage/FoodDisplay/FoodDisplay";

import WhatsApp from "@/components/Whatsapp/WhatsApp";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`w-[90%] mx-auto ${inter.className}`}>
      <WhatsApp />
      <Hero />

      <ExploreMenu />
      <FoodDisplay />
    </div>
  );
}
