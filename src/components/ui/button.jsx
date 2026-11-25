import React from "react";
import { cn } from "../../lib/utils";

export function Button({ children, variant = "default", size = "md", className = "", ...props }) {
  const variants = {
    default: "bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-200",
    outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    soft: "bg-violet-50 text-violet-700 hover:bg-violet-100",
  };
  const sizes = { sm: "h-9 px-3 text-xs", md: "h-10 px-4 text-sm", icon: "h-10 w-10" };
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50", variants[variant], sizes[size], className)} {...props}>{children}</button>;
}