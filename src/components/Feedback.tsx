import React from 'react';
import { ScoringResult } from '../engine/scoring';
import { CaseDef } from '../data/cases';
import { antibiotics } from '../data/antibiotics';
import { ShieldCheck, ShieldAlert, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeedbackProps {
  score: ScoringResult;
  caseDef: CaseDef;
  onNext: () => void;
}

export function Feedback({ score, caseDef, onNext }: FeedbackProps) {

  const getBestRegimenStr = () => {
    return caseDef.bestRegimen.map(r => {
      const drugName = antibiotics.find(a => a.id === r.drug)?.displayName || r.drug;
      return `${drugName} ${r.dose} ${r.route} ${r.interval}`;
    }).join(" + ") + ` for ${caseDef.duration}`;
  };

  const getRatingColor = (val: number) => {
    if (val >= 4) return "text-green-400";
    if (val >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  const isPass = score.overall >= 3 && score.coverage >= 3 && score.safety >= 3;

  return (
    <div className="absolute inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8 flex flex-col max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center gap-4 border-b border-slate-800 pb-4 mb-6">
          {isPass ? (
             <div className="bg-green-500/20 p-4 rounded-full text-green-500"><ShieldCheck size={48} /></div>
          ) : (
             <div className="bg-red-500/20 p-4 rounded-full text-red-500"><ShieldAlert size={48} /></div>
          )}
          <div>
            <h2 className="text-3xl font-bold text-slate-100">{isPass ? "Mission Success" : "Mission Failed"}</h2>
            <div className="text-slate-400">Overall Score: {(score.overall * 20).toFixed(0)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm uppercase font-bold text-slate-500 mb-2">Detailed Evaluation</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Coverage</span>
                <span className={cn("font-bold", getRatingColor(score.coverage))}>{score.coverage}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Safety</span>
                <span className={cn("font-bold", getRatingColor(score.safety))}>{score.safety}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Stewardship</span>
                <span className={cn("font-bold", getRatingColor(score.stewardship))}>{score.stewardship}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Dose/Interval</span>
                <span className={cn("font-bold", getRatingColor(score.dosing))}>{score.dosing}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Time/Speed</span>
                <span className={cn("font-bold", getRatingColor(score.speed))}>{score.speed}/5</span>
              </div>
            </div>
          </div>

          <div>
             <h3 className="text-sm uppercase font-bold text-slate-500 mb-2">Best Practice</h3>
             <div className="p-3 bg-indigo-950 border border-indigo-800 rounded text-sm text-indigo-100 font-mono mb-4">
               {getBestRegimenStr()}
             </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded p-4 mb-8">
          <h3 className="text-sm uppercase font-bold text-slate-400 mb-2">Debriefing</h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-300 text-sm">
             {score.feedback.map((f, i) => (
                <li key={i} className={f.includes("Warning") || f.includes("Missing") ? "text-red-300" : ""}>{f}</li>
             ))}
          </ul>
        </div>

        <button 
          onClick={onNext}
          className="bg-slate-100 text-slate-900 font-bold py-3 rounded text-lg hover:bg-slate-300 transition-colors mt-auto"
        >
          {isPass ? "NEXT MISSION" : "RETRY MISSION"}
        </button>

      </div>
    </div>
  );
}
