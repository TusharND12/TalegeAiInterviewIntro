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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">Here is your latest talent intelligence snapshot.</p>
        </div>
        <Button className="rounded-full shadow-lg gap-2">
          <Video className="h-4 w-4" /> Start Mock Interview
        </Button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Technical Score", val: 82, color: "bg-black", text: "text-black", icon: Trophy },
          { title: "Behavioral Score", val: 76, color: "bg-slate-600", text: "text-slate-600", icon: Target },
          { title: "Culture Fit", val: 89, color: "bg-slate-400", text: "text-slate-400", icon: Trophy },
          { title: "Success Probability", val: 92, color: "bg-primary", text: "text-primary", icon: TrendingUp },
        ].map((metric, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 relative overflow-hidden group hover:shadow-md transition-shadow bg-white border-none shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-primary/50 transition-all"></div>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-muted ${metric.text}`}>
                  <metric.icon className="h-5 w-5" />
                </div>
                <span className={`text-2xl font-bold ${metric.text}`}>{metric.val}%</span>
              </div>
              <h3 className="font-semibold text-muted-foreground mb-3">{metric.title}</h3>
              <Progress value={metric.val} className={`h-1.5 [&>div]:${metric.color}`} />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RADAR CHART */}
        <Card className="col-span-1 lg:col-span-2 p-6 bg-white border-none shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-6">Competency Radar</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Student" dataKey="A" stroke="#000000" fill="#000000" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI INSIGHTS */}
        <Card className="col-span-1 p-6 bg-primary/5 border border-primary/10 shadow-none flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Bot className="h-32 w-32" />
          </div>
          <div className="flex items-center gap-2 text-primary font-bold mb-6">
            <Bot className="h-5 w-5" /> AI Coach Insights
          </div>
          
          <div className="space-y-4 relative z-10 flex-1">
            <div className="bg-white p-4 rounded-xl shadow-sm text-sm border">
              <span className="font-semibold text-black block mb-1">Strength Detected</span>
              Your System Design approach in the last interview was top 10% among peers.
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-sm border">
              <span className="font-semibold text-slate-800 block mb-1">Improvement Area</span>
              You struggled with dynamic programming under time pressure. Attempting to brute-force caused a 30% drop in debugging score.
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-6 bg-white hover:bg-white/90 shadow-sm gap-2 text-primary border-primary/20">
            View Training Plan <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </div>

    </div>
  );
}
