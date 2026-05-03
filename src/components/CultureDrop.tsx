import React, { useState } from 'react';
import { CaseDef } from '../data/cases';
import { Search, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Antibiotic, antibiotics } from '../data/antibiotics';

interface CultureDropProps {
  caseDef: CaseDef;
  onAcknowledge: () => void;
}

export function CultureDrop({ caseDef, onAcknowledge }: CultureDropProps) {
  const cd = caseDef.cultureDrop;
  if (!cd) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-xl w-full p-8 flex flex-col -mt-20">
        
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
                 <Search size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-100 uppercase tracking-wider">Culture Update</h2>
           </div>
           <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <AlertTriangle size={14} /> New Intel
           </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 font-mono text-sm">
           <div className="text-slate-400 mb-1 flex justify-between">
              <span>Source: Blood</span>
              <span>24 hours ago</span>
           </div>
           <div className="text-slate-200 text-lg mb-4">
              Growth: <span className="font-bold text-red-400">{cd.organism.replace('_', ' ').toUpperCase()}</span>
           </div>
           
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-slate-800">
                    <th className="py-2 text-slate-500 uppercase font-bold text-xs">Antibiotic</th>
                    <th className="py-2 text-slate-500 uppercase font-bold text-xs text-right">Result</th>
                 </tr>
              </thead>
              <tbody>
                 {Object.entries(cd.susceptibilities).map(([drugId, result]) => {
                    const drugName = antibiotics.find(a => a.id === drugId)?.displayName || drugId;
                    return (
                      <tr key={drugId} className="border-b border-slate-800/50">
                         <td className="py-2 text-slate-300">{drugName}</td>
                         <td className={cn(
                            "py-2 font-bold text-right",
                            result === 'S' ? 'text-green-400' : result === 'R' ? 'text-red-400' : 'text-yellow-400'
                         )}>
                            {result}
                         </td>
                      </tr>
                    );
                 })}
              </tbody>
           </table>
        </div>

        <div className="bg-indigo-950/50 border border-indigo-900/50 rounded-xl p-4 mb-8">
           <h3 className="text-xs uppercase font-bold text-indigo-400 mb-1">New Objective</h3>
           <p className="text-slate-200">De-escalate current therapy based on susceptibilities.</p>
        </div>

        <button 
          onClick={onAcknowledge}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded text-lg tracking-wide transition-colors w-full"
        >
          ADJUST LOADOUT
        </button>

      </div>
    </div>
  );
}
