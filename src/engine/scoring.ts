import { Antibiotic, antibiotics } from "../data/antibiotics";
import { CaseDef, RegimenDetail } from "../data/cases";
import { bugs } from "../data/bugs";

export type ScoringResult = {
  coverage: number;
  safety: number;
  stewardship: number;
  dosing: number;
  speed: number;
  overall: number;
  feedback: string[];
};

export function evaluateLoadout(
  loadout: RegimenDetail[],
  caseDef: CaseDef,
  timeTakenSec: number,
  isDeescalation: boolean = false
): ScoringResult {
  let coverageScore = 5;
  let safetyScore = 5;
  let stewardshipScore = 5;
  let dosingScore = 5;
  let speedScore = 5;
  const feedback: string[] = [];

  const loadoutDrugs = loadout.map((item) => antibiotics.find((a) => a.id === item.drug)).filter(Boolean) as Antibiotic[];

  // 1. Coverage (Activity)
  const coveredBugs = new Set<string>();
  loadoutDrugs.forEach((drug) => {
    drug.coverage.forEach((bugStr) => {
      // Map bug strings to IDs if possible, or just string match
      const matchedBugEntry = Object.entries(bugs).find(([id, bugDef]) =>
        bugStr.toLowerCase().includes(bugDef.displayName.toLowerCase()) || 
        bugDef.displayName.toLowerCase().includes(bugStr.toLowerCase()) ||
        id === bugStr
      );
      if (matchedBugEntry) {
        coveredBugs.add(matchedBugEntry[0]);
      } else {
        // Just add string
        coveredBugs.add(bugStr);
      }
    });

    // Special logic for class names
    if (drug.class === "Carbapenems" || drug.class === "Penicillins" && drug.flags.includes("broad-spectrum")) {
      coveredBugs.add("pseudomonas");
    }
  });

  const targetBugs = isDeescalation && caseDef.cultureDrop ? [caseDef.cultureDrop.organism] : caseDef.likelyBugs;

  const missingBugs = targetBugs.filter((likelyBug) => !Array.from(coveredBugs).some((cb) => cb.toLowerCase() === likelyBug.toLowerCase() || cb.includes(bugs[likelyBug]?.displayName)));

  if (loadout.length === 0) {
    coverageScore = 0;
    feedback.push("No antibiotics selected.");
  } else if (missingBugs.length > 0) {
    coverageScore -= missingBugs.length * 2;
    feedback.push(`Missing coverage for: ${missingBugs.map((b) => bugs[b]?.displayName || b).join(", ")}`);
  } else {
    feedback.push(isDeescalation ? "Coverage is active against culture isolates." : "Good empiric coverage for likely pathogens.");
  }

  // Check susceptibilities if deescalation
  if (isDeescalation && caseDef.cultureDrop) {
    loadoutDrugs.forEach(drug => {
      const cultureSusc = caseDef.cultureDrop!.susceptibilities[drug.id] || caseDef.cultureDrop!.susceptibilities[drug.displayName.toLowerCase()];
      if (cultureSusc === "R") {
        coverageScore -= 5;
        feedback.push(`CRITICAL FAIL: ${drug.displayName} is resistant!`);
      }
    });
  }

  // 2. Safety
  let hasQtRisk = false;
  loadoutDrugs.forEach((drug) => {
    if (drug.flags.includes("QTc") && caseDef.constraints.some((c) => c.includes("QTc"))) {
      hasQtRisk = true;
    }
  });

  if (hasQtRisk) {
    safetyScore -= 3;
    feedback.push("Safety Warning: Used QT-prolonging agent in a patient with prolonged QTc.");
  }

  // 3. Stewardship
  const actsBroadly = loadoutDrugs.some((d) => d.displayName === "Meropenem" || d.displayName === "Cefepime" || d.displayName === "Pip-Tazo");
  const needsBroad = targetBugs.includes("pseudomonas") || (!isDeescalation && caseDef.severity === "icu");

  // Deescalation specifically seeks the narrowest targeted therapy
  if (isDeescalation && caseDef.cultureDrop) {
     const betterDeesDrug = caseDef.cultureDrop.bestDeescalation;
     if (!loadoutDrugs.some(d => d.id === betterDeesDrug)) {
        stewardshipScore -= 2;
        feedback.push(`Stewardship Warning: Could have de-escalated to narrower option like ${antibiotics.find(a => a.id === betterDeesDrug)?.displayName}.`);
     }
  } else {
     if (actsBroadly && !needsBroad) {
       stewardshipScore -= 2;
       feedback.push("Stewardship Warning: Overly broad therapy when narrower options exist.");
     }
  }

  // 4. Dosing / Regimen
  // Simple check: did they match any of the best regimens?
  const bestIds = caseDef.bestRegimen.map((r) => r.drug);
  const userIds = loadout.map((r) => r.drug);

  let perfectDoseMatch = true;
  loadout.forEach((item) => {
    const bestMatch = caseDef.bestRegimen.find((r) => r.drug === item.drug);
    if (bestMatch && (item.dose !== bestMatch.dose || item.interval !== bestMatch.interval)) {
      perfectDoseMatch = false;
    }
  });

  // Just generic checking for MVP
  if (!perfectDoseMatch) {
    dosingScore -= 1;
    feedback.push("Dosing/Interval is sub-optimal for the indication.");
  }

  // 5. Speed
  if (timeTakenSec > 45) {
    speedScore -= 2;
  } else if (timeTakenSec > 30) {
    speedScore -= 1;
  }

  // Bounds
  coverageScore = Math.max(0, coverageScore);
  safetyScore = Math.max(0, safetyScore);
  stewardshipScore = Math.max(0, stewardshipScore);
  dosingScore = Math.max(0, dosingScore);
  speedScore = Math.max(0, speedScore);

  const overall = (coverageScore + safetyScore + stewardshipScore + dosingScore + speedScore) / 5;

  return { coverage: coverageScore, safety: safetyScore, stewardship: stewardshipScore, dosing: dosingScore, speed: speedScore, overall, feedback };
}
