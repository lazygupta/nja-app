"use client";

import { useEffect, useState } from "react";
import { Briefcase, IdCard, Layers, Coffee } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { label: "EVENTS", value: 15, icon: <Briefcase size={28} /> },
    { label: "MEMBER", value: 20, icon: <IdCard size={28} /> },
    { label: "PROGRAMME", value: 30, icon: <Layers size={28} /> },
    { label: "MEETING", value: 20, icon: <Coffee size={28} /> },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) =>
      setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.value) newCounts[index] += 1;
          return newCounts;
        });
      }, 18)
    );

    return () => intervals.forEach((i) => clearInterval(i));
  }, []);

  return (
    <section
      className="
        w-full py-20 text-center
        bg-linear-to-b from-[#e6e6e6] to-[#cfcfcf]
        dark:bg-linear-to-b dark:from-[#111] dark:to-[#1b1b1b]
        transition-all duration-500
      "
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="mb-14 text-3xl font-extrabold tracking-wide text-black dark:text-white">
          OUR STATS
        </h2>

        <div className="grid max-w-6xl mx-auto grid-cols-1 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                relative rounded-2xl p-8 text-center shadow-lg
                border border-gray-300/40 dark:border-white/10
                bg-white/40 dark:bg-white/5 backdrop-blur-xl
                transition-all duration-300 
                hover:shadow-2xl hover:scale-[1.03]
                hover:border-gray-400/60 dark:hover:border-white/20
              "
            >
              {/* Soft gradient frame */}
              <div
                className="
                  absolute inset-0 -z-10 rounded-2xl 
                  bg-linear-to-br from-white/30 to-transparent
                  dark:from-white/10 dark:to-transparent
                "
              />

              {/* Icon */}
              <div className="mb-4 flex justify-center text-gray-700 dark:text-gray-300">
                {stat.icon}
              </div>

              {/* Counter */}
              <div className="text-5xl font-extrabold text-gray-900 dark:text-white">
                {counts[index]}
              </div>

              <div className="mt-2 text-sm tracking-wide text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
