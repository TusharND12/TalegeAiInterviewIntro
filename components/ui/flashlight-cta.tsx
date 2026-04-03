"use client";
import { useRef, useState, useEffect } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";

function FontCycler({ text }: { text: string }) {
  const [index, setIndex] = useState(0);
  const fonts = [
    "font-sans font-black tracking-tighter",
    "font-serif italic font-light tracking-normal",
    "font-mono font-medium tracking-tight",
    "font-sans font-thin tracking-widest uppercase",
    "font-serif font-black tracking-tighter uppercase",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % fonts.length);
    }, 150);
    return () => clearInterval(timer);
  }, [fonts.length]);

  return (
    <span className="inline-grid items-baseline text-left">
      {fonts.map((font, i) => (
        <span 
          key={i} 
          className={`${font} col-start-1 row-start-1 transition-opacity duration-75 ${i === index ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        >
          {text}
        </span>
      ))}
    </span>
  );
}

export function FlashlightCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  const updatePosition = (x: number, y: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: x - rect.left, y: y - rect.top });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const handleMouseLeave = () => {
    setPosition({ x: -1000, y: -1000 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden flex flex-col items-center justify-center md:cursor-none"
    >
      {/* Background Texture faint */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Spotlight Reveal Mask Layer */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: position.x === -1000 
            ? 'radial-gradient(400px circle at center, transparent 0%, rgba(0,0,0,0.95) 100%)' 
            : `radial-gradient(500px circle at ${position.x}px ${position.y}px, transparent 0%, rgba(0,0,0,0.98) 100%)`,
        }}
      />

      <div className="z-20 text-center flex flex-col items-center justify-center p-8 pointer-events-auto">
        <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter mb-8 uppercase leading-none">
          Ready <br/> To <FontCycler text="Execute?" />
        </h2>
        
        <div className="mt-8 z-30">
          <Magnetic>
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-white text-black hover:bg-slate-200 transition-all shadow-[0_0_60px_rgba(255,255,255,0.6)] font-bold">
               Stay Tuned
            </Button>
          </Magnetic>
        </div>
      </div>

      {/* Subtle hint text visible in darkness so they know to hover */}
      <p className="absolute bottom-10 opacity-30 text-white font-mono uppercase tracking-widest text-sm z-0">
         Illuminate core logic
      </p>
    </section>
  );
}
