export type RegimenDetail = {
  drug: string;
  dose?: string;
  route?: string;
  interval?: string;
};

export type CaseDef = {
  id: string;
  syndrome: string;
  summary: string;
  vitals: { temp: number; hr: number; rr: number; bp: string; spo2: number };
  constraints: string[];
  likelyBugs: string[];
  severity: string;
  bestRegimen: RegimenDetail[];
  duration: string;
  cultureDrop?: {
    time: "post_submit" | "mid_timer";
    organism: string;
    organismColor: string;
    susceptibilities: Record<string, "S" | "R" | "I">;
    bestDeescalation: string;
  };
};

export const cases: CaseDef[] = [

  // ── OUTPATIENT ────────────────────────────────────────────────────────────

  {
    id: "cap_op_01",
    syndrome: "Outpatient CAP",
    summary: "24F, previously healthy, 3-day dry cough, low-grade fever, fatigue. Faint LLL infiltrate on CXR. SpO2 98%. CURB-65: 0. Tolerating PO. No comorbidities.",
    vitals: { temp: 37.9, hr: 88, rr: 18, bp: "118/72", spo2: 98 },
    constraints: [],
    likelyBugs: ["atypicals"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "doxycycline", dose: "100 mg", route: "PO", interval: "BID" }
    ],
    duration: "5 days"
  },

  {
    id: "cap_op_02",
    syndrome: "Outpatient CAP (Comorbidities)",
    summary: "71M with COPD and T2DM, 4-day productive cough and fever. RLL infiltrate on CXR. SpO2 93% (baseline 94%). CURB-65: 1. Tolerating PO, declines hospitalization.",
    vitals: { temp: 38.3, hr: 96, rr: 20, bp: "132/78", spo2: 93 },
    constraints: [],
    likelyBugs: ["strep_pneumo", "h_flu", "atypicals"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "levofloxacin", dose: "750 mg", route: "PO", interval: "daily" }
    ],
    duration: "5 days"
  },

  {
    id: "cystitis_01",
    syndrome: "Uncomplicated Cystitis",
    summary: "26F, no medical history, 2-day dysuria and frequency. No fever or flank pain. UA: nitrites+, pyuria. Not pregnant. CrCl > 60.",
    vitals: { temp: 37.0, hr: 74, rr: 14, bp: "116/70", spo2: 99 },
    constraints: [],
    likelyBugs: ["e_coli"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "nitrofurantoin", dose: "100 mg", route: "PO", interval: "BID" }
    ],
    duration: "5 days"
  },

  {
    id: "cystitis_02",
    syndrome: "Uncomplicated Cystitis",
    summary: "48M, no medical history, 1-day dysuria and frequency. No fever, no flank pain. UA positive. No sulfa allergy. Local TMP-SMX resistance < 20%.",
    vitals: { temp: 37.1, hr: 72, rr: 14, bp: "124/76", spo2: 99 },
    constraints: [],
    likelyBugs: ["e_coli"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "tmp-smx", dose: "1 DS tab", route: "PO", interval: "BID" }
    ],
    duration: "3 days"
  },

  {
    id: "cellulitis_op_01",
    syndrome: "Non-Purulent Cellulitis",
    summary: "41F, spreading erythema, warmth, and tenderness of the right lower leg after a minor abrasion. No fluctuance. Low-grade fever. Ambulatory. No diabetes.",
    vitals: { temp: 38.0, hr: 88, rr: 16, bp: "122/74", spo2: 99 },
    constraints: [],
    likelyBugs: ["mssa"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "cephalexin", dose: "500 mg", route: "PO", interval: "QID" }
    ],
    duration: "5 days"
  },

  {
    id: "ssti_camrsa_01",
    syndrome: "Purulent SSTI / CA-MRSA",
    summary: "19M, competitive athlete, large furuncle on the right thigh. I&D performed in clinic. Surrounding cellulitis > 2 cm, febrile. No prior hospitalization or known MRSA.",
    vitals: { temp: 38.1, hr: 90, rr: 16, bp: "120/76", spo2: 99 },
    constraints: [],
    likelyBugs: ["mrsa"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "tmp-smx", dose: "2 DS tabs", route: "PO", interval: "BID" }
    ],
    duration: "7 days"
  },

  {
    id: "pharyngitis_01",
    syndrome: "Strep Pharyngitis",
    summary: "17M, sore throat x 3 days, fever, tonsillar exudates. Positive rapid Strep test. No penicillin allergy. No prior rheumatic fever.",
    vitals: { temp: 38.5, hr: 92, rr: 16, bp: "114/68", spo2: 99 },
    constraints: [],
    likelyBugs: ["strep_pneumo"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "amoxicillin", dose: "500 mg", route: "PO", interval: "TID" }
    ],
    duration: "10 days"
  },

  {
    id: "aecb_01",
    syndrome: "AECB",
    summary: "63M with moderate COPD, 3-day increase in dyspnea and purulent sputum. No infiltrate on CXR. SpO2 91% (baseline 92%). Tolerating PO. No recent antibiotics.",
    vitals: { temp: 37.8, hr: 92, rr: 22, bp: "138/82", spo2: 91 },
    constraints: [],
    likelyBugs: ["h_flu", "atypicals"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "azithromycin", dose: "500 mg", route: "PO", interval: "daily" }
    ],
    duration: "5 days"
  },

  {
    id: "prostatitis_01",
    syndrome: "Acute Bacterial Prostatitis",
    summary: "47M, sudden fever, chills, perineal pain, dysuria, and urinary hesitancy. Boggy tender prostate on DRE. No recent urologic procedure. UA positive.",
    vitals: { temp: 38.8, hr: 104, rr: 18, bp: "126/80", spo2: 99 },
    constraints: [],
    likelyBugs: ["e_coli"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "levofloxacin", dose: "500 mg", route: "PO", interval: "daily" }
    ],
    duration: "4 weeks"
  },

  {
    id: "pyelo_op_01",
    syndrome: "Outpatient Pyelonephritis",
    summary: "33F, 3-day right flank pain, fever, and dysuria. Tolerating PO fluids well. SpO2 99%. No recent antibiotics or hospitalizations. No structural urologic abnormality.",
    vitals: { temp: 38.7, hr: 100, rr: 18, bp: "112/68", spo2: 99 },
    constraints: [],
    likelyBugs: ["e_coli"],
    severity: "outpatient",
    bestRegimen: [
      { drug: "ciprofloxacin", dose: "500 mg (PO)", route: "PO", interval: "BID" }
    ],
    duration: "7 days"
  },

  // ── INPATIENT WARD ────────────────────────────────────────────────────────

  {
    id: "cap_ip_qtc",
    syndrome: "CAP (Prolonged QTc)",
    summary: "58M with HTN and T2DM admitted for RLL pneumonia. CURB-65: 2. Baseline QTc 510 ms on ECG. Azithromycin and fluoroquinolones are contraindicated. SpO2 92%.",
    vitals: { temp: 38.5, hr: 108, rr: 22, bp: "142/88", spo2: 92 },
    constraints: ["QTc 510"],
    likelyBugs: ["strep_pneumo", "h_flu", "atypicals"],
    severity: "inpatient_nonICU",
    bestRegimen: [
      { drug: "ceftriaxone", dose: "1 g", route: "IV", interval: "q24h" },
      { drug: "doxycycline", dose: "100 mg", route: "IV", interval: "BID" }
    ],
    duration: "5 days"
  },

  {
    id: "cap_ip_pcn",
    syndrome: "CAP (Penicillin Anaphylaxis)",
    summary: "53F admitted for LLL pneumonia, CURB-65 of 2. Prior anaphylaxis to amoxicillin (tongue swelling, hypotension). SpO2 91%.",
    vitals: { temp: 38.7, hr: 110, rr: 22, bp: "116/74", spo2: 91 },
    constraints: ["Penicillin allergy (anaphylaxis)"],
    likelyBugs: ["strep_pneumo", "h_flu", "atypicals"],
    severity: "inpatient_nonICU",
    bestRegimen: [
      { drug: "levofloxacin", dose: "750 mg", route: "IV", interval: "daily" }
    ],
    duration: "5 days"
  },

  {
    id: "asp_pna_01",
    syndrome: "Aspiration Pneumonia",
    summary: "74F with prior stroke and dysphagia, witnessed aspiration event 12 hours ago. Febrile, RLL consolidation. Foul-smelling secretions. Nursing home resident. No MRSA or Pseudomonas risk.",
    vitals: { temp: 38.6, hr: 102, rr: 24, bp: "122/74", spo2: 93 },
    constraints: [],
    likelyBugs: ["anaerobes", "strep_pneumo"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "ampicillin-sulbactam", dose: "3 g", route: "IV", interval: "q6h" }
    ],
    duration: "7 days"
  },

  {
    id: "pyelo_ip_01",
    syndrome: "Pyelonephritis (Culture Pending)",
    summary: "29F, 2-day fever, chills, right flank pain, nausea and vomiting. Unable to tolerate PO. UA: pyuria, nitrites+. Blood cultures drawn. No recent antibiotics.",
    vitals: { temp: 39.2, hr: 108, rr: 20, bp: "108/64", spo2: 98 },
    constraints: [],
    likelyBugs: ["e_coli"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "ceftriaxone", dose: "1 g", route: "IV", interval: "q24h" }
    ],
    duration: "7 days",
    cultureDrop: {
      time: "post_submit",
      organism: "e_coli",
      organismColor: "teal",
      susceptibilities: {
        ceftriaxone: "S",
        ciprofloxacin: "S",
        "tmp-smx": "S",
        nitrofurantoin: "S",
        meropenem: "S"
      },
      bestDeescalation: "ciprofloxacin"
    }
  },

  {
    id: "urosepsis_pseudo_01",
    syndrome: "Urosepsis (Pseudomonas Risk)",
    summary: "78M with BPH and recurrent UTIs, hospitalized twice in the past 3 months. Now septic: fever, hypotension, altered mental status. UA pyuria. Recent healthcare exposure raises MDR risk.",
    vitals: { temp: 39.4, hr: 122, rr: 26, bp: "90/56", spo2: 94 },
    constraints: [],
    likelyBugs: ["e_coli", "pseudomonas"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "cefepime", dose: "1 g", route: "IV", interval: "q12h" }
    ],
    duration: "7 days"
  },

  {
    id: "esbl_01",
    syndrome: "ESBL E. coli Bacteremia",
    summary: "66F returning from extended travel in South Asia, presents with fever and bacteremia. Blood cultures growing GNR pan-resistant to cephalosporins and fluoroquinolones. ESBL-producing E. coli confirmed.",
    vitals: { temp: 39.1, hr: 116, rr: 22, bp: "100/62", spo2: 97 },
    constraints: ["ESBL organism — ceftriaxone R, ciprofloxacin R, TMP-SMX R"],
    likelyBugs: ["e_coli"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "meropenem", dose: "1 g", route: "IV", interval: "q8h" }
    ],
    duration: "7 days"
  },

  {
    id: "cellulitis_ip_01",
    syndrome: "Severe Non-Purulent Cellulitis",
    summary: "58M with T2DM, rapidly spreading left lower extremity cellulitis. Brisk demarcation, warm, no abscess. Febrile with SIRS. No recent hospitalization. No penicillin allergy.",
    vitals: { temp: 38.4, hr: 104, rr: 18, bp: "128/80", spo2: 98 },
    constraints: [],
    likelyBugs: ["mssa"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "cefazolin", dose: "2 g", route: "IV", interval: "q8h" }
    ],
    duration: "5 days"
  },

  {
    id: "mrsa_ssti_ip",
    syndrome: "Systemic MRSA SSTI",
    summary: "46M with IVDU, large fluctuant abscess on the right arm. Cellulitis extending > 10 cm, febrile and tachycardic. Known prior MRSA. History of anaphylaxis to penicillin.",
    vitals: { temp: 38.8, hr: 114, rr: 20, bp: "108/66", spo2: 97 },
    constraints: ["Penicillin allergy (anaphylaxis)"],
    likelyBugs: ["mrsa", "mssa"],
    severity: "inpatient",
    bestRegimen: [
      { drug: "vancomycin", dose: "15 mg/kg", route: "IV", interval: "q12h" }
    ],
    duration: "7 days"
  },

  {
    id: "iaa_01",
    syndrome: "Intra-Abdominal Infection",
    summary: "31M, post-laparoscopic appendectomy for perforated appendicitis. Post-op day 2, febrile, elevated WBC. Drain culture pending. Hemodynamically stable.",
    vitals: { temp: 38.3, hr: 96, rr: 18, bp: "124/76", spo2: 98 },
    constraints: [],
    likelyBugs: ["e_coli", "anaerobes"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "ceftriaxone", dose: "1 g", route: "IV", interval: "q24h" },
      { drug: "metronidazole", dose: "500 mg", route: "IV", interval: "q8h" }
    ],
    duration: "4 days"
  },

  {
    id: "septic_joint_01",
    syndrome: "Septic Arthritis",
    summary: "62M, acute right knee monoarthritis. Arthrocentesis: 78,000 WBCs, Gram stain positive for Gram-positive cocci in clusters. No MRSA risk factors. No penicillin allergy.",
    vitals: { temp: 38.5, hr: 100, rr: 18, bp: "132/82", spo2: 99 },
    constraints: [],
    likelyBugs: ["mssa"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "cefazolin", dose: "2 g", route: "IV", interval: "q8h" }
    ],
    duration: "14 days"
  },

  {
    id: "meningitis_01",
    syndrome: "Bacterial Meningitis",
    summary: "22M, college student, acute severe headache, neck stiffness, photophobia, and fever. LP: 2400 WBCs (>90% PMNs), low glucose, high protein. Gram stain: Gram-positive diplococci.",
    vitals: { temp: 39.8, hr: 118, rr: 24, bp: "128/80", spo2: 99 },
    constraints: [],
    likelyBugs: ["strep_pneumo", "h_flu"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "ceftriaxone", dose: "2 g", route: "IV", interval: "q12h" },
      { drug: "vancomycin", dose: "15 mg/kg", route: "IV", interval: "q12h" }
    ],
    duration: "14 days"
  },

  {
    id: "mssa_bact_01",
    syndrome: "Bacteremia (Unknown Source)",
    summary: "54M with IVDU presents with fever, chills, and malaise x 3 days. Blood cultures drawn. Empiric therapy started pending results. No prior MRSA. Central line removed.",
    vitals: { temp: 39.0, hr: 112, rr: 20, bp: "106/68", spo2: 98 },
    constraints: [],
    likelyBugs: ["mssa", "mrsa"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "vancomycin", dose: "15 mg/kg", route: "IV", interval: "q12h" }
    ],
    duration: "14 days",
    cultureDrop: {
      time: "post_submit",
      organism: "mssa",
      organismColor: "teal",
      susceptibilities: {
        vancomycin: "S",
        cefazolin: "S",
        cefepime: "S",
        meropenem: "S",
        "tmp-smx": "S"
      },
      bestDeescalation: "cefazolin"
    }
  },

  {
    id: "sbp_01",
    syndrome: "Spontaneous Bacterial Peritonitis",
    summary: "58M with decompensated cirrhosis admitted for worsening ascites. Diagnostic paracentesis: PMN count 380 cells/µL. Febrile, hemodynamically stable. Blood cultures drawn.",
    vitals: { temp: 38.2, hr: 100, rr: 18, bp: "112/72", spo2: 97 },
    constraints: [],
    likelyBugs: ["e_coli", "strep_pneumo"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "ceftriaxone", dose: "2 g", route: "IV", interval: "q24h" }
    ],
    duration: "5 days"
  },

  // ── ICU / HIGH-ACUITY ─────────────────────────────────────────────────────

  {
    id: "cap_icu_01",
    syndrome: "Severe CAP (ICU)",
    summary: "70F intubated for respiratory failure from bilateral CAP. No MRSA or Pseudomonas risk. Normal QTc. No drug allergies. Vasopressors initiated.",
    vitals: { temp: 38.9, hr: 122, rr: 32, bp: "96/58", spo2: 88 },
    constraints: [],
    likelyBugs: ["strep_pneumo", "h_flu", "atypicals"],
    severity: "icu",
    bestRegimen: [
      { drug: "ceftriaxone", dose: "1 g", route: "IV", interval: "q24h" },
      { drug: "azithromycin", dose: "500 mg", route: "IV", interval: "daily" }
    ],
    duration: "7 days"
  },

  {
    id: "hap_early_01",
    syndrome: "Early-Onset HAP",
    summary: "65M, post-elective CABG, day 2 of intubation. New fever, purulent secretions, new opacity on CXR. No prior antibiotics this admission. No hospitalizations in last 90 days. Low MDR risk.",
    vitals: { temp: 38.4, hr: 104, rr: 22, bp: "118/74", spo2: 94 },
    constraints: [],
    likelyBugs: ["strep_pneumo", "h_flu"],
    severity: "icu",
    bestRegimen: [
      { drug: "ceftriaxone", dose: "1 g", route: "IV", interval: "q24h" }
    ],
    duration: "7 days"
  },

  {
    id: "hap_late_01",
    syndrome: "Late-Onset HAP/VAP",
    summary: "68F, day 8 of mechanical ventilation in MICU. New fever, worsening secretions, bilateral infiltrates. Prior MRSA in sputum this admission. Multiple prior antibiotic courses. High MDR risk.",
    vitals: { temp: 39.2, hr: 118, rr: 30, bp: "94/58", spo2: 90 },
    constraints: [],
    likelyBugs: ["pseudomonas", "mrsa"],
    severity: "icu",
    bestRegimen: [
      { drug: "cefepime", dose: "2 g", route: "IV", interval: "q8h" },
      { drug: "vancomycin", dose: "15 mg/kg", route: "IV", interval: "q12h" }
    ],
    duration: "7 days"
  },

  {
    id: "neutropenic_01",
    syndrome: "Febrile Neutropenia",
    summary: "38F with ALL undergoing induction chemo. ANC: 80 cells/µL. Single fever 38.6°C. No localizing source. Not clinically septic. Standard-risk febrile neutropenia protocol.",
    vitals: { temp: 38.6, hr: 98, rr: 18, bp: "114/70", spo2: 98 },
    constraints: [],
    likelyBugs: ["pseudomonas", "e_coli"],
    severity: "icu",
    bestRegimen: [
      { drug: "cefepime", dose: "2 g", route: "IV", interval: "q8h" }
    ],
    duration: "7 days"
  },

  {
    id: "iaa_severe_01",
    syndrome: "Intra-Abdominal Sepsis",
    summary: "69M, perforated sigmoid colon with fecal peritonitis. Septic shock requiring vasopressors. Emergency laparotomy performed. Post-op polymicrobial coverage required.",
    vitals: { temp: 39.5, hr: 132, rr: 30, bp: "82/48", spo2: 95 },
    constraints: [],
    likelyBugs: ["e_coli", "anaerobes", "pseudomonas"],
    severity: "icu",
    bestRegimen: [
      { drug: "piperacillin-tazobactam", dose: "4.5 g", route: "IV", interval: "q6h" }
    ],
    duration: "4 days"
  },

  {
    id: "endocarditis_01",
    syndrome: "Native Valve Endocarditis",
    summary: "38M with IVDU, 3 weeks of fever and weight loss. Echo: tricuspid valve vegetation. Blood cultures drawn. Empiric therapy started pending organism. CrCl 65.",
    vitals: { temp: 38.5, hr: 108, rr: 18, bp: "112/70", spo2: 97 },
    constraints: [],
    likelyBugs: ["mssa", "mrsa"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "vancomycin", dose: "15 mg/kg", route: "IV", interval: "q12h" }
    ],
    duration: "28 days",
    cultureDrop: {
      time: "post_submit",
      organism: "mssa",
      organismColor: "teal",
      susceptibilities: {
        vancomycin: "S",
        cefazolin: "S",
        cefepime: "S",
        meropenem: "S",
        daptomycin: "S"
      },
      bestDeescalation: "cefazolin"
    }
  },

  {
    id: "listeria_meningitis_01",
    syndrome: "Meningitis (Immunocompromised)",
    summary: "71M on prednisone 20 mg/day for COPD, confirmed bacterial meningitis on LP. Age and chronic steroid use raise risk for Listeria — coverage beyond S. pneumo is essential. CSF and blood cultures drawn.",
    vitals: { temp: 39.6, hr: 114, rr: 24, bp: "124/78", spo2: 98 },
    constraints: [],
    likelyBugs: ["strep_pneumo", "h_flu"],
    severity: "inpatient_ward",
    bestRegimen: [
      { drug: "ceftriaxone", dose: "2 g", route: "IV", interval: "q12h" },
      { drug: "ampicillin", dose: "2 g", route: "IV", interval: "q4h" },
      { drug: "vancomycin", dose: "15 mg/kg", route: "IV", interval: "q12h" }
    ],
    duration: "21 days"
  }

];
