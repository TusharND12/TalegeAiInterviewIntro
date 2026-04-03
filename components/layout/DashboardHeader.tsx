"use client";

import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DashboardHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function DashboardHeader({ isSidebarOpen, setIsSidebarOpen }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-white/80 px-4 md:hidden backdrop-blur-md">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-black p-1.5 rounded-lg shrink-0">
          <LayoutDashboard className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold text-lg tracking-tight text-black">TalentIQ</span>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="h-10 w-10 text-black hover:bg-slate-100 rounded-xl"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    </header>
  );
}
