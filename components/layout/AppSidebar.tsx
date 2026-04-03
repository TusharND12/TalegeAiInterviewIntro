"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  GraduationCap, 
  LayoutDashboard, 
  LineChart, 
  UserCircle,
  Users
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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white min-h-screen flex flex-col items-start px-4 py-8 shadow-sm">
      <Link href="/" className="flex items-center space-x-2 px-2 mb-8">
        <div className="bg-primary p-1.5 rounded-lg">
          <LayoutDashboard className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">TalentIQ</span>
      </Link>
      
      <div className="w-full flex-1 space-y-1">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
          Dashboards
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/5 text-primary shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      <div className="w-full pt-4 border-t mt-auto">
        <Link
          href="/profile"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-all duration-200"
        >
          <UserCircle className="h-4 w-4" />
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  );
}
