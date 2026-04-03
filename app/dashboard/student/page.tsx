"use client";

import { motion } from "framer-motion";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip
} from 'recharts';
import { Bot, ArrowRight, Video, Target, Trophy, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const radarData = [
  { subject: 'System Design', A: 120, fullMark: 150 },
  { subject: 'Algorithms', A: 98, fullMark: 150 },
  { subject: 'Communication', A: 86, fullMark: 150 },
  { subject: 'Problem Solving', A: 99, fullMark: 150 },
  { subject: 'Culture Fit', A: 85, fullMark: 150 },
  { subject: 'Debugging', A: 65, fullMark: 150 },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-black uppercase">Welcome back, John!</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1 italic">Intelligence Protocol: ACTIVE</p>
        </div>
        <Button className="rounded-xl shadow-xl shadow-black/10 gap-2 h-12 px-6 bg-black text-white hover:bg-slate-800 font-bold transition-all w-full sm:w-auto">
          <Video className="h-4 w-4" /> Start Mock Interview
        </Button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Technical Score", val: 82, color: "bg-black", text: "text-black", icon: Trophy },
          { title: "Behavioral Score", val: 76, color: "bg-slate-800", text: "text-slate-800", icon: Target },
          { title: "Culture Fit", val: 89, color: "bg-slate-600", text: "text-slate-600", icon: Trophy },
          { title: "Success Prob.", val: 92, color: "bg-black", text: "text-black", icon: TrendingUp },
        ].map((metric, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.05 }}
          >
            <Card className="p-5 md:p-6 relative overflow-hidden group hover:shadow-xl transition-all bg-white border border-slate-100 shadow-sm rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl bg-slate-50 border border-slate-100 ${metric.text}`}>
                  <metric.icon className="h-5 w-5" />
                </div>
                <span className={`text-2xl font-black tabular-nums ${metric.text}`}>{metric.val}%</span>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">{metric.title}</h3>
              <Progress value={metric.val} className="h-1 bg-slate-100" />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RADAR CHART */}
        <Card className="col-span-1 lg:col-span-2 p-6 bg-white border border-slate-100 shadow-sm rounded-2xl flex flex-col min-h-[400px]">
          <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-8">Competency Matrix</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Student" dataKey="A" stroke="#000000" strokeWidth={2} fill="#000000" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI INSIGHTS */}
        <Card className="col-span-1 p-6 bg-black text-white border-none shadow-2xl rounded-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Bot className="h-32 w-32 text-white" />
          </div>
          <div className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-widest mb-8 relative z-10">
            <Bot className="h-4 w-4" /> AI_DIAGNOSTICS
          </div>
          
          <div className="space-y-4 relative z-10 flex-1">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <span className="font-black text-[10px] uppercase tracking-widest text-white/40 block mb-2">Peak Performance</span>
              <p className="text-sm font-medium leading-relaxed">System Architecture logic parsing identified as Tier-1 competency.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <span className="font-black text-[10px] uppercase tracking-widest text-white/40 block mb-2">Neural Gap</span>
              <p className="text-sm font-medium leading-relaxed">Latency in recursive backtracking resolution. 12% drift from benchmark.</p>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-8 bg-white text-black hover:bg-slate-100 border-none h-12 rounded-xl font-bold uppercase text-xs tracking-widest">
            Execute Optimization <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Card>
      </div>

    </div>
  );
}
