"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "framer-motion";
import { ArrowRight, Brain, Target, LineChart, Star, Sparkles, Building2, Briefcase, GraduationCap, User } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { BootSequence } from "@/components/ui/boot-sequence";
import { NeuralGrid } from "@/components/ui/neural-grid";
import { FlashlightCTA } from "@/components/ui/flashlight-cta";
import { Button } from "@/components/ui/button";
import { ScrambleText } from "@/components/ui/scramble";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AICopilot } from "@/components/ai/AICopilot";
import Link from "next/link";

// -----------------------------------------------------------------------------
// Mouse Tracking Glow Card Component
// -----------------------------------------------------------------------------
function GlowCard({ children, className = "", style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // 3D Tilt Mechanics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    // Mouse relative to bounding box
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    setPosition({ x: localX, y: localY });

    // Normalized coordinates (-0.5 to 0.5) for tilt calculation
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized position
    const xPct = localX / width - 0.5;
    const yPct = localY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="relative">
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative overflow-hidden rounded-xl border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl ${className}`}
      >
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.06), transparent 40%)`,
            transform: "translateZ(1px)" // Keep glow flat on the tilted surface
          }}
        />
        <div style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Landing Page
// -----------------------------------------------------------------------------
export default function LandingPage() {
  const [booted, setBooted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewVelocity = useTransform(smoothVelocity, [-1, 1], ["20deg", "-20deg"]);
  
  const ghostTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);

  // Staggered text variants
  const words = "Measure, Predict & Improve Human Potential".split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      
      <div className={`flex min-h-screen flex-col bg-background text-foreground relative z-0 transition-opacity duration-1000 ${booted ? "opacity-100" : "opacity-0 invisible"}`}>
        <NeuralGrid />
        <div className="absolute inset-0 bg-grid-pattern -z-30 opacity-[0.1]" style={{ maskImage: 'linear-gradient(to bottom, white, transparent)' }} />
        <Navbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-28 border-b">
          <div className="container relative mx-auto px-4 text-center z-10 flex flex-col items-center">
            {/* GHOST TYPOGRAPHY BACKGROUND: CONTINUOUS SLIDING */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden opacity-10 pointer-events-none -z-10">
              <div 
                className="flex whitespace-nowrap animate-marquee"
                style={{ WebkitTextStroke: '2px black', color: 'transparent', animationDuration: '50s' }}
              >
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-[8rem] md:text-[15rem] font-black uppercase tracking-tighter mx-8">
                    TALENT INTELLIGENCE
                  </span>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 inline-flex items-center rounded-full border border-black/10 bg-white/80 px-4 py-1.5 text-sm font-semibold tracking-wide backdrop-blur-md shadow-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              <ScrambleText text="Next-Gen Talent Intelligence" />
            </motion.div>
            
            <motion.h1 
              style={{ skewY: skewVelocity }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-5xl text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[1.1] flex flex-wrap justify-center gap-x-4 gap-y-2 origin-center px-4"
            >
              {words.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className={i >= 4 ? "text-slate-400" : ""}>
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="mx-auto mb-12 max-w-2xl text-xl text-slate-500 leading-relaxed font-medium"
            >
              The ultimate AI-driven hiring platform. Deep behavioral analytics and structural competency mapping for modern teams.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/onboarding">
                <Magnetic>
                  <Button size="lg" className="rounded-full shadow-xl shadow-black/10 h-14 px-8 text-base group transition-all hover:scale-105 border border-transparent hover:border-black/20 font-bold">
                    Start Building Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Magnetic>
              </Link>
              <Link href="#features">
                <Magnetic>
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-white/50 backdrop-blur-sm hover:bg-white transition-all font-bold">
                    View the Platform
                  </Button>
                </Magnetic>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* INFINITE MARQUEE SECTION */}
        <section className="py-12 border-b bg-slate-50/50 overflow-hidden flex items-center">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center space-x-16 mx-8">
                {["Powered by OpenAI", "Advanced DNLA Analytics", "Real-time Processing", "Structural Insights", "Predictive Models", "Cognitive Assessment"].map((text, idx) => (
                  <span key={idx} className="text-xl font-bold text-slate-300 uppercase tracking-widest flex items-center">
                    <Star className="h-6 w-6 mr-4 text-slate-200" />
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES SECTION WITH GLOW CARDS */}
        <section id="features" className="py-20 lg:py-24 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-20 text-center">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter px-4">
                <ScrambleText text="Architecture of Success" />
              </h2>
              <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl mx-auto">Comprehensive tools built directly into the fabric of modern evaluation.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Brain, title: "AI Interview Protocol", desc: "Automated, adaptive technical and behavioral assessments with real-time logic parsing." },
                { icon: Target, title: "DNLA Assessment", desc: "Discover Natural Latent Abilities to pinpoint exactly where talent aligns with structural need." },
                { icon: LineChart, title: "Algorithmic Coaching", desc: "Actionable, data-driven insights tailored to bridge specific cognitive and technical gaps." }
              ].map((feature, i) => (
                <GlowCard key={i}>
                  <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-black border shadow-sm">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* STICKY HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-0 relative">
          <div className="grid lg:grid-cols-2">
            <div className="bg-black text-white p-12 md:p-16 lg:p-32 flex flex-col justify-center lg:sticky lg:top-0 h-fit lg:h-screen lg:rounded-tr-[100px]">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-6">The Process.</h2>
              <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-md">A rigid, standardized pathway to discovering extraordinary human potential.</p>
            </div>
            
            <div className="p-8 md:p-16 lg:p-24 space-y-12 md:space-y-20 bg-slate-50">
              {[
                { step: "01", icon: User, title: "Establish Baseline", desc: "Candidates enter the secure platform to begin dynamic baseline assessments." },
                { step: "02", icon: Target, title: "Pattern Recognition", desc: "The engine maps behavioral and technical traits against millions of successful profiles." },
                { step: "03", icon: LineChart, title: "Gap Analysis", desc: "We identify precise deficiencies and surface them through intense actionable intelligence." },
                { step: "04", icon: Briefcase, title: "Placement", desc: "Perfect matching algorithm successfully pairs talent structure with organizational needs." }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col group">
                  <div className="text-5xl md:text-7xl font-black text-slate-200 mb-6 group-hover:text-black transition-colors">{step.step}</div>
                  <h3 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVANT GARDE STICKY TESTIMONIALS */}
        <section className="bg-slate-100 relative pb-[20vh] overflow-hidden">
          {/* Faint Background Header */}
          <div className="sticky top-0 z-0 h-screen w-full flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-[6rem] md:text-[12rem] font-black tracking-tighter text-slate-200/50 uppercase leading-none text-center">
              Global <br/> Consensus
            </h2>
          </div>

          <div className="container mx-auto px-4 relative z-10 -mt-[50vh]">
            <div className="w-full max-w-3xl mx-auto">
              {[
                { text: "The computational accuracy of this intelligence platform is staggering. It completely eradicated subjective bias from our engineering matrix.", author: "Sarah Jenkins", role: "VP Engineering, TechCorp" },
                { text: "We integrated their neural endpoints directly into our curriculum. Alumni placement rates exploded by 40% in just six months of active use.", author: "Dr. Robert Smith", role: "Dean of Tech, State Univ" },
                { text: "My psychological interview nerves were gone. The AI coach found my exact weakness in distributed system design and forced me to correct it.", author: "Michael Chen", role: "Placed at FAANG" }
              ].map((testimonial, i) => (
                <div 
                  key={i} 
                  className="sticky w-full mb-[15vh] transition-transform duration-500 ease-out"
                  style={{ top: `calc(15vh + ${i * 2}rem)` }}
                >
                  <GlowCard className="w-full bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-8 lg:p-12 text-left flex flex-col justify-between transform origin-top transition-all" style={{ zIndex: i }}>
                    <div>
                      <Star className="h-6 w-6 text-black mb-6" />
                      <p className="text-black font-semibold text-xl lg:text-2xl leading-relaxed italic mb-8">"{testimonial.text}"</p>
                    </div>
                    <div className="pt-6 border-t flex items-center space-x-6">
                      <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center font-bold text-white shadow-xl text-lg">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-black text-xl mb-1">{testimonial.author}</p>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{testimonial.role}</p>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FlashlightCTA />
      </main>

      <Footer />
      <AICopilot />
    </div>
    </>
  );
}
