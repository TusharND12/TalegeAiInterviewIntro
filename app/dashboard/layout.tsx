"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/30">
          <div className="mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
