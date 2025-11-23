import Carousel from "@/components/carousel";
import { Hero } from "@/components/hero";
import { LatestFacebookPostsSection } from "@/components/latest-facebook-posts";
import StatsSection from "@/components/stats-section";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Hero />
      <LatestFacebookPostsSection />
      <div className="py-10">
        <Carousel />
      </div>

      <StatsSection />
    </>
  );
}
