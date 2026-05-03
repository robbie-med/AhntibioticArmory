import React from 'react';
import { bugs } from '../data/bugs';
import { tailwindColorMap } from './AntibioticShelf';
import { cn } from '../lib/utils';
import { Bug } from 'lucide-react';

interface BugTagsProps {
  likelyBugs: string[];
}

export function BugTags({ likelyBugs }: BugTagsProps) {
  return (
    <div className="bg-slate-900 rounded-xl p-3 shadow border border-slate-700 flex flex-wrap items-center gap-3">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Likely Bugs</span>
      {likelyBugs.map((bugId) => {
        const bug = bugs[bugId] || { displayName: bugId, preferredColor: "blue" };
        
        return (
          <div 
            key={bugId}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border",
              "bg-slate-800",
              bug.preferredColor === "blue" ? "text-blue-400 border-blue-500/50" :
              bug.preferredColor === "teal" ? "text-teal-400 border-teal-500/50" :
              bug.preferredColor === "purple" ? "text-purple-400 border-purple-500/50" :
              bug.preferredColor === "red" ? "text-red-400 border-red-500/50" :
              bug.preferredColor === "orange" ? "text-orange-400 border-orange-500/50" :
              bug.preferredColor === "yellow" ? "text-yellow-400 border-yellow-500/50" :
              bug.preferredColor === "brown" ? "text-amber-500 border-amber-600/50" :
              bug.preferredColor === "green" ? "text-green-400 border-green-500/50" :
              "text-slate-400 border-slate-500/50"
            )}
          >
            <Bug size={14} className="opacity-70" />
            <span>{bug.displayName || bugId}</span>
          </div>
        );
      })}
    </div>
  );
}
