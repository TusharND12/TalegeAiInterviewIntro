"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Prevent scrolling and force top while booting
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const bootLogs = [
      "INIT_SYSTEM(0x00)",
      "CALIBRATING NEURAL WEIGHTS: 12%",
      "CALIBRATING NEURAL WEIGHTS: 47%",
      "CALIBRATING NEURAL WEIGHTS: 89%",
      "CALIBRATING NEURAL WEIGHTS: 100%",
      "LOADING [TALENT_INTELLIGENCE_CORE]...",
      "ESTABLISHING SECURE HANDSHAKE",
      "PARSING ALGORITHMIC INTERFACE",
      "SYSTEM_READY. EXECUTE_FLASH()"
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLines(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            document.body.style.overflow = "auto";
            onComplete();
          }, 800); // Wait for flash out
        }, 500);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "brightness(5) blur(10px)", transition: { duration: 0.8, ease: "easeIn" } }}
          className="fixed inset-0 z-[99999] bg-black text-white p-8 flex flex-col justify-end pointer-events-auto"
        >
          <div className="font-mono text-sm md:text-xl font-bold uppercase tracking-widest leading-loose">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2"
              >
                <span className="text-slate-500 mr-4">{`>`}</span>
                {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="mt-4 w-4 h-6 bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
