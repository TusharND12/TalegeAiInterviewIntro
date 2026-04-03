"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BrainCircuit, Upload, Sparkles, Building, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Magnetic } from "@/components/ui/magnetic";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [goal, setGoal] = useState<string | null>(null);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const finish = () => router.push("/dashboard/student");

  const slideVariants = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  };

  const stepsList = ["Identity", "Objective", "Baseline", "Target"];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row font-sans selection:bg-black selection:text-white">
      
      {/* STATIC BACKGROUND ASSET - BRAND SIDE */}
      <div className="hidden md:flex w-[30%] max-w-sm bg-black text-white p-12 flex-col justify-between relative overflow-hidden shrink-0">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center space-x-3 w-fit hover:opacity-70 transition-opacity">
            <BrainCircuit className="h-8 w-8 text-white" />
            <span className="font-black text-2xl tracking-tight">TalentIQ</span>
          </Link>
        </div>

        <div className="relative z-10 w-full space-y-8">
           <div>
             <h2 className="text-4xl font-black uppercase tracking-tighter leading-[1.1] mb-4">
               Setup <br/> Workspace.
             </h2>
             <p className="text-white/60 text-sm font-medium leading-relaxed">
               Configure your algorithmic pipeline to accurately assess and prepare your profile.
             </p>
           </div>

           {/* Step Tracking */}
           <div className="space-y-4 pt-8 border-t border-white/20">
              {stepsList.map((label, i) => (
                <div key={i} className={`flex items-center gap-4 transition-opacity duration-300 ${step === i + 1 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`h-2 w-2 rounded-full ${step === i + 1 ? 'bg-white' : 'bg-white/50'}`} />
                  <span className={`text-sm font-bold uppercase tracking-widest ${step === i + 1 ? 'text-white' : 'text-white/50'}`}>
                    0{i+1} {label}
                  </span>
                </div>
              ))}
           </div>
        </div>

        {/* Minimal aesthetic lines */}
        <div className="relative z-10 border-l px-4 border-white/20">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Protocol: ONBOARDING</p>
        </div>
      </div>

      {/* INTERACTIVE COMPONENT - MAIN FLOW SIDE */}
      <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-24 relative bg-slate-50/50 overflow-y-auto">
        
        <Link href="/" className="absolute top-8 left-8 text-sm font-semibold flex items-center gap-2 text-slate-500 hover:text-black transition-colors md:hidden">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        
        {/* WIZARD CONTENT */}
        <div className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: IDENTITY */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Create Profile</h1>
                  <p className="text-slate-500 font-medium">Basic details to initialize your node.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="h-14 bg-white border-slate-200 focus-visible:border-black focus-visible:ring-0 rounded-xl px-4 text-base shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="h-14 bg-white border-slate-200 focus-visible:border-black focus-visible:ring-0 rounded-xl px-4 text-base shadow-sm" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: OBJECTIVE */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Select Primary Objective</h1>
                  <p className="text-slate-500 font-medium">How do you intend to use TalentIQ?</p>
                </div>
                
                <div className="space-y-4">
                  <div 
                    className={`p-4 md:p-6 border-2 rounded-2xl cursor-pointer transition-all hover:border-black flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6 group ${goal === "placement" ? "border-black bg-slate-100" : "bg-white border-slate-200"}`}
                    onClick={() => setGoal("placement")}
                  >
                    <div className={`p-4 rounded-full shrink-0 ${goal === "placement" ? "bg-black text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"}`}>
                      <Building className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Corporate Placement</h3>
                      <p className="text-sm text-slate-500 font-medium leading-tight">Tech roles, behavioral screening, system design.</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 md:p-6 border-2 rounded-2xl cursor-pointer transition-all hover:border-black flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6 group ${goal === "exam" ? "border-black bg-slate-100" : "bg-white border-slate-200"}`}
                    onClick={() => setGoal("exam")}
                  >
                    <div className={`p-4 rounded-full shrink-0 ${goal === "exam" ? "bg-black text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"}`}>
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Competitive Examinations</h3>
                      <p className="text-sm text-slate-500 font-medium leading-tight">UPSC, GRE, structured verbal assessments.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BASELINE */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Upload Resume</h1>
                  <p className="text-slate-500 font-medium">We will parse this to build your baseline competencies.</p>
                </div>
                
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-3xl bg-white hover:bg-slate-50 hover:border-black transition-colors cursor-pointer group shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Click or drag file here</h3>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">PDF, DOCX (Max 5MB)</p>
                </div>
              </motion.div>
            )}

            {/* STEP 4: TARGET */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Target Vector</h1>
                  <p className="text-slate-500 font-medium">Customize your practice arena.</p>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Target Role / Exam Name</Label>
                    <Input placeholder="e.g. Frontend Developer, UPSC Prelims..." className="h-14 bg-white border-slate-200 focus-visible:border-black focus-visible:ring-0 rounded-xl px-4 text-base shadow-sm" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Level</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border p-2 rounded-2xl bg-white border-slate-200">
                      {["Novice", "Intermediate", "Expert"].map(lvl => (
                        <div key={lvl} className="text-center py-2 sm:py-3 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors text-sm font-bold text-slate-600 hover:text-black">
                          {lvl}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200 font-medium">
            <Button 
              variant="ghost" 
              onClick={prevStep}
              className={`hover:bg-slate-100 text-slate-500 hover:text-black font-bold h-12 px-6 rounded-xl ${step === 1 ? "invisible" : ""}`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {step < 4 ? (
              <Magnetic>
                <Button onClick={nextStep} disabled={step === 2 && !goal} className="px-8 h-12 rounded-xl bg-black text-white hover:bg-slate-800 transition-all font-bold shadow-lg shadow-black/20">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Magnetic>
            ) : (
              <Magnetic>
                <Button onClick={finish} className="px-8 h-12 rounded-xl bg-black text-white hover:bg-slate-800 transition-all font-bold shadow-lg shadow-black/20">
                  Execute Setup <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              </Magnetic>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
