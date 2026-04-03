"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI Copilot. How can I help you improve your score today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Based on your recent mock interviews, I'd suggest focusing on your system design structure and communication clarity. Would you like a targeted practice session?"
      }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white/80 backdrop-blur-3xl border border-white/40 shadow-2xl shadow-primary/20 rounded-2xl overflow-hidden z-50 flex flex-col"
            style={{ height: "500px" }}
          >
            <div className="bg-gradient-to-r from-black to-slate-800 p-4 flex items-center justify-between text-white shadow-md z-10">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">AI Copilot</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 h-8 w-8 rounded-full transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent relative">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-white border text-foreground rounded-bl-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t bg-white">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center space-x-2"
              >
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..." 
                  className="flex-1 rounded-full border-muted-foreground/20 focus-visible:ring-primary/50 shadow-inner bg-white/50"
                />
                <Button type="submit" size="icon" className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 shrink-0 shadow-md">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-tr from-black to-slate-800 text-white shadow-xl shadow-slate-300 flex items-center justify-center z-50 hover:shadow-slate-400 transition-all border border-slate-700"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquarePlus className="h-6 w-6" />}
      </motion.button>
    </>
  );
}
