import React from 'react';
import { Antibiotic } from '../data/antibiotics';
import { cn } from '../lib/utils';
import { Pill, Activity, Syringe, TestTube } from 'lucide-react';

export const tailwindColorMap: Record<string, string> = {
  blue: "bg-blue-600 border-blue-800 text-white",
  teal: "bg-teal-600 border-teal-800 text-white",
  purple: "bg-purple-600 border-purple-800 text-white",
  red: "bg-red-600 border-red-800 text-white",
  orange: "bg-orange-500 border-orange-700 text-white",
  yellow: "bg-yellow-500 border-yellow-700 text-black",
  brown: "bg-amber-800 border-amber-950 text-white",
  green: "bg-green-600 border-green-800 text-white",
};

interface AntibioticShelfProps {
  antibiotics: Antibiotic[];
  onDragStart: (a: Antibiotic) => void;
  onTileClick: (a: Antibiotic) => void;
}

export function AntibioticShelf({ antibiotics, onDragStart, onTileClick }: AntibioticShelfProps) {
  // Group by class
  const grouped = antibiotics.reduce((acc, a) => {
    if (!acc[a.class]) acc[a.class] = [];
    acc[a.class].push(a);
    return acc;
  }, {} as Record<string, Antibiotic[]>);

  return (
    <div className="bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-700 h-full overflow-y-auto">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Antibiotic Shelf</h3>
      <div className="space-y-4">
        {Object.entries(grouped).map(([cls, drugs]) => (
          <div key={cls} className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase">{cls}</h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {drugs.map(drug => (
                <div
                  key={drug.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', drug.id);
                    onDragStart(drug);
                  }}
                  onClick={() => onTileClick(drug)}
                  className={cn(
                    "cursor-grab active:cursor-grabbing rounded flex flex-col p-2 shadow border-2 select-none hover:brightness-110 transition-all",
                    tailwindColorMap[drug.classColor] || "bg-slate-700 border-slate-900 text-white"
                  )}
                >
                  <div className="font-bold text-sm truncate">{drug.displayName}</div>
                  <div className="text-[10px] opacity-80 flex items-center gap-1 mt-1">
                    {drug.routes.includes("IV") ? <Syringe size={10} /> : <Pill size={10} />}
                    {cls}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
