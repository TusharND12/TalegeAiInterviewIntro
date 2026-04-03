"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  GraduationCap, 
  LayoutDashboard, 
  LineChart, 
  UserCircle,
  Users,
  X
} from "lucide-react";

const navItems = [
  {
    title: "Student Dashboard",
    href: "/dashboard/student",
    icon: GraduationCap,
  },
  {
    title: "Institute Analytics",
    href: "/dashboard/institute",
    icon: Building2,
  },
  {
    title: "Recruiter View",
    href: "/dashboard/recruiter",
    icon: Users,
  },
  {
    title: "Exam Tracking",
    href: "/dashboard/exam",
    icon: LineChart,
  },
];

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 md:hidden backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 border-r bg-white flex flex-col items-start px-4 py-8 shadow-2xl transition-transform duration-300 md:relative md:w-64 md:translate-x-0 md:shadow-sm md:flex shrink-0",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <button onClick={onClose} className="md:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-black">
          <X className="h-6 w-6" />
        </button>

        <Link href="/" className="flex items-center space-x-2 px-2 mb-10">
          <div className="bg-black p-2 rounded-xl shadow-lg">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tighter text-black">TalentIQ</span>
        </Link>
        
        <div className="w-full flex-1 space-y-1.5">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-3">
            Navigation Unit
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200",
                  isActive 
                    ? "bg-black text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-black"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="w-full pt-4 border-t border-slate-100 mt-auto">
          <Link
            href="/profile"
            className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-black transition-all duration-200"
          >
            <UserCircle className="h-5 w-5 text-slate-400" />
            <span>Profile</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
