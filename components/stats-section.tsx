"use client";

import { useEffect, useState } from "react";
import { Briefcase, IdCard, Layers, Coffee } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { label: "PORTAL MEMBER", value: 121, icon: <Briefcase size={28} /> },
    { label: "MEMBER", value: 229, icon: <IdCard size={28} /> },
    { label: "PROGRAMME", value: 1, icon: <Layers size={28} /> },
    { label: "MEETING", value: 30, icon: <Coffee size={28} /> },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) =>
      setInterval(() => {
        setCounts(prev => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.value) newCounts[index] += 1;
          return newCounts;
        });
      }, 20)
    );

    return () => intervals.forEach(i => clearInterval(i));
  }, []);

  return (
    <section
  className="
    w-full 
    py-16 
    text-center 
    transition-all duration-500
    bg-linear-to-r from-[#d5d5d5] via-[#bdbdbd] to-[#d5d5d5]
    dark:bg-linear-to-r dark:from-[#1a1a1a] dark:via-[#282828] dark:to-[#1a1a1a]
  "
>
  {/* NEW WRAPPER ADDED HERE */}
  <div className="max-w-7xl mx-auto px-4">

    <h2 className="mb-12 text-3xl font-bold tracking-wide text-black dark:text-white">
      OUR STATS
    </h2>

    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-4">
      
      {stats.map((stat, index) => (
        <div
          key={index}
          className="
            relative rounded-xl border-2 
            border-blue-400 dark:border-blue-500 
            p-8 text-center shadow-xl

            backdrop-blur-md bg-white/20 dark:bg-black/20
            transition-all duration-500
          "
        >
          {/* Glow Border */}
          <div
            className="
              absolute inset-0 -z-10 rounded-xl 
              bg-blue-500/20 dark:bg-blue-400/20 
              blur-xl
            "
          ></div>

          <div className="mb-4 flex justify-center text-blue-600 dark:text-blue-400">
            {stat.icon}
          </div>

          <div className="text-5xl font-bold text-black dark:text-white">
            {counts[index]}
          </div>

          <div className="mt-2 text-sm tracking-wide text-black/70 dark:text-white/70">
            {stat.label}
          </div>
        </div>
      ))}

    </div>
  </div>
  {/* WRAPPER ENDS */}
</section>

  );
}
