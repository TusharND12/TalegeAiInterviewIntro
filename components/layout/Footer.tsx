import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">TalentIQ</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
            Measure, predict, and improve human potential with AI-driven talent intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-foreground">Platform</h4>
            <Link href="#features" className="text-muted-foreground hover:text-primary transition">Features</Link>
            <Link href="/dashboard/student" className="text-muted-foreground hover:text-primary transition">For Candidates</Link>
            <Link href="/dashboard/recruiter" className="text-muted-foreground hover:text-primary transition">For Recruiters</Link>
            <Link href="/dashboard/institute" className="text-muted-foreground hover:text-primary transition">For Institutes</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-semibold text-foreground">Company</h4>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">About Us</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">Careers</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">Blog</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">Contact</Link>
          </div>
          <div className="flex flex-col space-y-3 col-span-2 md:col-span-1">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">Terms of Service</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} TalentIQ. All rights reserved.
      </div>
    </footer>
  );
}
