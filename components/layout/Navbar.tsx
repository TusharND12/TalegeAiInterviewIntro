"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) return null; // Dashboard has its own sidebar/header

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/70"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">TalentIQ</span>
        </Link>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</Link>
          <Link href="/onboarding" className="text-muted-foreground hover:text-foreground transition-colors">Candidates</Link>
          <Link href="/dashboard/institute" className="text-muted-foreground hover:text-foreground transition-colors">Institutes</Link>
          <Link href="/dashboard/recruiter" className="text-muted-foreground hover:text-foreground transition-colors">Recruiters</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="hidden sm:inline-flex rounded-full hover:bg-slate-100">Sign In</Button>
          </Link>
          <Link href="/onboarding">
            <Button className="rounded-full shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-primary/50 bg-primary">Get Started</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
