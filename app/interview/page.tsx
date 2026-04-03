"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Mic, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Code2, 
  Play,
  Terminal,
  Activity,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrambleText } from "@/components/ui/scramble";

export default function InterviewInterface() {
  const [timeLeft, setTimeLeft] = useState(45 * 60); 
  const [warning, setWarning] = useState<string | null>(null);
  const [code, setCode] = useState("function reverseString(str) {\n  // Execute logic\n}");
  const [isCopyPaste, setIsCopyPaste] = useState(false);
  const [aiState, setAiState] = useState<"analyzing" | "listening" | "warning">("listening");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "INIT_PROTOCOL: AUDIO_SYNC_ESTABLISHED",
    "AWAITING_INPUT..."
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const aiTimer = setInterval(() => {
      const states: ("analyzing" | "listening" | "warning")[] = ["analyzing", "listening", "warning"];
      const next = states[Math.floor(Math.random() * 3)];
      setAiState(next);
      
      if (next === "analyzing") {
         setTerminalLogs(prev => [...prev.slice(-4), `PARSING_AST_NODES: ${Math.random().toString(36).substring(7).toUpperCase()}`]);
      } else if (next === "warning") {
         setTerminalLogs(prev => [...prev.slice(-4), "WARN: EYE_TRACKING_LOST_120ms"]);
      }
    }, 4000);
    return () => clearInterval(aiTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setWarning("UNAUTHORIZED BUFFER ACCESS DETECTED");
    setIsCopyPaste(true);
    setTerminalLogs(prev => [...prev.slice(-4), "CRITICAL: CLIPBOARD_VIOLATION"]);
    setTimeout(() => {
      setWarning(null);
      setIsCopyPaste(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-mono select-none text-white overflow-hidden">
      
      {/* HUD HEADER */}
      <header className="h-14 border-b border-white/10 bg-black flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
            <h1 className="font-bold text-sm tracking-widest uppercase"><ScrambleText text="SYSTEM_TEST: DEV_MATRIX" hoverOnly={false} /></h1>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-white/60 font-bold bg-white/5 px-4 py-1 rounded-none border border-white/10">
            <Clock className="h-4 w-4" />
            <span className={timeLeft < 300 ? "text-red-500 animate-pulse" : ""}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Button variant="outline" className="rounded-none border-white/20 hover:bg-white hover:text-black transition-colors uppercase font-bold text-xs">Terminate</Button>
        </div>
      </header>

      {/* WARNING OVERLAY */}
      <AnimatePresence>
        {warning && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: "brightness(2) contrast(2)" }}
            animate={{ opacity: 1, scale: 1, filter: "brightness(1) contrast(1)" }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-red-950/40 backdrop-blur-sm pointer-events-none"
          >
            <div className="border border-red-500/50 bg-black p-8 flex flex-col items-center">
              <AlertTriangle className="h-16 w-16 text-red-500 mb-4 animate-ping" />
              <div className="text-3xl font-black text-white tracking-widest uppercase">
                <ScrambleText text={warning} hoverOnly={false} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-2 md:p-4 gap-4">
        
        {/* LEFT HUD: Question & Terminal */}
        <div className="w-full lg:w-1/3 flex flex-col lg:min-w-[400px] gap-4 h-1/2 lg:h-full">
          
          <div className="flex-1 border border-white/10 bg-black relative p-6 overflow-hidden group">
            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40"></div>

            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <h2 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]"><ScrambleText text="MODULE 01_ALGO" hoverOnly={true} /></h2>
              <span className="text-xs border border-white/20 px-2 py-0.5 bg-white/5 text-white/70">O(1) REQ</span>
            </div>
            
            <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter shadow-sm"><ScrambleText text="Reverse Core String" hoverOnly={true} /></h3>
            
            <div className="text-white/70 text-sm leading-relaxed space-y-4">
              <p>Invert the memory array pointer array `s`.</p>
              <p>Execution must occur strictly in-place utilizing maximum O(1) auxiliary space.</p>
              
              <div className="mt-8 bg-white/5 p-4 border border-white/10 font-mono text-xs text-white/50">
                <p className="text-white mb-2">RUN_CASE [01]:</p>
                <code>&gt; INPUT(s)  = ["h","e","l","l","o"]</code><br/>
                <code>&gt; EXPECT(s) = ["o","l","l","e","h"]</code>
              </div>
            </div>
          </div>

          {/* AI Feedback Terminal */}
          <div className="h-28 md:h-36 border border-white/10 bg-[#050505] p-3 flex flex-col relative overflow-hidden">
             <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white/50">
                  <Terminal className="h-3 w-3" /> AI_DIAGNOSTICS
                </div>
                <div className="flex gap-1 animate-pulse">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-1 bg-white/50 transition-all duration-75" style={{ height: aiState === 'listening' ? `${Math.random() * 12 + 4}px` : '2px' }} />
                   ))}
                </div>
             </div>
             <div className="flex-1 overflow-y-auto text-xs text-white/40 space-y-1">
               {terminalLogs.map((log, i) => (
                 <div key={i} className={log.includes("WARN") || log.includes("CRITICAL") ? "text-red-400" : ""}>
                   <span className="text-white/20 mr-2">{'>'}</span>{log}
                 </div>
               ))}
             </div>
          </div>

        </div>

        {/* RIGHT HUD: Coding & Camera */}
        <div className="flex-1 flex flex-col gap-4 relative h-1/2 lg:h-full">
          
          <div className="flex-1 border border-white/10 bg-[#0a0a0a] flex flex-col relative overflow-hidden group">
            {/* Top Bar Editor */}
            <div className="h-10 border-b border-white/10 bg-white/5 flex items-center justify-between px-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-white/50">
                <Code2 className="h-3 w-3" />
                <span>ROOT/ALGO/solution.js</span>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-xs bg-white text-black hover:bg-white/80 rounded-none font-bold uppercase transition-transform active:scale-95">
                <Play className="h-3 w-3 mr-1" /> Compile
              </Button>
            </div>
            
            <Textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onPaste={handlePaste}
              className={`flex-1 font-mono text-sm bg-transparent text-white/90 border-none p-6 resize-none focus-visible:ring-0 rounded-none ${isCopyPaste ? 'bg-red-950/20' : ''}`}
              spellCheck={false}
            />
          </div>

          {/* FACIAL REC / TARGETING CAMERA */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 w-32 md:w-64 aspect-video border border-white/20 bg-black shadow-2xl flex items-center justify-center overflow-hidden z-20">
             {/* Scanner Line */}
             <motion.div 
               animate={{ y: ["-100%", "200%"] }}
               transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
               className="absolute w-full h-1 bg-white/30 shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20"
             />
             
             {/* Targeting Crosshairs */}
             <div className="absolute inset-4 border border-white/10 z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 border-x border-white/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-3 border-y border-white/30" />
             </div>

             <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${aiState === 'warning' ? 'bg-red-500/20' : 'bg-transparent'}`} />

             <Activity className="h-12 w-12 text-white/5 opacity-50" />
             
             <div className="absolute bottom-2 left-2 flex gap-2 z-20">
               <div className="border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] uppercase font-bold text-white/70">REC</div>
               {aiState === 'analyzing' && <div className="border border-white/20 bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold">ANALYZING</div>}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
