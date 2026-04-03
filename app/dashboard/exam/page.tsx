"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar as CalendarIcon, AlertCircle, TrendingDown, Bell, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stressData = [
  { day: 'Mon', stress: 45 },
  { day: 'Tue', stress: 52 },
  { day: 'Wed', stress: 68 },
  { day: 'Thu', stress: 61 },
  { day: 'Fri', stress: 78 },
  { day: 'Sat', stress: 85 },
  { day: 'Sun', stress: 40 },
];

export default function ExamDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exam Prep Tracker</h1>
          <p className="text-muted-foreground mt-1">UPSC Prelims 2026 Target</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm border text-primary flex items-center gap-2">
          <CalendarIcon className="h-4 w-4"/> 245 Days Left
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* RISK ALERT */}
        <Card className="col-span-1 border-red-500/20 bg-red-50/50 p-6 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-red-500/20 transition-colors"></div>
          <div className="flex items-center gap-2 text-red-600 mb-4 font-bold">
            <AlertCircle className="h-5 w-5" /> Burnout Risk Detected
          </div>
          <p className="text-sm text-red-900 leading-relaxed font-medium">
            Your stress indicators have peaked over the last 3 days. AI recommends taking a 48-hour break from history mock tests to maintain long-term retention.
          </p>
        </Card>

        {/* METRICS */}
        <div className="col-span-2 grid grid-cols-2 gap-6">
          <Card className="p-6 bg-white border-none shadow-sm flex flex-col justify-center text-center">
             <div className="mx-auto p-3 bg-green-100 text-green-600 rounded-full mb-3 w-fit">
               <CheckCircle2 className="h-6 w-6"/>
             </div>
             <p className="text-2xl font-bold">14 Days</p>
             <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mt-1">Current Streak</p>
          </Card>
          <Card className="p-6 bg-white border-none shadow-sm flex flex-col justify-center text-center">
             <div className="mx-auto p-3 bg-accent/10 text-accent rounded-full mb-3 w-fit">
               <TrendingDown className="h-6 w-6"/>
             </div>
             <p className="text-2xl font-bold">12%</p>
             <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mt-1">Error Rate Drop</p>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* STRESS GRAPH */}
        <Card className="p-6 bg-white border-none shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Stress & Fatigue Index</h3>
            <Badge variant="outline" className="text-xs">Last 7 Days</Badge>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stressData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* CONSISTENCY HEATMAP SIMULATION */}
        <Card className="p-6 bg-white border-none shadow-sm">
          <h3 className="font-bold text-lg mb-6">Consistency Heatmap</h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => {
              // Generate some random intensity (0-4)
              const intensity = Math.floor(Math.random() * 5);
              const colorClass = [
                "bg-muted/30 border border-border/50", 
                "bg-primary/20", 
                "bg-primary/40", 
                "bg-primary/70", 
                "bg-primary"
              ][intensity];
              return (
                <div 
                  key={i} 
                  className={`aspect-square rounded-md ${colorClass} hover:ring-2 ring-border transition-all cursor-pointer`}
                  title={`Day ${i+1}`}
                />
              );
            })}
          </div>
          <div className="flex font-medium items-center justify-end space-x-2 mt-6 text-xs text-muted-foreground mr-2">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-muted/30 border"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/70"></div>
            <div className="w-3 h-3 rounded-sm bg-primary"></div>
            <span>More</span>
          </div>
        </Card>
      </div>

    </div>
  );
}
