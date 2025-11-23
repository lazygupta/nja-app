import Carousel from "@/components/carousel";
import { Hero } from "@/components/hero";
import StatsSection from "@/components/stats-section";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="py-10">
        <Carousel />
      </div>
      <StatsSection />
    </>
  );
}
