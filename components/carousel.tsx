"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {
  const images = [
    "/img1.jpeg",
    "/img4.jpg",
    "/img3.jpg",
    "/img5.jpg",
    "/img6.jpg",
    "/img7.jpg",
    "/img9.jpg",
    "/img10.jpg",
    "/img11.jpg",
    "/img12.jpg",
    "/img13.jpg",
    "/img14.jpg",
    "/img15.jpg",
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const nextSlide = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  // Autoplay every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative mx-auto w-full max-w-4xl select-none overflow-hidden rounded-xl shadow-xl">
      
      {/* Image */}
      <div className="relative h-80 w-full md:h-[520px]">
        <Image
          src={images[index]}
          alt="Carousel Image"
          fill
          className="object-cover"
        />
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 flex w-full justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 cursor-pointer rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
