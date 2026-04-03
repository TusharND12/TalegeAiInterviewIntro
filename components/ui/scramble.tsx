"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "$%#@!*&^~+-_/\\{}[]0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function ScrambleText({ text, className = "", duration = 500 }: { text: string; className?: string; duration?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    let iteration = 0;
    const steps = Math.max(text.length, 10);
    const stepDuration = duration / steps;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            // Preserve spaces
            if (text[index] === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2; // Speed of deciphering
    }, stepDuration);
  };

  useEffect(() => {
    if (isHovered) {
      startScramble();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(text); // Reset back immediately or gradually? Let's reset immediately on leave
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text]);

  return (
    <span 
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
