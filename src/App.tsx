import React, { useState, useEffect } from 'react';
import { AntibioticShelf } from './components/AntibioticShelf';
import { Loadout } from './components/Loadout';
import { CaseVitals } from './components/CaseVitals';
import { BugTags } from './components/BugTags';
import { Feedback } from './components/Feedback';
import { CultureDrop } from './components/CultureDrop';

import { antibiotics, Antibiotic } from './data/antibiotics';
import { cases, CaseDef, RegimenDetail } from './data/cases';
import { evaluateLoadout, ScoringResult } from './engine/scoring';

export default function App() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'culture_drop' | 'culture_playing' | 'feedback'>('playing');
  
  const [loadout, setLoadout] = useState<RegimenDetail[]>([]);
  const [duration, setDuration] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [score, setScore] = useState<ScoringResult | null>(null);

  const currentCase = cases[currentCaseIndex];

  // Timer logic
  useEffect(() => {
    if ((gameState === 'playing' || gameState === 'culture_playing') && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameState]);

  const handleDropDrug = (drugId: string) => {
    if (loadout.length >= 3) return;
    if (loadout.some(l => l.drug === drugId)) return; // No dupes
    
    const drugInfo = antibiotics.find(a => a.id === drugId);
    if (!drugInfo) return;

    setLoadout(prev => [...prev, {
      drug: drugId,
      dose: drugInfo.doses[0],
      interval: drugInfo.intervals[0],
      route: drugInfo.routes.includes("IV") ? "IV" : "PO",
    }]);
  };

  const handleUpdateDrug = (index: number, updates: Partial<RegimenDetail>) => {
    setLoadout(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
  };

  const handleRemoveDrug = (index: number) => {
    setLoadout(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const timeTaken = 60 - timeLeft;
    
    // Check if we need to show culture drop
    if (gameState === 'playing' && currentCase.cultureDrop && currentCase.cultureDrop.time === 'post_submit') {
      setGameState('culture_drop');
      return;
    }

    const isDeescalation = gameState === 'culture_playing';
    const calculatedScore = evaluateLoadout(loadout, currentCase, timeTaken, isDeescalation);
    setScore(calculatedScore);
    setGameState('feedback');
  };

  const handleCultureAcknowledge = () => {
    setGameState('culture_playing');
    setTimeLeft(30); // Bonus 30 seconds for de-escalation
  };

  const handleNextCase = () => {
    if (score?.overall && score.overall >= 0.6) { // simplistic pass condition ~ 3/5 avg
      const nextIdx = (currentCaseIndex + 1) % cases.length;
      setCurrentCaseIndex(nextIdx);
    }
    // reset for next or retry
    setLoadout([]);
    setDuration('');
    setTimeLeft(60);
    setScore(null);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-y-auto font-sans pt-4 pb-4 px-4 lg:px-8 flex flex-col mx-auto max-w-7xl">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div>
           <h1 className="text-2xl font-black text-white tracking-widest uppercase">Antibiotic Armory</h1>
           <p className="text-slate-400 text-sm">Targeted Therapy Training Simulator</p>
        </div>
        <div className="text-right">
           <div className="text-indigo-400 font-bold uppercase text-sm tracking-wider">Mission {currentCaseIndex + 1}</div>
           <div className="text-slate-500 text-xs">{cases.length - currentCaseIndex - 1} remaining</div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 lg:h-[calc(100vh-100px)] h-auto">
        
        {/* Left Column: Vitals, Bugs, Shelf */}
        <div className="lg:col-span-8 flex flex-col gap-4 h-full">
          <div className="shrink-0">
            <CaseVitals currentCase={currentCase} timer={timeLeft} gameState={gameState} />
          </div>
          
          <div className="shrink-0">
            <BugTags likelyBugs={gameState === 'culture_playing' && currentCase.cultureDrop ? [currentCase.cultureDrop.organism] : currentCase.likelyBugs} />
          </div>

          <div className="flex-grow min-h-0">
            <AntibioticShelf 
              antibiotics={antibiotics} 
              onDragStart={(a) => {}}
              onTileClick={(a) => handleDropDrug(a.id)}
            />
          </div>
        </div>

        {/* Right Column: Loadout */}
        <div className="lg:col-span-4 h-full min-h-0">
          <Loadout 
            loadout={loadout}
            availableAntibiotics={antibiotics}
            onDrop={handleDropDrug}
            onUpdate={handleUpdateDrug}
            onRemove={handleRemoveDrug}
            duration={duration}
            onDurationChange={setDuration}
            onSubmit={handleSubmit}
          />
        </div>

      </div>

      {gameState === 'culture_drop' && (
        <CultureDrop caseDef={currentCase} onAcknowledge={handleCultureAcknowledge} />
      )}

      {gameState === 'feedback' && score && (
        <Feedback score={score} caseDef={currentCase} onNext={handleNextCase} />
      )}

    </div>
  );
}
