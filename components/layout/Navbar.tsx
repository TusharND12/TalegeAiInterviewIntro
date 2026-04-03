"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) return null; // Dashboard has its own sidebar/header

  const navLinks = [
    { href: "/onboarding", label: "Candidates" },
    { href: "/dashboard/institute", label: "Institutes" },
    { href: "/dashboard/recruiter", label: "Recruiters" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">TalentIQ</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-end space-x-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="hidden sm:inline-flex rounded-full hover:bg-slate-100">Sign In</Button>
          </Link>
          <Link href="/onboarding">
            <Button className="rounded-full shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-primary/50 bg-primary h-10 px-6 text-xs md:text-sm font-bold">Get Started</Button>
          </Link>
          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 bg-white overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-bold text-muted-foreground" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <hr className="border-slate-100" />
              <Link href="/sign-in" className="text-sm font-bold" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
