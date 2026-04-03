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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Institute Analytics</h1>
          <p className="text-muted-foreground mt-1">Overview of student performance and placement readiness.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white"><Filter className="h-4 w-4 mr-2"/> Filter</Button>
          <Button variant="outline" className="bg-white">Batch 2024 <ChevronDown className="h-4 w-4 ml-2"/></Button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border-none shadow-sm shrink-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-muted-foreground">Overall Placement Readiness</h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><BookOpen className="h-5 w-5"/></div>
          </div>
          <p className="text-3xl font-bold">78.5%</p>
          <div className="text-sm text-black mt-2 font-medium">+4.2% from last month</div>
        </Card>
        <Card className="p-6 bg-white border-none shadow-sm shrink-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-muted-foreground">Active Candidates</h3>
            <div className="p-2 bg-accent/10 rounded-lg text-accent"><Users className="h-5 w-5"/></div>
          </div>
          <p className="text-3xl font-bold">1,204</p>
          <div className="text-sm text-muted-foreground mt-2">Across 4 departments</div>
        </Card>
        <Card className="p-6 bg-primary text-white border-none shadow-md shrink-0 flex flex-col justify-between">
          <h3 className="font-semibold text-primary-foreground/80">Critical Gap Alert</h3>
          <p className="text-sm mt-2 leading-relaxed">System Design competency across CS Dept has dropped by 12%. Recommended action: Schedule expert workshop.</p>
          <Button variant="secondary" size="sm" className="w-fit mt-4 bg-white text-primary hover:bg-white/90">Take Action</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <Card className="p-6 bg-white border-none shadow-sm">
          <h3 className="font-bold text-lg mb-6">Average Score by Department</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="avgScore" fill="#000000" radius={[4, 4, 0, 0]} barSize={40} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* LINE CHART */}
        <Card className="p-6 bg-white border-none shadow-sm">
          <h3 className="font-bold text-lg mb-6">Performance Trend (Overall)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="score" stroke="#000000" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
