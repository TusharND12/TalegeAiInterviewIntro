"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: number[];
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, defaultValue, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const [localValue, setLocalValue] = React.useState(
      value ? value[0] : (defaultValue ? defaultValue[0] : min)
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setLocalValue(newValue);
      if (onValueChange) {
        onValueChange([newValue]);
      }
    };

    const percentage = ((localValue - min) / (max - min)) * 100;

    return (
      <div className={cn("relative flex w-full touch-none items-center select-none py-4", className)}>
        {/* Track */}
        <div className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-200">
          {/* Indicator (Range Highlight) */}
          <div 
            className="absolute h-full bg-black transition-all duration-75" 
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Hidden but functional Range Input */}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 appearance-none"
          {...props}
        />

        {/* Visual Thumb Overlay */}
        <div 
          className="absolute h-4 w-4 rounded-full border-2 border-black bg-white shadow-sm pointer-events-none transition-all duration-75 ease-out"
          style={{ 
            left: `calc(${percentage}% - 0.5rem)`,
            transform: 'translateX(0)' 
          }} 
        />
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
