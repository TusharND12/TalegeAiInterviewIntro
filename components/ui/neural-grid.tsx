"use client";

import { useEffect, useRef } from "react";

export function NeuralGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const nodes: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[] = [];
    const spacing = 80;
    const rows = Math.ceil(height / spacing) + 2;
    const cols = Math.ceil(width / spacing) + 2;

    for (let i = -1; i < cols; i++) {
      for (let j = -1; j < rows; j++) {
        const x = i * spacing + (Math.random() * 20 - 10);
        const y = j * spacing + (Math.random() * 20 - 10);
        nodes.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0 });
      }
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const radius = 250;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Determine if dark mode by checking HTML class (fallback to light colors if unknown, but we design for a white bg mostly unless inverted)
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Repulsion physics
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < radius) {
          const force = (radius - dist) / radius;
          const angle = Math.atan2(dy, dx);
          // Push away from mouse
          const repelX = Math.cos(angle) * force * -50;
          const repelY = Math.sin(angle) * force * -50;
          
          node.x += (node.baseX + repelX - node.x) * 0.1;
          node.y += (node.baseY + repelY - node.y) * 0.1;
        } else {
          // Return to base
          node.x += (node.baseX - node.x) * 0.05;
          node.y += (node.baseY - node.y) * 0.05;
        }
      }

      // Draw lines
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const dist = Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));
          
          if (dist < spacing * 1.5) {
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
          }
        }
      }
      ctx.stroke();

      // Draw nodes
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      for (let i = 0; i < nodes.length; i++) {
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20 opacity-40 mix-blend-multiply"
    />
  );
}
