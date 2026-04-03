"use client";

import { motion } from "framer-motion";
import { 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';
import { Users, BookOpen, ChevronDown, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const barData = [
  { name: 'CS Dept', avgScore: 85 },
  { name: 'IT Dept', avgScore: 78 },
  { name: 'EC Dept', avgScore: 72 },
  { name: 'Mech Dept', avgScore: 65 },
];

const progressData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 68 },
  { week: 'Week 3', score: 75 },
  { week: 'Week 4', score: 82 },
  { week: 'Week 5', score: 88 },
];

export default function InstituteDashboard() {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-black uppercase">Institute Analytics</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1 italic">Structural Assessment Protocol: ACTIVE</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl bg-white border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-widest"><Filter className="h-4 w-4 mr-2"/> Filters</Button>
          <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl bg-white border-slate-100 text-slate-500 font-bold uppercase text-[10px] tracking-widest">Batch 2024 <ChevronDown className="h-4 w-4 ml-2"/></Button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Placement Readiness</h3>
            <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-black"><BookOpen className="h-4 w-4"/></div>
          </div>
          <p className="text-3xl md:text-4xl font-black tabular-nums text-black">78.5%</p>
          <div className="text-[10px] font-bold text-black bg-slate-50 px-2 py-1 rounded-md mt-4 w-fit uppercase tracking-widest">+4.2% Momentum</div>
        </Card>
        
        <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Active Units</h3>
            <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-black"><Users className="h-4 w-4"/></div>
          </div>
          <p className="text-3xl md:text-4xl font-black tabular-nums text-black">1,204</p>
          <div className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest italic">Across 4 Node Clusters</div>
        </Card>

        <Card className="p-6 bg-black text-white border-none shadow-2xl rounded-2xl flex flex-col sm:col-span-2 md:col-span-1">
          <div className="mb-4">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-white/40 mb-3">Critical Vector Drift</h3>
            <p className="text-xs font-medium leading-relaxed">System Architecture latency in CS Cluster dropped by 12%. Immediate optimization required.</p>
          </div>
          <Button variant="secondary" className="w-full h-11 bg-white text-black hover:bg-slate-100 font-bold uppercase text-[10px] tracking-widest rounded-xl">Execute Workshop</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl min-h-[400px]">
          <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-10">Cluster Performance Matrix</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={barData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
                <Bar dataKey="avgScore" fill="#000000" radius={[8, 8, 0, 0]} barSize={40} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* LINE CHART */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl min-h-[400px]">
          <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-10">Historical Growth Vector</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }} />
                <Line type="monotone" dataKey="score" stroke="#000000" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#000' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
