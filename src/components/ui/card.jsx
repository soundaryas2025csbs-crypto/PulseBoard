import React from "react";
import { cn } from "../../lib/utils";

export function Card({ className = "", children }) {
  return <section className={cn("rounded-2xl border border-slate-100 bg-white shadow-[0_5px_24px_rgba(30,27,75,0.035)]", className)}>{children}</section>;
}
export function CardHeader({ className = "", children }) {
  return <div className={cn("flex items-start justify-between gap-3 px-5 pt-5", className)}>{children}</div>;
}
export function CardContent({ className = "", children }) {
  return <div className={cn("px-5 pb-5 pt-4", className)}>{children}</div>;
}