import React from 'react';
import { Antibiotic } from '../data/antibiotics';
import { RegimenDetail } from '../data/cases';
import { tailwindColorMap } from './AntibioticShelf';
import { cn } from '../lib/utils';
import { Trash2 } from 'lucide-react';

interface LoadoutProps {
  loadout: RegimenDetail[];
  availableAntibiotics: Antibiotic[];
  onDrop: (drugId: string) => void;
  onUpdate: (index: number, detail: Partial<RegimenDetail>) => void;
  onRemove: (index: number) => void;
  duration: string;
  onDurationChange: (duration: string) => void;
  onSubmit: () => void;
}

export function Loadout({ loadout, availableAntibiotics, onDrop, onUpdate, onRemove, duration, onDurationChange, onSubmit }: LoadoutProps) {
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const drugId = e.dataTransfer.getData('text/plain');
    if (drugId) {
      onDrop(drugId);
    }
  };

  return (
    <div 
      className="bg-slate-800 rounded-xl p-4 shadow-lg border-2 border-dashed border-slate-600 h-full flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Loadout (Max 3)</h3>
        <span className="text-xs text-slate-500">Drag drugs here &rarr;</span>
      </div>

      <div className="flex-grow space-y-3">
        {loadout.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
            Empty Loadout. Select or drag antibiotics here.
          </div>
        ) : (
          loadout.map((item, idx) => {
            const drugDef = availableAntibiotics.find(a => a.id === item.drug);
            if (!drugDef) return null;

            return (
              <div key={idx} className="bg-slate-900 rounded p-3 border border-slate-700 relative">
                <button 
                  onClick={() => onRemove(idx)}
                  className="absolute top-2 right-2 text-slate-500 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn("w-3 h-3 rounded-full", tailwindColorMap[drugDef.classColor]?.split(' ')[0])} />
                  <span className="font-bold text-slate-200">{drugDef.displayName}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col">
                    <label className="text-[10px] text-slate-500 uppercase">Dose</label>
                    <select 
                      value={item.dose} 
                      onChange={(e) => onUpdate(idx, { dose: e.target.value })}
                      className="bg-slate-800 text-slate-200 text-sm rounded border border-slate-600 p-1"
                    >
                      <option value="" disabled>Select</option>
                      {drugDef.doses.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] text-slate-500 uppercase">Interval</label>
                    <select 
                      value={item.interval} 
                      onChange={(e) => onUpdate(idx, { interval: e.target.value })}
                      className="bg-slate-800 text-slate-200 text-sm rounded border border-slate-600 p-1"
                    >
                      <option value="" disabled>Select</option>
                      {drugDef.intervals.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] text-slate-500 uppercase">Route</label>
                    <div className="flex bg-slate-800 rounded border border-slate-600 overflow-hidden text-sm">
                      <button 
                        className={cn("flex-1 px-1 py-1", item.route === "IV" ? "bg-indigo-600 text-white" : "text-slate-400")}
                        onClick={() => drugDef.routes.includes("IV") && onUpdate(idx, { route: "IV" })}
                        disabled={!drugDef.routes.includes("IV")}
                      >
                        IV
                      </button>
                      <button 
                        className={cn("flex-1 px-1 py-1", item.route === "PO" ? "bg-indigo-600 text-white" : "text-slate-400")}
                        onClick={() => drugDef.routes.includes("PO") && onUpdate(idx, { route: "PO" })}
                        disabled={!drugDef.routes.includes("PO")}
                      >
                        PO
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-300">Duration:</label>
          <select 
            value={duration} 
            onChange={(e) => onDurationChange(e.target.value)}
            className="bg-slate-800 text-slate-200 text-sm rounded border border-slate-600 p-2 w-32"
          >
            <option value="" disabled>Select</option>
            <option value="1 dose">1 dose</option>
            <option value="3 days">3 days</option>
            <option value="5 days">5 days</option>
            <option value="7 days">7 days</option>
            <option value="10 days">10 days</option>
            <option value="14 days">14 days</option>
            <option value="4 weeks">4 weeks</option>
          </select>
        </div>
        <button 
          onClick={onSubmit}
          disabled={loadout.length === 0}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded text-lg tracking-wide transition-colors"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
