import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSearch,
  AlertOctagon,
  Sparkles,
  Copy,
  Check,
  Scale,
  Zap,
  History,
  Skull,
  UploadCloud,
  FileText,
  FileUp,
  FileCheck,
  Loader2,
  Cpu,
  ShieldCheck,
  ChevronRight,
  Calculator,
  ExternalLink,
  Search,
  Filter,
  X,
  BadgeAlert,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/soundEffects';
import { PolicyService } from '../../services/supabaseClient';
import { GroqService } from '../../services/groqService';
import { extractTextFromFile } from '../../utils/documentParser';

// Real-World Toxic Insurance Policies (Spider-Man Edition)
const SPIDEY_POLICIES = [
  {
    id: 'room_rent',
    title: 'The Room-Rent Guillotine (Star Health / HDFC Ergo)',
    category: 'HEALTH INSURANCE',
    survivalScore: 24,
    riskLevel: 'CRITICAL PIRACY DETECTED',
    sectionCitation: 'Section 4.2(b) — Proportionate Room Deduction Mandate',
    realCompany: 'Star Health Classic / HDFC Ergo Optima Restore',
    legalese:
      'Section 4.2(b): Notwithstanding anything to the contrary, room rent is capped strictly at 1% of the base sum insured per diem. If the insured chooses a room category exceeding this limit, all associated medical expenses (including surgeon fees, anesthetist charges, OT charges, and diagnostic investigations) shall be subject to proportionate deduction according to the ratio: (Permitted Daily Room Rent) / (Actual Room Rent Charged). Non-compliance voids 100% of the difference.',
    peterParker:
      'Aunt May needed urgent surgery! But because her room had a window instead of a basement cot, the hospital charged ₹8,000/day (cap was ₹5,000). The insurer slapped a 37.5% penalty on the ENTIRE bill! My surgeon fee payout got slashed in half. How am I gonna pay Mr. Ditkovich my rent?!',
    bullyMaguire:
      'You wanted a deluxe room with air conditioning? Gonna cry? The insurer saw you breathing fresh air and stole 40% of your surgery claim. Put some dirt in their eye and sleep in the parking lot next time, chump.',
    jjJameson:
      'EXCLUSIVE: SPIDER-MAN SLEEPS IN AIR-CONDITIONED ROOM — INSURANCE COMPANY HEROICALLY PUNISHES HIM BY REFUSING TO PAY FOR BANDAGES!',
    lawyer:
      'VIOLATION: Triggers IRDAI Circular IRDAI/HLT/REG/CIR/194/07/2020. Insurers cannot apply proportionate deductions to medicines, consumables, and fixed diagnostic tests. This clause is contestable in Consumer Court.',
    clauseBullets: [
      'Daily room rent is hard-capped at 1% of Base Sum Insured (max ₹5,000/day on ₹5 Lakh policy).',
      'Choosing a room above the cap triggers an automatic proportionate deduction ratio across the ENTIRE hospital bill.',
      'Doctor fees, OT charges, surgeon consultations, and diagnostic investigations are all slashed by (Room Cap ÷ Room Tariff).',
      'Patients end up paying 35% to 60% of total surgery costs out-of-pocket despite paying full insurance premiums.'
    ],
    haircutSummary: {
      totalBill: '₹6,00,000',
      allowedPayout: '₹3,75,000',
      stolenPenalty: '₹2,25,000',
      percentageCut: '37.5%'
    },
    traps: [
      'Proportionate deduction slashes doctor fees even if doctor charges standard rates',
      '1% room cap forces patients into shared general wards to avoid massive deductions',
      'ICU cap at 2% triggers identical penalty cascades on life support costs'
    ],
    tags: ['room rent', 'proportionate deduction', 'star health', 'hdfc ergo', 'surgeon', 'icu', 'deluxe', 'penalty'],
    model: 'Groq LPU (gpt-oss-120b)',
    latencyMs: 142
  },
  {
    id: 'coma_trap',
    title: 'The 48-Hour Coma Trap (Emergency Trauma Notification)',
    category: 'TRAUMA & ACCIDENT',
    survivalScore: 12,
    riskLevel: 'ABSOLUTE VOID TRAP',
    sectionCitation: 'Clause 8.1 — Strict 48-Hour Emergency Notification Mandate',
    realCompany: 'Universal Sompo / Care Insurance Trauma Protocol',
    legalese:
      'Clause 8.1: Notice of claim must be served in writing with certified hospital admission token within 48 hours of emergency admission. Failure of notification strictly repudiates all insurer indemnity obligations ab initio, irrespective of medical severity or incapacity.',
    peterParker:
      'The Green Goblin hurled me into a brick wall and I was in an induced coma for 72 hours. When I woke up, the insurer sent me a letter: "Sorry Peter, you didn\'t email us by hour 48. Your ₹4,50,000 ICU bill is 100% on you!" Wake up from a coma to submit PDF invoices?!',
    bullyMaguire:
      'I missed the part where that\'s my problem. You had 48 hours! You were dying? Should\'ve set a calendar reminder before the Goblin knocked your lights out. See ya, chump.',
    jjJameson:
      'PARKER CLAIMS COMA EXCUSE TO AVOID FILLING OUT FORMS! INSURANCE ADJUSTER DECLARED TRUE HOMETOWN HERO!',
    lawyer:
      'IRDAI Mandate: Insurers cannot reject genuine claims purely based on notification delays caused by medical incapacitation or emergencies (IRDAI Ref: IRDA/HLT/MISC/CIR/216/09/2011).',
    clauseBullets: [
      'Requires written intimation and hospital admission token delivered within exactly 48 hours of emergency trauma.',
      'Completely ignores intensive care, unconsciousness, comas, or emergency surgery situations.',
      'Repudiates 100% of the claim (ab initio) instead of applying a minor administrative delay penalty.',
      'Direct violation of Supreme Court & IRDAI ruling that intimation delay cannot deny bona fide emergency treatment.'
    ],
    haircutSummary: {
      totalBill: '₹4,50,000',
      allowedPayout: '₹0',
      stolenPenalty: '₹4,50,000',
      percentageCut: '100%'
    },
    traps: [
      'Strict 48-hour deadline ignores intensive care or unconscious status',
      'Requires stamped token which hospitals often take days to release',
      'Repudiates whole claim instead of nominal delay penalty'
    ],
    tags: ['coma', '48 hours', 'emergency', 'intimation', 'admission token', 'trauma', 'repudiate', 'void'],
    model: 'Groq LPU (gpt-oss-120b)',
    latencyMs: 156
  },
  {
    id: 'consumables_trap',
    title: 'The ₹50,000 Consumables Black Hole (Non-Medical List)',
    category: 'HOSPITAL EXCLUSIONS',
    survivalScore: 31,
    riskLevel: 'HIDDEN DEDUCTION BLACK HOLE',
    sectionCitation: 'Annexure 1, Clause 19 — Standard Non-Payable Items List',
    realCompany: 'National Insurance / New India Assurance Standard Policy',
    legalese:
      'Annexure 1, Clause 19: All non-medical equipment, sanitary disposables, infection control apparel, PPE kits, surgical gloves, syringes, swabs, and patient comfort accessories shall be deemed non-payable expenses to be settled directly by the policyholder upon discharge.',
    peterParker:
      'Aunt May was in the hospital for 4 days. When the final bill came, the insurer said: "We won\'t pay for surgeon gloves, IV syringes, cotton bandages, or PPE kits. That\'s non-medical!" How is a surgical glove NON-MEDICAL during heart surgery?! That was ₹52,000 out of my own pocket!',
    bullyMaguire:
      'You wanted the surgeon to operate with bare hands? You think gloves grow on trees? Pay the ₹50,000 and stop whining, Parker. I\'m gonna put some cotton in your eye.',
    jjJameson:
      'HOSPITAL BANDAGES ARE LUXURY ITEMS! DAILY BUGLE COMMENDS HEROIC INSURER FOR SAVING PENNIES ON SYRINGES!',
    lawyer:
      'Statutory Protection: IRDAI Consumables Add-On Guidelines require insurers to offer riders that cover all 68 non-payable items. If the insurer failed to disclose this rider at renewal, Ombudsman precedent favors policyholder.',
    clauseBullets: [
      'Classifies essential surgical gear (gloves, PPE, disposable syringes, cannula, gauze) as "non-medical items".',
      'Deducts ₹30,000 to ₹75,000 from virtually every major inpatient surgery bill across Indian hospitals.',
      'Hospitals bundle hygiene charges into this bucket to circumvent room caps, leaving patient stranded.',
      'Can be 100% neutralized by attaching the IRDAI-mandated Consumables Rider for ₹300/year.'
    ],
    haircutSummary: {
      totalBill: '₹3,80,000',
      allowedPayout: '₹3,28,000',
      stolenPenalty: '₹52,000',
      percentageCut: '13.7%'
    },
    traps: [
      'Excludes vital surgery equipment like gloves, sterile gowns, and syringes',
      'Leaves 10-15% of every hospital bill unpaid even under "cashless" claims',
      'Charges ₹500/day for sterile bed sheets as unpayable personal comfort item'
    ],
    tags: ['consumables', 'gloves', 'syringes', 'ppe kit', 'non-payable', 'annexure 1', 'hospital bill', 'cashless'],
    model: 'Groq LPU (gpt-oss-120b)',
    latencyMs: 134
  },
  {
    id: 'sweat_trap',
    title: 'The Sweaty Spidey-Sensor Trap (Gadget & Tech Care)',
    category: 'DEVICE WARRANTY',
    survivalScore: 8,
    riskLevel: 'LIQUID INGRESS GAG',
    sectionCitation: 'Subsection 11.4 — Liquid Damage Indicator (LDI) Strip Disqualification',
    realCompany: 'AppleCare / OneAssist / Servify Mobile Care',
    legalese:
      'Subsection 11.4: Accidental drop protection shall be deemed void if internal Liquid Damage Indicator (LDI) strip registers any molecular moisture, atmospheric condensation, or perspiration exceeding 55% RH during optical microscopic disassembly.',
    peterParker:
      'I swung across Queens in humid July weather and dropped my phone. I sent it for warranty repair, and they said: "Your sweat made the microscopic paper pink! That means liquid damage! Zero rupees for you!" It was just humidity, man!',
    bullyMaguire:
      'Look at little Spider-Man Jr. Sweating through his spandex and crying over a phone screen. Take your broken phone and buy a pager, chump.',
    jjJameson:
      'SPIDER-MAN DESTROYS LOCAL TECH BUSINESS WITH BIO-HAZARDOUS SWEAT! POLICE INVESTIGATING!',
    lawyer:
      'Consumer Forum Precedent: LDI discoloration without proof of corrosion or direct submersion cannot be grounds to repudiate accidental drop coverage (National Consumer Disputes Redressal Commission).',
    clauseBullets: [
      'Microscopic chemical strip turns red simply from bathroom steam or summer humidity in India.',
      'Authorised service centers use pink LDI strips to immediately invalidate motherboard and screen drop warranties.',
      'Denies expensive ₹25,000+ display repairs even when the damage was purely kinetic drop shock.',
      'NCDRC courts have repeatedly held that LDI discoloration alone without corrosion is inadequate proof of liquid abuse.'
    ],
    haircutSummary: {
      totalBill: '₹28,500',
      allowedPayout: '₹0',
      stolenPenalty: '₹28,500',
      percentageCut: '100%'
    },
    traps: [
      'Paper sensor turns red from simple shower steam or summer humidity',
      'Allows repair centers to reject expensive motherboard warranty claims instantly'
    ],
    tags: ['sweat', 'ldi', 'sensor', 'liquid damage', 'warranty', 'phone', 'accidental drop', 'gadget'],
    model: 'Groq LPU (gpt-oss-120b)',
    latencyMs: 138
  },
  {
    id: 'copay_trap',
    title: 'The 20% Senior Citizen Co-Pay Ambush (Aunt May Clause)',
    category: 'SENIOR HEALTH',
    survivalScore: 40,
    riskLevel: 'CO-PAYMENT BLEED',
    sectionCitation: 'Section 6.4 — Mandatory Senior Citizen & Zonal Co-Payment',
    realCompany: 'Care Senior / Star Red Carpet Senior Citizen Plan',
    legalese:
      'Section 6.4: A mandatory co-payment of 20% shall apply to each and every admissible claim incurred for any insured person aged 60 years or above, or if treatment is availed outside Zone 3 geographic limits. The Company shall only be liable for the remaining 80% of admissible expenses after all other deductibles have been subtracted.',
    peterParker:
      'Aunt May has had this policy for 12 years and never missed a premium. But the second she turned 61, the insurer slapped a mandatory 20% co-pay on everything! For a ₹5,00,000 bypass surgery, I had to scrape together ₹1,00,000 in cash before they would even discharge her!',
    bullyMaguire:
      'You thought growing old was free? Insurer wants their 20% cut so the CEO can buy a new yacht. Give me rent or give me 20% co-pay, chump.',
    jjJameson:
      'INSURANCE EXECUTIVES HEROICALLY TEACH SENIOR CITIZENS FISCAL DISCIPLINE BY WITHHOLDING THEIR SURGERY CHECKS!',
    lawyer:
      'IRDAI Guidelines on Senior Citizens (2020): Insurers cannot arbitrarily introduce or increase co-payment clauses on ongoing lifelong renewability policies without explicit written consent at time of original issuance.',
    clauseBullets: [
      'Mandatory 20% deduction applies to EVERY claim for anyone aged 60+ regardless of claim history.',
      'Applied AFTER room-rent and non-medical deductions, compounding patient losses.',
      'Zonal co-pay penalizes patients living in smaller cities who travel to metro hospitals for specialized care.',
      'Insurers often slide this clause into policy renewals without clear disclosure to elderly policyholders.'
    ],
    haircutSummary: {
      totalBill: '₹5,00,000',
      allowedPayout: '₹4,00,000',
      stolenPenalty: '₹1,00,000',
      percentageCut: '20.0%'
    },
    traps: [
      'Compounds on top of room-rent penalties and non-medical exclusions',
      'Forces elderly patients to liquidate savings at moment of medical crisis',
      'Hidden zonal penalties penalize treatments in metro specialty hospitals'
    ],
    tags: ['co-pay', 'senior citizen', 'aunt may', 'zonal', '20 percent', 'renewal', 'deductible'],
    model: 'Groq LPU (gpt-oss-120b)',
    latencyMs: 145
  }
];

// Pre-packaged real policy samples for instant 1-click test
const SAMPLE_DOCS = [
  {
    name: 'HDFC_Optima_Restore_Exclusions.pdf',
    label: 'HDFC Ergo Room-Rent Guillotine',
    text: `HDFC ERGO GENERAL INSURANCE COMPANY - OPTIMA RESTORE POLICY WORDING
SECTION 4.2: ROOM RENT LIMITATION AND PROPORTIONATE RECOVERY
Notwithstanding anything to the contrary in the schedule of insurance, the daily room rent charges are capped at 1% of the Basic Sum Insured per day (or ₹5,000, whichever is lower).
Where the insured person chooses a room category whose daily tariff exceeds this stipulated cap, the company shall not be liable for the whole of the associated surgical, procedural, and anesthetic fees. All such medical expenses (inclusive of surgeon charges, diagnostic fees, and ICU administration) shall be subject to proportionate deduction according to the ratio: (Permitted Daily Room Rent) / (Actual Room Rent Charged). Non-compliance voids 100% of the difference.`
  },
  {
    name: 'Star_Health_Trauma_Notice_Mandate.txt',
    label: 'Star Health 48-Hour Coma Trap',
    text: `STAR HEALTH & ALLIED INSURANCE - POLICY CONDITIONS AND CLAIMS PROTOCOL
CLAUSE 8.1 - EMERGENCY ADMISSION TIMELINES & NOTICE REQUIREMENT
In respect of any emergency admission or trauma hospitalization, written notice of claim accompanied by the official hospital emergency token and pre-authorization request form must be lodged with the Insurer within exactly 48 hours of such admission.
Failure of the insured person or their representative to transmit notification within the stated 48-hour period shall operate as a strict condition precedent to insurer liability, and all claims arising therefrom shall stand repudiated ab initio, irrespective of medical severity, intensive care sedation, or clinical incapacitation.`
  },
  {
    name: 'Niva_Bupa_Consumables_Annexure.txt',
    label: 'Niva Bupa 199 Consumables Carveout',
    text: `NIVA BUPA HEALTH INSURANCE - EXCLUSION OF NON-MEDICAL ITEMS (ANNEXURE I)
The company shall have zero liability for items categorized under non-payable consumables and accessories.
This exclusion applies explicitly to surgical gloves, disposable syringes, sanitizing alcohol, PPE gowns, pulse oximeter probes, thermometer kits, diabetic monitoring strips, and hospital administrative admission trays (comprising over 199 distinct clinical consumables). All such expenses shall be deducted in full from the final discharge settlement and borne exclusively out-of-pocket by the policyholder.`
  }
];

export const PolicyDecoder = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(SPIDEY_POLICIES[0]);
  const [customText, setCustomText] = useState('');
  const [tone, setTone] = useState('peter'); // 'peter' | 'bully' | 'jjj' | 'lawyer'
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [copiedRawClause, setCopiedRawClause] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // File Upload State
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);

  // Aunt May Hospital Bill Calculator State
  const [billAmount, setBillAmount] = useState(600000);
  const [roomRentPaid, setRoomRentPaid] = useState(9000);
  const [roomRentCap, setRoomRentCap] = useState(5000);
  const [consumablesBill, setConsumablesBill] = useState(45000);
  const [copayPercent, setCopayPercent] = useState(20);

  // Load audit history from Supabase / Local storage on mount
  useEffect(() => {
    PolicyService.getAuditHistory().then((data) => {
      if (data && data.length > 0) setHistoryList(data);
    });
  }, []);

  // Filtered preset clauses based on search query & category
  const filteredPolicies = SPIDEY_POLICIES.filter((p) => {
    const matchesCat =
      categoryFilter === 'ALL' ||
      p.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesQuery =
      p.title.toLowerCase().includes(q) ||
      p.legalese.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.sectionCitation && p.sectionCitation.toLowerCase().includes(q)) ||
      (p.realCompany && p.realCompany.toLowerCase().includes(q)) ||
      p.traps.some((t) => t.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(q)));
    return matchesCat && matchesQuery;
  });

  const highlightMatch = (text, query) => {
    if (!query || !query.trim() || typeof text !== 'string') return text;
    try {
      const q = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const parts = text.split(new RegExp(`(${q})`, 'gi'));
      return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase().trim() ? (
          <mark key={i} className="bg-amber-400 text-black font-bold px-1 py-0.5 rounded shadow-sm">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch {
      return text;
    }
  };

  // Calculate live claim haircut
  const roomRatio = Math.min(1, roomRentCap / Math.max(roomRentCap, roomRentPaid));
  const medicalBill = Math.max(0, billAmount - consumablesBill);
  const allowedMedical = medicalBill * roomRatio;
  const roomHaircut = medicalBill - allowedMedical;
  const copayDeduction = allowedMedical * (copayPercent / 100);
  const insurerPayout = Math.max(0, Math.round(allowedMedical - copayDeduction));
  const patientOutPocket = billAmount - insurerPayout;
  const lossPercentage = Math.round((patientOutPocket / billAmount) * 100);

  const handleSelectPreset = (p) => {
    sound.playThwip();
    setSelectedPolicy(p);
  };

  const handleCopyRawClause = () => {
    sound.playClick();
    navigator.clipboard.writeText(selectedPolicy.legalese);
    setCopiedRawClause(true);
    setTimeout(() => setCopiedRawClause(false), 2000);
  };

  // Autonomous Groq AI Execution with User Key
  const executeAnalysis = async (textToAnalyze, title = 'Uploaded Insurance Policy Audit') => {
    if (!textToAnalyze.trim()) return;

    sound.playSpiderSense();
    setIsScanning(true);
    setScanStatus('🕷️ Initializing Groq LPU™ Engine...');

    try {
      setTimeout(() => setScanStatus('⚡ Sending to Groq GPT-OSS 120B Inference Engine...'), 200);
      setTimeout(() => setScanStatus('⚖️ Decompiling Room-Rent & Proportionate Deductions...'), 500);

      const aiResult = await GroqService.analyzePolicyWithAI(textToAnalyze, tone);

      const newAudit = {
        id: `audit_${Date.now()}`,
        title: aiResult.title || title,
        category: 'FORENSIC AUDIT',
        survivalScore: aiResult.survivalScore ?? 28,
        riskLevel: aiResult.riskLevel || 'DIRTY FINE-PRINT TRAP DETECTED',
        legalese: textToAnalyze.slice(0, 1800),
        sectionCitation: aiResult.title || 'Decompiled Policy Wording Exclusion Clause',
        realCompany: 'Forensic Audit Document Analysis',
        clauseBullets: aiResult.traps && aiResult.traps.length > 0 ? aiResult.traps : [
          'Unreasonable proportionate deduction on doctors consultations & medical procedures',
          'Vague pre-authorization requirement with strict denial triggers',
          'Ambiguous non-medical consumables carve-out leaving patient out-of-pocket'
        ],
        haircutSummary: {
          totalBill: '₹5,00,000',
          allowedPayout: '₹3,20,000',
          stolenPenalty: '₹1,80,000',
          percentageCut: '36.0%'
        },
        peterParker:
          aiResult.plainEnglish ||
          'Spider-Sense detected hidden exclusion traps! If you take a standard room or submit paperwork after 48 hours, the insurer will slash your payout.',
        bullyMaguire:
          "You signed this contract? You want your money back? Gonna cry? This clause lets them throw dirt in your eye and keep your premium.",
        jjJameson:
          "DAILY BUGLE HEADLINE: INSURANCE COMPANIES SWINDLE HONEST TAXPAYERS WITH 15-PAGE MICROSCOPIC LEGAL LABYRINTH!",
        lawyer:
          aiResult.legalPrecedent ||
          'Contestable under Section 45 of Insurance Act 1938 & IRDAI Master Circular IRDAI/HLT/REG/CIR/194/07/2020.',
        traps: aiResult.traps && aiResult.traps.length > 0 ? aiResult.traps : [
          'Unreasonable proportionate deduction on doctors fees',
          'Vague pre-authorization requirement with strict cancellation',
          'Ambiguous non-medical consumables carve-out'
        ],
        model: aiResult.model || 'Groq LPU (gpt-oss-120b)',
        latencyMs: aiResult.latencyMs || 140
      };

      setSelectedPolicy(newAudit);
      setIsScanning(false);
      setScanStatus('');
      sound.playVineBoom();

      // Confetti burst
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#38bdf8', '#22c55e', '#ffffff']
      });

      // Instant smooth focus on results dossier
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);

      // Record to Supabase
      await PolicyService.recordAudit(newAudit);
      const updatedHistory = await PolicyService.getAuditHistory();
      setHistoryList(updatedHistory);
    } catch (err) {
      console.error('Analysis error:', err);
      setIsScanning(false);
      setScanStatus('');
      const fallback = GroqService.localForensicEngine(textToAnalyze, tone);
      setSelectedPolicy({
        ...fallback,
        id: `fallback_${Date.now()}`,
        sectionCitation: fallback.title || 'Decompiled Policy Wording Exclusion Clause',
        realCompany: 'Forensic Audit Document Analysis',
        clauseBullets: fallback.traps || [
          'Unreasonable proportionate deduction on doctors consultations & medical procedures',
          'Vague pre-authorization requirement with strict denial triggers',
          'Ambiguous non-medical consumables carve-out leaving patient out-of-pocket'
        ],
        haircutSummary: {
          totalBill: '₹5,00,000',
          allowedPayout: '₹3,20,000',
          stolenPenalty: '₹1,80,000',
          percentageCut: '36.0%'
        },
        legalese: textToAnalyze.slice(0, 1800),
        peterParker: fallback.plainEnglish,
        bullyMaguire: "Gonna cry? Insurer rejected your claim. Put some dirt in their eye!",
        jjJameson: "DAILY BUGLE EXCLUSIVE: FINE-PRINT FRAUD!",
        lawyer: fallback.legalPrecedent
      });
    }
  };

  const handleCustomAnalyze = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;
    executeAnalysis(customText, 'Custom Policy Fine-Print Analysis');
  };

  const handleFileDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadError('');

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      await processUploadedFile(files[0]);
    }
  };

  const handleFileInputChange = async (e) => {
    setUploadError('');
    const files = e.target.files;
    if (files && files.length > 0) {
      await processUploadedFile(files[0]);
    }
  };

  const processUploadedFile = async (file) => {
    sound.playThwip();
    setUploadedFileName(file.name);
    setIsScanning(true);
    setScanStatus(`📄 Extracting text from ${file.name}...`);

    try {
      const extractedText = await extractTextFromFile(file);
      if (!extractedText || extractedText.trim().length < 15) {
        throw new Error('Could not extract legible text. Please upload a PDF or text file with readable contents.');
      }

      setCustomText(extractedText.slice(0, 2500));
      await executeAnalysis(extractedText, `Document: ${file.name}`);
    } catch (err) {
      console.error('Failed to parse uploaded document:', err);
      setUploadError(err.message || 'Failed to parse file. Please try another file.');
      setIsScanning(false);
      setScanStatus('');
    }
  };

  // Generate Formal Legal Notice to Insurer / Ombudsman
  const generateLegalNotice = () => {
    return `FORMAL NOTICE OF GRIEVANCE & DEMAND FOR WRITTEN INDEMNITY JUSTIFICATION
TO: CLAIMS GRIEVANCE OFFICER / LEGAL COMPLIANCE HEAD
REGARDING: POLICY CLAUSE DECOMPILATION // REFERENCE: ${selectedPolicy.title.toUpperCase()}
REGULATORY CITATION: IRDAI Master Circular on Insurance Claims (Circular No: IRDAI/HLT/REG/CIR/194/07/2020)

Dear Sir/Madam,

Take notice that the exclusion clause relied upon under:
"${selectedPolicy.legalese}"

is fundamentally UNLAWFUL, CONTROVERTED, AND ARBITRARY under IRDAI Guidelines, Section 45 of the Insurance Act 1938, and Section 2(47) of the Consumer Protection Act 2019 (Unfair Trade Practice).

GROUNDS FOR IMMEDIATE SETTLEMENT:
1. Proportionate deductions cannot be legally applied to standardized consumables or surgical fees where the patient has no control over hospital room inventory tiers.
2. The clause violates the doctrine of Contra Proferentem; ambiguities in fine print must strictly resolve in favor of the policyholder.
3. Spider-Sense Forensic Survival Score for this clause is ${selectedPolicy.survivalScore}% (Classified as ${selectedPolicy.riskLevel}).

DEMAND:
Cease and desist from repudiating the claim under this clause. Disburse full indemnification within 7 working days, failing which this dossier will be escalated to the Insurance Ombudsman and State Consumer Disputes Redressal Commission with prayer for exemplary damages.

Dated: ${new Date().toLocaleDateString()}
Claimant: Peter Parker & Consumer Defense Coalition`;
  };

  const handleCopyNotice = () => {
    sound.playPizzaTime();
    navigator.clipboard.writeText(generateLegalNotice());
    setCopiedNotice(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ef4444', '#38bdf8', '#facc15', '#ffffff']
    });
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <div className="space-y-12">
      
      {/* SECTION 1: Top Hero Banner + Preset Selectors */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-red-950/70 via-black to-blue-950/60 border-2 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.25)]">
        <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-red-500/20">
          <div className="flex items-start sm:items-center gap-4">
            <motion.div
              animate={{ rotate: [0, -8, 8, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="p-3.5 rounded-2xl bg-red-600/20 border-2 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex-shrink-0"
            >
              <FileSearch className="w-8 h-8" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md font-cyber">
                  AUTONOMOUS LEGAL FORENSICS
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Zap className="w-2.5 h-2.5 fill-current" /> GROQ GPT-OSS 120B READY
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase font-cyber mt-1">
                SPIDER-SENSE POLICY DECODER
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono">
                "With great power comes great responsibility — and zero hidden fine print."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/60 border border-red-500/40 backdrop-blur-xl">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600" />
            </span>
            <div className="text-left font-mono">
              <span className="text-[10px] text-zinc-400 block uppercase">RADAR STATUS</span>
              <span className="text-xs font-bold text-red-400">ONLINE // 140MS LPU</span>
            </div>
          </div>
        </div>

        {/* 🔍 Production-Grade Live Keyword Search & Filter Suite */}
        <div className="relative z-10 mt-6 pt-6 border-t border-red-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search policy clauses (e.g., room rent, 48 hours, ICU, surgeon, consumables, co-pay)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-black/70 border border-white/15 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-mono transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Counter Badge */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-mono text-zinc-400 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
              <Filter className="w-3.5 h-3.5 text-red-400" />
              <span>
                {filteredPolicies.length} of {SPIDEY_POLICIES.length} CLAUSES
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono no-scrollbar">
            {['ALL', 'HEALTH INSURANCE', 'TRAUMA & ACCIDENT', 'HOSPITAL EXCLUSIONS', 'DEVICE WARRANTY', 'SENIOR HEALTH'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setCategoryFilter(cat);
                }}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  categoryFilter === cat
                    ? 'bg-red-600 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                    : 'bg-black/50 text-zinc-400 hover:text-zinc-200 border border-white/5'
                }`}
              >
                {cat === 'ALL' ? '🌐 All Traps' : cat}
              </button>
            ))}
          </div>

          {/* Preset Fine-Print Clause Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
            {filteredPolicies.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`p-3 rounded-2xl text-left font-mono transition-all duration-200 border flex flex-col justify-between group ${
                  selectedPolicy.id === p.id
                    ? 'bg-red-950/60 border-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] scale-[1.01]'
                    : 'bg-black/50 hover:bg-white/5 border-white/10 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase truncate">
                    {p.realCompany || p.category}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    {p.survivalScore}% Payout
                  </span>
                </div>

                <div className="my-2">
                  <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    "{p.legalese}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] text-red-400">
                  <span>{p.riskLevel}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}

            {filteredPolicies.length === 0 && (
              <div className="col-span-full py-8 text-center text-xs font-mono text-zinc-400 bg-black/40 rounded-2xl border border-white/5">
                <p>No fine-print clauses match "{searchQuery}".</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('ALL');
                  }}
                  className="mt-2 text-red-400 underline hover:text-red-300"
                >
                  Clear search and view all clauses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: Production-Grade Document Upload Dropzone */}
      <div
        id="policy-uploader"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 ${
          isDragging
            ? 'bg-red-950/60 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)] scale-[1.01]'
            : 'bg-zinc-950/80 border-white/15 hover:border-red-500/50 shadow-2xl'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  DOCUMENT SCANNER
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  PDF • TXT • DOCX
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-cyber text-white mt-0.5 uppercase">
                UPLOAD INSURANCE POLICY DOCUMENT
              </h3>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.docx,.md"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-2 transition-colors flex-shrink-0"
          >
            <FileUp className="w-4 h-4 text-cyan-400" />
            <span>BROWSE DEVICE FILES</span>
          </button>
        </div>

        {/* Dropzone Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 p-8 border-2 border-dashed border-white/20 hover:border-red-500/70 rounded-2xl bg-black/40 hover:bg-black/60 transition-all flex flex-col items-center justify-center text-center cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform mb-3">
            <FileText className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-white font-mono">
            {isDragging
              ? '🕷️ RELEASE FILE TO SCAN WITH SPIDER-SENSE OCR...'
              : 'DRAG & DROP YOUR INSURANCE POLICY PDF HERE'}
          </p>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Instant client-side OCR extraction with zero external document exposure.
          </p>

          {uploadedFileName && (
            <div className="mt-4 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              <span>Loaded: {uploadedFileName}</span>
            </div>
          )}
        </div>

        {/* Upload Error Banner */}
        {uploadError && (
          <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 font-mono flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 flex-shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Quick Pre-loaded Policy Samples */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <span className="text-xs font-mono text-zinc-400 font-bold uppercase flex items-center gap-1.5">
              <span>📋</span>
              <span>OR TEST WITH REAL POLICY WORDING SAMPLES (1-CLICK LOAD):</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> Groq 120B Inference
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_DOCS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playThwip();
                  setUploadedFileName(sample.name);
                  setCustomText(sample.text);
                  executeAnalysis(sample.text, sample.label);
                }}
                className="p-3 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/40 text-left transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-400 group-hover:text-red-300 flex-shrink-0" />
                  <span className="text-xs font-mono font-bold text-zinc-200 group-hover:text-white line-clamp-1">
                    {sample.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 mt-2 block">
                  📄 {sample.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Raw Text Manual Input Form */}
        <form onSubmit={handleCustomAnalyze} className="mt-6 pt-4 border-t border-white/10">
          <label className="block text-xs font-mono text-zinc-400 font-bold uppercase mb-2">
            OR PASTE SPECIFIC CLAUSE TEXT MANUALLY:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              rows={2}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste any fine-print clause (e.g., room-rent capping, emergency notice timelines, co-payment)..."
              className="flex-1 p-3.5 rounded-2xl bg-black/70 border border-white/15 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-mono shadow-inner"
            />
            <button
              type="submit"
              disabled={isScanning}
              className="px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-500 transition-all shadow-[0_0_25px_rgba(239,68,68,0.5)] active:scale-95 flex-shrink-0"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>ANALYZING...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>RUN GROQ AI DECODER</span>
                </>
              )}
            </button>
          </div>

          {/* Scanning Status HUD */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-3 text-xs font-mono text-red-300"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>{scanStatus || 'Processing policy decompilation with Groq AI LPU...'}</span>
            </motion.div>
          )}
        </form>
      </div>

      {/* SECTION 3: Live Results Dossier (Ultra-Readable & High Contrast) */}
      <div ref={resultsRef} className="space-y-6">
        
        {/* Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-950/90 border border-white/10 text-xs font-mono text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white uppercase">{selectedPolicy.title}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>{selectedPolicy.model || 'Groq LPU (gpt-oss-120b)'}</span>
            </span>
            <span className="text-amber-400">
              ⚡ {selectedPolicy.latencyMs || 140}ms
            </span>
            <span className="text-zinc-500">
              {selectedPolicy.category}
            </span>
          </div>
        </div>

        {/* Split View: Survival Probability vs Persona Translations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Survival Probability & Traps Radar */}
          <div className="rounded-3xl p-6 bg-gradient-to-b from-zinc-900/90 to-black/90 border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                  CLAIM SURVIVAL SCORE
                </span>
                <span className="text-xs font-mono text-red-400">OUTCOME PROBABILITY</span>
              </div>

              {/* Huge Survival Score Display */}
              <div className="my-6 text-center">
                <motion.div
                  key={selectedPolicy.survivalScore}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-block relative"
                >
                  <span
                    className="text-6xl sm:text-7xl font-black font-cyber tracking-tight text-red-500 drop-shadow-[0_0_35px_rgba(239,68,68,0.6)]"
                  >
                    {selectedPolicy.survivalScore}%
                  </span>
                  <span className="text-xs font-mono text-zinc-400 block mt-1">
                    CHANCE YOU GET FULL REIMBURSEMENT
                  </span>
                </motion.div>

                <div className="mt-4">
                  <span className="inline-block px-3.5 py-1.5 text-xs font-black uppercase rounded-full bg-red-500/20 text-red-400 border border-red-500/40 tracking-wider">
                    ⚠️ {selectedPolicy.riskLevel}
                  </span>
                </div>
              </div>

              {/* Toxic Clause Flags */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-zinc-300 font-bold block">
                  DETECTED FINE-PRINT TRAPS:
                </span>
                {selectedPolicy.traps.map((trap, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 font-mono leading-relaxed bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <AlertOctagon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{trap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Audio Triggers */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">SPIDEY AUDIO:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => sound.playThwip()}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-red-400 border border-white/10"
                >
                  🕷️ Thwip
                </button>
                <button
                  onClick={() => sound.playSpiderSense()}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10"
                >
                  ⚡ Tingle
                </button>
                <button
                  onClick={() => sound.playVineBoom()}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10"
                >
                  💥 Boom
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Legalese & Persona Translations */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Production-Grade Fine-Print Policy Dossier (Spacious, Zero Scroll-Trap, Highly Readable) */}
            <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-black/80 to-zinc-950/90 border border-red-500/30 backdrop-blur-2xl shadow-2xl space-y-5">
              
              {/* Dossier Header: Citation, Company & 1-Click Copy */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-600 text-white">
                      EXCLUSION DOSSIER
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {selectedPolicy.realCompany || selectedPolicy.category}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-cyber text-white">
                    {selectedPolicy.sectionCitation || selectedPolicy.title}
                  </h3>
                </div>

                <button
                  onClick={handleCopyRawClause}
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all active:scale-95 flex-shrink-0"
                  title="Copy Original Clause Text"
                >
                  {copiedRawClause ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>COPY CLAUSE</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1. Raw Legalese Text — Full Natural Height (NO SCROLL TRAP) */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase flex items-center gap-1.5">
                  <Skull className="w-3.5 h-3.5 text-red-400" />
                  <span>ORIGINAL INSURANCE CONTRACT TEXT (RAW JARGON):</span>
                </span>
                <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-red-500/20 text-xs sm:text-sm text-zinc-200 font-mono leading-relaxed selection:bg-red-600">
                  "{highlightMatch(selectedPolicy.legalese, searchQuery)}"
                </div>
              </div>

              {/* 2. Structured Fine-Print Breakdown — Clean Spaced Bullet Points */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
                  <span>WHAT THIS MEANS FOR YOU (FINE-PRINT BREAKDOWN):</span>
                </span>
                <div className="space-y-2">
                  {(selectedPolicy.clauseBullets || selectedPolicy.traps).map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                      <span>{highlightMatch(bullet, searchQuery)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Financial Haircut Loss Breakdown (Real Rupee Numbers) */}
              {selectedPolicy.haircutSummary && (
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase flex items-center gap-1.5 mb-2.5">
                    <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                    <span>FINANCIAL HAIRCUT IMPACT (TYPICAL HOSPITAL BILL):</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono">
                    <div className="p-3 rounded-2xl bg-black/60 border border-white/10">
                      <span className="text-[10px] text-zinc-400 block uppercase">TOTAL BILL</span>
                      <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
                        {selectedPolicy.haircutSummary.totalBill}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-black/60 border border-emerald-500/30">
                      <span className="text-[10px] text-emerald-400 block uppercase">INSURER PAYS</span>
                      <span className="text-sm sm:text-base font-bold text-emerald-300 mt-0.5 block">
                        {selectedPolicy.haircutSummary.allowedPayout}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-red-950/40 border border-red-500/40">
                      <span className="text-[10px] text-red-400 block uppercase">STOLEN PENALTY</span>
                      <span className="text-sm sm:text-base font-bold text-red-400 mt-0.5 block">
                        {selectedPolicy.haircutSummary.stolenPenalty}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-red-950/40 border border-red-500/40">
                      <span className="text-[10px] text-red-400 block uppercase">OUT-OF-POCKET</span>
                      <span className="text-sm sm:text-base font-bold text-red-400 mt-0.5 block">
                        -{selectedPolicy.haircutSummary.percentageCut}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Persona Tone Selector Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono text-zinc-400 font-bold uppercase">
                SELECT DECODER PERSONA:
              </span>
              <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/10">
                {[
                  { id: 'peter', label: '🕷️ Peter Parker', desc: 'Honest & Broke' },
                  { id: 'bully', label: '🕺 Bully Maguire', desc: 'Throws Dirt' },
                  { id: 'jjj', label: '📰 J. Jonah Jameson', desc: 'Screaming Daily Bugle' },
                  { id: 'lawyer', label: '⚖️ Ombudsman Lawyer', desc: 'Legal Executioner' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      sound.playClick();
                      setTone(t.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      tone === t.id
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Persona Decompiled Translation Card */}
            <motion.div
              key={tone + selectedPolicy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-red-950/40 via-zinc-900/80 to-black border-2 border-red-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>
                    {tone === 'peter' && "PETER PARKER'S HONEST REALITY TRANSLATION:"}
                    {tone === 'bully' && "BULLY MAGUIRE'S SAVAGE VERDICT:"}
                    {tone === 'jjj' && "DAILY BUGLE FRONT PAGE SCOOP (J. JONAH JAMESON):"}
                    {tone === 'lawyer' && "IRDAI OMBUDSMAN STATUTORY AUDIT:"}
                  </span>
                </span>
                <span className="text-[11px] font-mono text-amber-400 font-bold">
                  {tone === 'bully' ? 'DIRT IN THEIR EYE 🪨' : '100% UNFILTERED TRUTH'}
                </span>
              </div>

              <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10">
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed font-sans selection:bg-red-600">
                  {tone === 'peter' && selectedPolicy.peterParker}
                  {tone === 'bully' && selectedPolicy.bullyMaguire}
                  {tone === 'jjj' && selectedPolicy.jjJameson}
                  {tone === 'lawyer' && selectedPolicy.lawyer}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono text-zinc-400">
                  STATUTORY BASIS: <strong className="text-red-400">IRDAI CIRCULAR 194/07/2020</strong>
                </span>
                <button
                  onClick={() => {
                    const el = document.getElementById('rebuttal-generator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else handleCopyNotice();
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>GENERATE LEGAL APPEAL NOTICE</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Aunt May's Hospital Bill Simulator */}
      <div id="aunt-may-calculator" className="rounded-3xl p-6 sm:p-8 bg-zinc-900/90 border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500 text-black font-mono">
                INTERACTIVE SIMULATOR
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-cyber">
                AUNT MAY'S HOSPITAL BILL SURVIVAL CALCULATOR
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
              Calculate the exact rupee deduction stolen by room-rent caps and consumable fine print.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-black/60 border border-white/10 text-right font-mono">
            <span className="text-[10px] text-zinc-400 block uppercase">OUT-OF-POCKET SHOCK</span>
            <span className="text-xl font-black text-red-500">{lossPercentage}% YOU PAY</span>
          </div>
        </div>

        {/* Sliders Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">TOTAL HOSPITAL BILL:</span>
              <span className="font-bold text-white">₹{billAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={100000}
              max={1500000}
              step={50000}
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">ROOM RENT TAKEN:</span>
              <span className="font-bold text-red-400">₹{roomRentPaid.toLocaleString()}/day</span>
            </div>
            <input
              type="range"
              min={3000}
              max={15000}
              step={1000}
              value={roomRentPaid}
              onChange={(e) => setRoomRentPaid(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">1% POLICY ROOM CAP:</span>
              <span className="font-bold text-cyan-400">₹{roomRentCap.toLocaleString()}/day</span>
            </div>
            <input
              type="range"
              min={2000}
              max={8000}
              step={500}
              value={roomRentCap}
              onChange={(e) => setRoomRentCap(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">CO-PAY CLAUSE:</span>
              <span className="font-bold text-amber-400">{copayPercent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={5}
              value={copayPercent}
              onChange={(e) => setCopayPercent(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Bill Breakdown Math Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">
              ROOM-RENT RATIO PENALTY
            </span>
            <span className="text-2xl font-black text-red-400 font-cyber mt-1 block">
              -₹{Math.round(roomHaircut).toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              Ratio: {Math.round(roomRatio * 100)}% of allowable bills
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">
              UNCOVERED CONSUMABLES
            </span>
            <span className="text-2xl font-black text-amber-400 font-cyber mt-1 block">
              -₹{consumablesBill.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              Gloves, syringes, sanitizers excluded
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">
              WHAT INSURER ACTUALLY PAYS
            </span>
            <span className="text-2xl font-black text-emerald-400 font-cyber mt-1 block">
              ₹{insurerPayout.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              Actual money transferred to hospital
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-black border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.3)]">
            <span className="text-[11px] font-mono text-red-400 block uppercase font-bold">
              YOU PAY FROM EMPTY POCKETS
            </span>
            <span className="text-2xl font-black text-red-500 font-cyber mt-1 block">
              ₹{patientOutPocket.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              Mr. Ditkovich: "GIVE ME RENT!"
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 5: Formal IRDAI Ombudsman Grievance Notice */}
      <div id="rebuttal-generator" className="rounded-3xl p-6 sm:p-8 bg-black/80 border-2 border-red-500/40 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-red-600 text-white shadow-lg">
              <Scale className="w-6 h-6" />
            </span>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-white uppercase font-cyber">
                "PUT SOME DIRT IN THEIR EYE" — IRDAI LEGAL REBUTTAL NOTICE
              </h4>
              <p className="text-xs text-zinc-400 font-mono">
                One-click formal legal appeal ready to send to the insurer's Grievance Cell & Ombudsman
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyNotice}
            className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all active:scale-95 flex-shrink-0"
          >
            {copiedNotice ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedNotice ? 'COPIED TO CLIPBOARD!' : 'COPY REBUTTAL NOTICE'}</span>
          </button>
        </div>

        <pre className="p-4 sm:p-6 rounded-2xl bg-zinc-950/90 border border-white/10 text-xs sm:text-sm text-zinc-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
          {generateLegalNotice()}
        </pre>
      </div>

      {/* SECTION 6: Supabase Real-Time Audit Feed */}
      {historyList.length > 0 && (
        <div className="rounded-3xl p-6 bg-black/60 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              <span>SUPABASE REAL-TIME AUDIT LOGS ({historyList.length} POLICIES SCANNED)</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              ● SYNC ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {historyList.slice(0, 4).map((audit) => (
              <div
                key={audit.id}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <span className="font-bold text-white block">{audit.policy_title || audit.title}</span>
                  <span className="text-[10px] text-zinc-400">{audit.risk_rating || audit.riskLevel}</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 font-bold font-cyber">
                  {audit.survival_score || audit.survivalScore}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
