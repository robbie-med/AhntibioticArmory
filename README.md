# Antibiotic Armory

A timed clinical decision-making simulator for antibiotic prescribing. Players are presented with real inpatient and outpatient infectious disease scenarios, select antibiotics from a drag-and-drop shelf, and receive scored feedback on coverage, safety, stewardship, dosing, and speed.

Built with React, Vite, TypeScript, and Tailwind CSS. No backend required.

---

## Quick Start

**Prerequisites:** Node.js ≥ 18

```bash
npm install
npm run dev        # runs on http://localhost:3000
npm run build      # production build
```

---

## How to Add a New Antibiotic

Edit `src/data/antibiotics.ts`. Each entry follows this shape:

```ts
{
  id: "drug-id",              // used in cases + scoring engine — no spaces
  displayName: "Drug Name",
  class: "Class Name",        // groups drugs visually on the shelf
  classColor: "teal",         // tailwind color: blue | teal | purple | red | orange | yellow | green | brown
  routes: ["IV", "PO"],
  doses: ["1 g", "500 mg"],   // first entry is the default
  intervals: ["q8h", "q12h"], // first entry is the default
  coverage: [                 // plain-English strings matched against bug displayNames
    "Strep pneumo",
    "E. coli",
    "MRSA"
  ],
  misses: ["Pseudomonas"],    // shown as warnings in feedback
  flags: ["QTc", "nephrotox"],// "QTc" triggers safety scoring when case has a QTc constraint
  renalAdjust: true,          // shown as a dosing reminder badge
}
```

**Coverage matching** is fuzzy: `"H flu"` matches the bug `H. influenzae` because one string contains the other. Keep coverage strings close to bug `displayName` values to avoid mismatches.

---

## How to Add a New Bug / Pathogen

Edit `src/data/bugs.ts`. Each entry is keyed by a slug used in `cases.likelyBugs`:

```ts
"bug_id": {
  id: "bug_id",
  displayName: "Bug Display Name",   // matched against antibiotic coverage strings
  gram: "Gram Positive Cocci",
  sites: ["UTI", "Bacteremia"],
  preferredClasses: ["Cephalosporins"],
  preferredColor: "teal",
  usualFirstLine: ["cefazolin"],      // drug IDs
  avoidIfAlternatives: ["vancomycin"],
  teaching: "One-sentence pearl shown in feedback.",
}
```

Once added, reference the slug in any case's `likelyBugs` array.

---

## How to Add a New Case (Mission)

Edit `src/data/cases.ts`. Each case follows this shape:

```ts
{
  id: "unique_id",
  syndrome: "Displayed Syndrome Name",
  summary: "Patient vignette shown during gameplay.",
  vitals: { temp: 38.5, hr: 110, rr: 22, bp: "110/70", spo2: 94 },
  constraints: [
    // Free-text strings displayed to the player.
    // Any string containing "QTc" triggers safety scoring for QT-prolonging drugs.
    "QTc 510",
    "Penicillin allergy (anaphylaxis)",
  ],
  likelyBugs: ["e_coli", "pseudomonas"],  // bug IDs from bugs.ts
  severity: "inpatient_ward",              // "outpatient" | "inpatient_ward" | "inpatient_nonICU" | "inpatient" | "icu"
  bestRegimen: [
    { drug: "ceftriaxone", dose: "1 g", route: "IV", interval: "q24h" },
  ],
  duration: "7 days",

  // Optional: reveals culture results after the player submits
  cultureDrop: {
    time: "post_submit",
    organism: "e_coli",            // bug ID — shown on the culture card
    organismColor: "teal",
    susceptibilities: {
      ceftriaxone: "S",
      ciprofloxacin: "S",
      "tmp-smx": "R",
      meropenem: "S",
    },
    bestDeescalation: "ciprofloxacin",  // drug ID — scoring rewards choosing this
  },
}
```

### Scoring dimensions

| Dimension | What affects it |
|-----------|----------------|
| **Coverage** | Player's drugs must cover every bug in `likelyBugs` |
| **Safety** | Using a `flags: ["QTc"]` drug when the case has a QTc constraint deducts points |
| **Stewardship** | Meropenem, cefepime, or pip-tazo are penalised unless `pseudomonas` is a likely bug or severity is `"icu"` |
| **Dosing** | Player's dose + interval must match `bestRegimen` for each drug they select |
| **Speed** | Submitting in under 30 s is optimal; > 45 s loses points |

---

## Adapting to Other Pathologies

The engine is pathology-agnostic — the same data-driven game loop works for any clinical decision domain. To repurpose it:

### Antifungal Armory
- Replace `antibiotics.ts` with azoles, echinocandins, polyenes, flucytosine, etc.
- Replace `bugs.ts` with: `candida_albicans`, `candida_auris`, `aspergillus`, `cryptococcus`, `mucor`
- Cases: candidemia in ICU, invasive aspergillosis post-transplant, cryptococcal meningitis, PJP prophylaxis selection

### Antiviral Armory
- Drugs: acyclovir, valacyclovir, ganciclovir, oseltamivir, remdesivir, nirmatrelvir-ritonavir
- Bugs: HSV, CMV, VZV, influenza A/B, SARS-CoV-2, RSV
- Cases: HSV encephalitis, CMV retinitis in transplant, severe influenza, COVID-19 treatment eligibility

### Antimycobacterial / TB Armory
- Drugs: isoniazid, rifampin, pyrazinamide, ethambutol, linezolid, bedaquiline
- Bugs: M. tuberculosis (susceptible), MDR-TB, XDR-TB, MAI
- Cases: pulmonary TB initiation, LTBI treatment, MDR-TB regimen selection

### Critical Care / Vasopressor Armory
- Agents: norepinephrine, vasopressin, epinephrine, phenylephrine, dobutamine, milrinone
- Targets: distributive shock, cardiogenic shock, obstructive shock, neurogenic shock
- Cases: septic shock first-line agent, cardiogenic shock with hypotension, PE with RV failure

### To fork for a new domain:
1. Replace `src/data/antibiotics.ts` with your agents (keep the `Antibiotic` type or rename it)
2. Replace `src/data/bugs.ts` with your targets/pathogens
3. Rewrite `src/data/cases.ts` with domain-specific scenarios
4. Update `src/engine/scoring.ts` if your stewardship rules differ
5. Update display text in `src/components/AntibioticShelf.tsx` and `src/components/BugTags.tsx` as needed

The React components, game loop, timer, culture-drop mechanic, and scoring display require no changes for a basic port.

---

## Project Structure

```
src/
  data/
    antibiotics.ts   — drug library
    bugs.ts          — pathogen library
    cases.ts         — mission definitions (30 included)
  engine/
    scoring.ts       — coverage, safety, stewardship, dosing, and speed logic
  components/
    AntibioticShelf  — drag-and-drop drug picker
    Loadout          — selected regimen builder
    CaseVitals       — patient card + countdown timer
    BugTags          — likely organism badges
    CultureDrop      — culture result reveal overlay
    Feedback         — post-submission score breakdown
  App.tsx            — game state machine
```
