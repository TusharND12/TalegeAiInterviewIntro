"use client";
import { useRef, useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";

export function FlashlightCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    // Hide spotlight when mouse leaves
    setPosition({ x: -1000, y: -1000 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden flex flex-col items-center justify-center cursor-none"
    >
      {/* Background Texture visible constantly (faint) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Spotlight Reveal Mask Layer */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, transparent 0%, rgba(0,0,0,0.98) 100%)`,
        }}
      />

      <div className="z-20 text-center flex flex-col items-center justify-center p-8 pointer-events-auto">
        <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter mb-8 uppercase leading-none">
          Ready <br/> To Execute?
        </h2>
        
        {/* Subtle hint text visible in darkness so they know to hover */}
        <p className="fixed bottom-10 opacity-30 text-white font-mono uppercase tracking-widest text-sm z-0">
           Illuminate core logic
        </p>

        <div className="mt-8 z-30">
          <Magnetic>
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-white text-black hover:bg-slate-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.6)] font-bold">
              Stay Tuned
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
