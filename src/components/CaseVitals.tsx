import React from 'react';
import { CaseDef } from '../data/cases';
import { Activity, Wind, Thermometer, Box, Droplet } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface CaseVitalsProps {
  currentCase: CaseDef;
  timer: number;
  gameState: 'playing' | 'culture_drop' | 'culture_playing' | 'feedback';
}

export function CaseVitals({ currentCase, timer, gameState }: CaseVitalsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="bg-slate-900 rounded-xl p-5 shadow border border-slate-700 flex flex-col">
        <h2 className="text-xl font-bold text-slate-100 mb-2">CASE</h2>
        <div className="text-slate-300 flex-grow text-lg">
          {currentCase.summary}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-500 uppercase font-bold">Constraints & Risks</span>
          <div className="text-sm text-red-400 mt-1">
            {currentCase.constraints.length > 0 ? currentCase.constraints.join(", ") : "None identified"}
          </div>
        </div>
        <div className="mt-4 p-3 rounded border flex flex-col gap-1 transition-colors duration-500" style={{
            backgroundColor: gameState === 'culture_playing' ? '#1e3a8a30' : '#1e1b4b',
            borderColor: gameState === 'culture_playing' ? '#3b82f680' : '#3730a3'
        }}>
          <span className={cn("text-xs uppercase font-bold block", gameState === 'culture_playing' ? "text-blue-400" : "text-indigo-300")}>TASK</span>
          <span className={cn(gameState === 'culture_playing' ? "text-blue-100 font-bold" : "text-indigo-100")}>
            {gameState === 'culture_playing' 
              ? `${currentCase.syndrome} - DE-ESCALATE based on blood culture` 
              : `${currentCase.syndrome} - Start empiric therapy`}
          </span>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-5 shadow border border-slate-700 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex justify-between">
            VITALS
            <div className={cn(
              "text-lg",
              timer <= 15 ? "text-red-500" : timer <= 30 ? "text-yellow-500" : "text-slate-400"
            )}>
              {timer}s
            </div>
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Thermometer className={currentCase.vitals.temp > 38 ? "text-red-400" : "text-slate-400"} />
              <div>
                <div className="text-xs text-slate-500 uppercase">Temp</div>
                <div className={cn("text-lg font-mono", currentCase.vitals.temp > 38 && "text-red-400 font-bold")}>{currentCase.vitals.temp} &deg;C</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 60 / currentCase.vitals.hr }}
              >
                <Activity className={currentCase.vitals.hr > 100 ? "text-red-400" : "text-green-400"} />
              </motion.div>
              <div>
                <div className="text-xs text-slate-500 uppercase">HR</div>
                <div className={cn("text-lg font-mono", currentCase.vitals.hr > 100 && "text-red-400 font-bold")}>{currentCase.vitals.hr} bpm</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }} 
                transition={{ repeat: Infinity, duration: 60 / currentCase.vitals.rr }}
              >
                <Wind className={currentCase.vitals.rr > 20 ? "text-yellow-400" : "text-cyan-400"} />
              </motion.div>
              <div>
                <div className="text-xs text-slate-500 uppercase">RR</div>
                <div className={cn("text-lg font-mono", currentCase.vitals.rr > 20 && "text-yellow-400 font-bold")}>{currentCase.vitals.rr} /min</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Droplet className="text-red-500 opacity-80" />
              <div>
                <div className="text-xs text-slate-500 uppercase">BP</div>
                <div className="text-lg font-mono text-slate-200">{currentCase.vitals.bp}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-2">
               <Box className={currentCase.vitals.spo2 < 92 ? "text-yellow-400" : "text-blue-400"} />
               <div>
                  <div className="text-xs text-slate-500 uppercase">SpO2</div>
                  <div className={cn("text-lg font-mono", currentCase.vitals.spo2 < 92 && "text-yellow-400 font-bold")}>{currentCase.vitals.spo2}%</div>
               </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-2 rounded-full mt-6 overflow-hidden">
          <motion.div 
            className={cn("h-full", timer <= 15 ? "bg-red-500" : timer <= 30 ? "bg-yellow-500" : "bg-green-500")}
            initial={{ width: "100%" }}
            animate={{ width: `${(timer / 60) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
