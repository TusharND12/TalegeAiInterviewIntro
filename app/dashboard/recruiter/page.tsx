"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, SlidersHorizontal, UserPlus, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";

const candidates = [
  { name: "Alice Freeman", role: "Frontend Developer", fit: 94, prob: 98, tags: ["React", "System Design", "Leadership"], rec: true },
  { name: "Michael Chen", role: "Fullstack Engineer", fit: 88, prob: 91, tags: ["Node.js", "Algorithms", "AWS"], rec: true },
  { name: "Sarah Jenkins", role: "UI/UX Designer", fit: 85, prob: 85, tags: ["Figma", "Research", "CSS"], rec: false },
  { name: "David Kim", role: "Backend Engineer", fit: 79, prob: 72, tags: ["Python", "Databases", "Docker"], rec: false },
];

export default function RecruiterDashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 min-h-screen lg:h-[calc(100vh-8rem)]">
      
      {/* FILTER SIDEBAR / TOP BAR ON MOBILE */}
      <Card className="w-full lg:w-80 p-6 bg-white border border-slate-100 shadow-sm flex flex-col shrink-0 h-fit lg:h-full overflow-y-auto rounded-2xl">
        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-8">
          <SlidersHorizontal className="h-4 w-4"/> Intelligence Filters
        </h3>
        
        <div className="space-y-8">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-slate-500">Target Role</label>
            <Input placeholder="e.g. Frontend Developer" className="h-12 bg-slate-50 border-slate-100 focus-visible:ring-black rounded-xl" />
          </div>
          
          <div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="text-slate-500">Minimum Fit Score</span>
              <span className="text-black">80%</span>
            </div>
            <Slider defaultValue={[80]} max={100} step={1} className="py-4" />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-slate-500">Core Competencies</label>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Python', 'AWS', 'System Design'].map(tag => (
                <Badge key={tag} variant="outline" className="px-3 py-1 rounded-lg bg-slate-50 text-slate-500 border-slate-100 hover:bg-black hover:text-white transition-colors border-none text-[10px] font-bold uppercase tracking-wider">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-10 h-12 rounded-xl bg-black text-white hover:bg-slate-800 font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-black/10">Apply Parameters</Button>
      </Card>

      {/* MAIN CANDIDATE FEED */}
      <div className="flex-1 space-y-6 flex flex-col h-full">
        {/* Search & Sort Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-2 md:p-4 rounded-2xl border border-slate-100 shadow-sm gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search identification units..." className="pl-12 border-none bg-slate-50 focus-visible:ring-0 h-12 rounded-xl text-sm" />
          </div>
          <div className="hidden sm:flex items-center gap-4 px-6 border-l border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort Matrix:</span>
            <span className="text-xs font-black text-black cursor-pointer uppercase tracking-widest hover:underline underline-offset-4">Success Prob.</span>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-visible lg:overflow-y-auto space-y-4 lg:pr-2 pb-10 md:pb-0">
          {candidates.map((cand, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`p-4 md:p-6 border border-slate-100 shadow-sm transition-all hover:shadow-xl flex flex-col md:flex-row items-center gap-4 md:gap-8 group rounded-2xl ${cand.rec ? 'bg-white ring-2 ring-black/5 ring-inset' : 'bg-white'}`}>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Avatar className="h-16 w-16 md:h-20 md:w-20 rounded-2xl border-2 border-slate-50 shadow-inner">
                    <AvatarFallback className="bg-black text-white text-xl font-black">{cand.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 md:hidden">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-lg text-black uppercase tracking-tighter">{cand.name}</h3>
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cand.role}</p>
                  </div>
                </div>

                <div className="flex-1 hidden md:block">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-black text-xl text-black uppercase tracking-tighter">{cand.name}</h3>
                    {cand.rec && (
                      <Badge className="bg-black text-white border-none shadow-lg shadow-black/10 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                        AI_TOP_PICK
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 leading-none">{cand.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {cand.tags.map(tag => (
                      <Badge key={tag} className="bg-slate-50 text-slate-500 border-none text-[9px] font-bold uppercase px-2 py-0.5 rounded-md">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Score section stays desktop-ish if possible but stacks label */}
                <div className="flex w-full md:w-auto justify-between md:justify-end gap-4 md:gap-10 px-0 md:px-8 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0">
                  <div className="text-center md:text-left">
                    <div className="text-xl md:text-3xl font-black text-black tabular-nums leading-none mb-2">{cand.fit}%</div>
                    <div className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Match_Acc</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-xl md:text-3xl font-black text-black underline underline-offset-8 decoration-slate-200 tabular-nums leading-none mb-2">{cand.prob}%</div>
                    <div className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Success_Vector</div>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                  <Button variant="outline" className="flex-1 md:h-10 md:w-10 rounded-xl border-slate-100 text-slate-400 hover:text-black hover:bg-slate-50">
                    <FileText className="h-4 w-4"/>
                    <span className="md:hidden ml-2 font-bold uppercase text-[10px]">Open Dossier</span>
                  </Button>
                  <Button className="flex-1 md:h-10 md:w-10 rounded-xl bg-black text-white hover:bg-slate-800 shadow-xl shadow-black/10">
                    <UserPlus className="h-4 w-4"/>
                    <span className="md:hidden ml-2 font-bold uppercase text-[10px]">Execute Action</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
