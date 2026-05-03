export type Bug = {
  id: string;
  displayName: string;
  gram: string;
  sites: string[];
  preferredClasses: string[];
  preferredColor: string;
  usualFirstLine: string[];
  avoidIfAlternatives: string[];
  teaching: string;
};

export const bugs: Record<string, Bug> = {
  "strep_pneumo": {
    id: "strep_pneumo",
    displayName: "Strep pneumo",
    gram: "Gram Positive Diplococci",
    sites: ["CAP", "Meningitis", "OM"],
    preferredClasses: ["Cephalosporins", "Macrolides", "Respiratory FQs"],
    preferredColor: "teal",
    usualFirstLine: ["ceftriaxone", "amoxicillin", "levofloxacin"],
    avoidIfAlternatives: ["ciprofloxacin", "daptomycin"],
    teaching: "Ceftriaxone is the workhorse for inpatient CAP. Amoxicillin for outpatient. Avoid cipro (poor S. pneumo coverage).",
  },
  "h_flu": {
    id: "h_flu",
    displayName: "H. influenzae",
    gram: "Gram Negative Coccobacilli",
    sites: ["CAP", "AECB"],
    preferredClasses: ["Cephalosporins", "Macrolides"],
    preferredColor: "teal",
    usualFirstLine: ["ceftriaxone", "amoxicillin-clavulanate", "azithromycin"],
    avoidIfAlternatives: [],
    teaching: "Often beta-lactamase producing. Ceftriaxone or Azithromycin works well empirically.",
  },
  "atypicals": {
    id: "atypicals",
    displayName: "Atypicals",
    gram: "No cell wall / intracellular",
    sites: ["CAP"],
    preferredClasses: ["Macrolides", "Tetracyclines", "FQs"],
    preferredColor: "orange",
    usualFirstLine: ["azithromycin", "doxycycline", "levofloxacin"],
    avoidIfAlternatives: ["beta-lactams"],
    teaching: "Beta-lactams do not cover atypicals (Mycoplasma, Chlamydia, Legionella). You must add a macrolide, doxycycline, or use a respiratory FQ monotherapy.",
  },
  "e_coli": {
    id: "e_coli",
    displayName: "E. coli",
    gram: "Gram Negative Rod",
    sites: ["UTI", "Pyelo", "Intra-abdominal", "Bacteremia"],
    preferredClasses: ["Cephalosporins", "Penicillins", "UTI agents"],
    preferredColor: "teal",
    usualFirstLine: ["ceftriaxone", "cefazolin", "nitrofurantoin", "tmp-smx"],
    avoidIfAlternatives: ["meropenem", "cefepime"],
    teaching: "Use source and susceptibilities. Avoid carbapenems unless ESBL/resistance or severe context.",
  },
  "mrsa": {
    id: "mrsa",
    displayName: "MRSA",
    gram: "Gram Positive Cocci",
    sites: ["SSTI", "Bacteremia", "HAP/VAP", "Osteomyelitis"],
    preferredClasses: ["MRSA agents"],
    preferredColor: "red",
    usualFirstLine: ["vancomycin", "linezolid", "daptomycin"],
    avoidIfAlternatives: ["daptomycin (if pneumonia)"],
    teaching: "Vancomycin is standard. Linezolid is great for VAP (lung penetration). Daptomycin is deactivated by pulmonary surfactant.",
  },
  "pseudomonas": {
    id: "pseudomonas",
    displayName: "Pseudomonas",
    gram: "Gram Negative Rod",
    sites: ["HAP/VAP", "Sepsis", "UTI (complicated)"],
    preferredClasses: ["Antipseudomonal Cephs", "Antipseudomonal Penicillins", "Carbapenems"],
    preferredColor: "purple", // Using purple to link with strong agents
    usualFirstLine: ["cefepime", "piperacillin-tazobactam", "meropenem"],
    avoidIfAlternatives: ["ceftriaxone", "ertapenem"],
    teaching: "Always use antipseudomonal agents when risk factors are present. Ceftriaxone and Ertapenem DO NOT cover Pseudomonas.",
  },
  "mssa": {
    id: "mssa",
    displayName: "MSSA",
    gram: "Gram Positive Cocci",
    sites: ["SSTI", "Bacteremia", "Endocarditis"],
    preferredClasses: ["Antistaphylococcal Penicillins", "1st Gen Cephalosporins"],
    preferredColor: "teal", // Cefazolin
    usualFirstLine: ["cefazolin", "nafcillin", "oxacillin"],
    avoidIfAlternatives: ["vancomycin (if beta-lactam allergic)"],
    teaching: "Beta-lactams are superior to vancomycin for MSSA bacteremia. De-escalate from vanc to cefazolin/nafcillin when cultures result.",
  },
  "anaerobes": {
    id: "anaerobes",
    displayName: "Anaerobes",
    gram: "Mixed",
    sites: ["Intra-abdominal", "Aspiration Pneumonia", "Abscesses"],
    preferredClasses: ["Nitroimidazoles", "BLBLI"],
    preferredColor: "brown",
    usualFirstLine: ["metronidazole", "piperacillin-tazobactam", "ampicillin-sulbactam", "meropenem"],
    avoidIfAlternatives: [],
    teaching: "Metronidazole is classically strong for below-the-diaphragm. Pip-tazo and amp-sulbactam have great anaerobic coverage built-in.",
  }
};
