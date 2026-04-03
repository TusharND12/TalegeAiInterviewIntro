"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Magnetic } from "@/components/ui/magnetic";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row font-sans selection:bg-black selection:text-white">
      
      {/* STATIC BACKGROUND ASSET - BRAND SIDE */}
      <div className="hidden md:flex flex-1 bg-black text-white p-12 flex-col justify-between relative overflow-hidden">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center space-x-3 w-fit hover:opacity-70 transition-opacity">
            <BrainCircuit className="h-8 w-8 text-white" />
            <span className="font-black text-2xl tracking-tight">TalentIQ</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] mb-6">
            Welcome <br/> Back.
          </h2>
          <p className="text-white/60 font-medium leading-relaxed">
            Re-initialize your workflow. Access precision talent analytics and algorithmic mock interviews instantly.
          </p>
        </div>

        {/* Minimal aesthetic lines */}
        <div className="relative z-10 border-l px-4 border-white/20">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">System Status: Online</p>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Latency: 12ms</p>
        </div>
      </div>

      {/* INTERACTIVE COMPONENT - LOGIN SIDE */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative bg-white">
        
        <Link href="/" className="absolute top-8 left-8 text-sm font-semibold flex items-center gap-2 text-slate-500 hover:text-black transition-colors md:hidden">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto space-y-10"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Sign In</h1>
            <p className="text-slate-500 font-medium">Enter your credentials to access your dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href='/dashboard/student'; }}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Work Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                className="h-14 bg-slate-50/50 border-slate-200 focus-visible:border-black focus-visible:ring-0 rounded-xl px-4 text-base font-medium shadow-sm transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</Label>
                <Link href="#" className="text-xs font-bold text-black border-b border-black/0 hover:border-black transition-colors">Forgot?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="h-14 bg-slate-50/50 border-slate-200 focus-visible:border-black focus-visible:ring-0 rounded-xl px-4 text-base shadow-sm transition-all"
                required
              />
            </div>

            <div className="pt-4">
              <Magnetic>
                <Button type="submit" size="lg" className="w-full h-14 rounded-xl bg-black text-white hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                  Continue Form
                </Button>
              </Magnetic>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-slate-500">
                Don't have an account?{" "}
                <Link href="/onboarding" className="text-black font-bold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
      
    </div>
  );
}
