"use client";

import { useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-8">
      
      {/* LEFT SIDEBAR: FILTERS */}
      <Card className="w-80 p-6 bg-white border-none shadow-sm flex flex-col shrink-0 h-full overflow-y-auto">
        <h3 className="font-bold flex items-center gap-2 mb-6"><SlidersHorizontal className="h-5 w-5"/> Advanced Filters</h3>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-3 block">Role</label>
            <Input placeholder="e.g. Frontend Developer" className="bg-muted/50 border-0" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-3">
              <span className="font-semibold">Minimum Fit Score</span>
              <span className="text-primary font-bold">80%</span>
            </div>
            {mounted ? <Slider defaultValue={[80]} max={100} step={1} className="py-4" /> : <div className="h-8 py-4" />}
          </div>

          <div>
            <label className="text-sm font-semibold mb-3 block">Skills (Tags)</label>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'Python', 'AWS', 'System Design'].map(tag => (
                <Badge key={tag} variant="outline" className="bg-muted/30 hover:bg-primary/10 hover:text-primary cursor-pointer border-border/50 text-muted-foreground">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        <Button className="w-full mt-auto rounded-xl">Apply Filters</Button>
      </Card>

      {/* MAIN CONTENT RUN */}
      <div className="flex-1 space-y-6 flex flex-col h-full">
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search candidates by name..." className="pl-10 border-none bg-muted/30 focus-visible:ring-0" />
          </div>
          <div className="flex items-center gap-2 px-4 border-l">
            <span className="text-sm font-medium">Sort by:</span>
            <span className="text-sm font-bold text-primary cursor-pointer">AI Recommendation</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {candidates.map((cand, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`p-5 border-none shadow-sm transition-all hover:shadow-md flex items-center gap-6 group ${cand.rec ? 'bg-primary/5 ring-1 ring-primary/20' : 'bg-white'}`}>
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">{cand.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{cand.name}</h3>
                    {cand.rec && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none shadow-none text-xs gap-1">
                        <Sparkles className="h-3 w-3" /> AI Top Pick
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{cand.role}</p>
                  <div className="flex gap-2">
                    {cand.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-white text-xs border-border/40 font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-8 px-6 border-l border-border/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-500">{cand.fit}%</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Fit Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{cand.prob}%</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Success Rate</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-white"><FileText className="h-4 w-4"/></Button>
                  <Button size="icon" className="h-8 w-8 rounded-full shadow-sm"><UserPlus className="h-4 w-4"/></Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
