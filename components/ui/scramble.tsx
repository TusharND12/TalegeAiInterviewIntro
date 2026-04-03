"use client";

import React, { useState, useEffect, useRef } from "react";

const CHARS = "$%#@!*&^~+-_/\\{}[]0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function ScrambleText({ 
  text, 
  className = "", 
  duration = 500,
  hoverOnly = true 
}: { 
  text: string; 
  className?: string; 
  duration?: number;
  hoverOnly?: boolean;
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = React.useCallback(() => {
    let iteration = 0;
    const steps = Math.max(text.length, 10);
    const stepDuration = duration / steps;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (text[index] === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2;
    }, stepDuration);
  }, [text, duration]);

  useEffect(() => {
    if (!hoverOnly) {
      startScramble();
    }
  }, [hoverOnly, startScramble]);

  useEffect(() => {
    if (hoverOnly) {
      if (isHovered) {
        startScramble();
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text, hoverOnly, startScramble]);

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
