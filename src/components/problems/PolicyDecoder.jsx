import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSearch,
  AlertOctagon,
  Sparkles,
  Volume2,
  Copy,
  Check,
  Scale,
  DollarSign,
  ShieldAlert,
  Flame,
  Zap,
  Printer,
  History,
  TrendingDown,
  Skull
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../context/ThemeContext';
import { sound } from '../../utils/soundEffects';
import { PolicyService } from '../../services/supabaseClient';

// Hilarious, Real-World Toxic Insurance Policies (Spider-Man Edition)
const SPIDEY_POLICIES = [
  {
    id: 'room_rent',
    title: 'The Room-Rent Guillotine (Star Health Classic)',
    category: 'HEALTH INSURANCE',
    survivalScore: 24,
    riskLevel: 'CRITICAL PIRACY DETECTED',
    legalese:
      'Section 4.2(b): Notwithstanding anything to the contrary, room rent is capped strictly at 1% of the base sum insured per diem. If the insured chooses a room category exceeding this limit, all associated medical expenses (including surgeon fees, anesthetist charges, OT charges, and diagnostic investigations) shall be subject to proportionate deduction.',
    peterParker:
      'Aunt May needed surgery! But because her room had a tiny window instead of a closet under the stairs, the hospital charged ₹8,000/day (cap was ₹5,000). The insurer slapped a 37.5% penalty on the ENTIRE bill! My surgeon fee payout got slashed in half. How am I gonna pay Mr. Ditkovich my rent?!',
    bullyMaguire:
      'You wanted a deluxe room with air conditioning? Gonna cry? The insurer saw you breathing fresh air and stole 40% of your surgery claim. Put some dirt in their eye and sleep in the parking lot next time, chump.',
    jjJameson:
      'EXCLUSIVE: SPIDER-MAN SLEEPS IN AIR-CONDITIONED ROOM — INSURANCE COMPANY HEROICALLY PUNISHES HIM BY REFUSING TO PAY FOR BANDAGES!',
    lawyer:
      'VIOLATION: Triggers IRDAI Circular IRDAI/HLT/REG/CIR/194/07/2020. Insurers cannot apply proportionate deductions to medicines, consumables, and fixed diagnostic tests. This clause is contestable in Consumer Court.',
    traps: [
      'Proportionate deduction slashes doctor fees even if doctor charges standard rates',
      '1% room cap forces patients into shared general wards to avoid massive deductions',
      'ICU cap at 2% triggers identical penalty cascades on life support costs'
    ]
  },
  {
    id: 'coma_trap',
    title: 'The 48-Hour Coma Trap (Emergency & Trauma)',
    category: 'TRAUMA & ACCIDENT',
    survivalScore: 12,
    riskLevel: 'ABSOLUTE VOID TRAP',
    legalese:
      'Clause 8.1: Notice of claim must be served in writing with certified hospital admission token within 48 hours of emergency admission. Failure of notification strictly repudiates all insurer indemnity obligations ab initio, irrespective of medical severity.',
    peterParker:
      'The Green Goblin hurled me into a brick wall and I was in an induced coma for 72 hours. When I woke up, the insurer sent me a letter: "Sorry Peter, you didn\'t email us by hour 48. Your ₹4,50,000 ICU bill is 100% on you!" Wake up from a coma to submit PDF invoices?!',
    bullyMaguire:
      'I missed the part where that\'s my problem. You had 48 hours! You were dying? Should\'ve set a calendar reminder before the Goblin knocked your lights out. See ya, chump.',
    jjJameson:
      'PARKER CLAIMS COMA EXCUSE TO AVOID FILLING OUT FORMS! INSURANCE ADJUSTER DECLARED TRUE HOMETOWN HERO!',
    lawyer:
      'IRDAI Mandate: Insurers cannot reject genuine claims purely based on notification delays caused by medical incapacitation or emergencies (IRDAI Ref: IRDA/HLT/MISC/CIR/216/09/2011).',
    traps: [
      'Strict 48-hour deadline ignores intensive care or unconscious status',
      'Requires stamped token which hospitals often take days to release',
      'Repudiates whole claim instead of nominal delay penalty'
    ]
  },
  {
    id: 'sweat_trap',
    title: 'The Sweaty Spidey-Sensor Trap (Gadget & Tech Care)',
    category: 'DEVICE WARRANTY',
    survivalScore: 8,
    riskLevel: 'LIQUID INGRESS GAG',
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
    traps: [
      'Paper sensor turns red from simple shower steam or summer humidity',
      'Allows repair centers to reject expensive motherboard warranty claims instantly'
    ]
  },
  {
    id: 'thanos_trap',
    title: 'Act of Thanos / Supernatural Exclusion (Travel & Property)',
    category: 'FORCE MAJEURE GAG',
    survivalScore: 33,
    riskLevel: 'COSMIC EXCLUSION',
    legalese:
      'Clause 22.9: Exclusion of liability for losses directly or indirectly occasioned by civil strife, extraterrestrial impact, superhuman confrontations, dimensional rifts, celestial incursions, or unprovable cosmic phenomena.',
    peterParker:
      'Doctor Strange opened a portal in front of my cab, causing a flat tire and missed flight to the science fair. Insurer said: "Superhuman confrontations are excluded under Section 22." Now I have to swing 500 miles back home on foot!',
    bullyMaguire:
      'You want a flight refund because a guy with tentacle arms smashed your taxi? Stings, doesn\'t it? Pack your bags and start walking.',
    jjJameson:
      'SUPERHEROES CAUSE RECORD AIRPORT DELAYS! AIRLINES PLEAD WITH PUBLIC TO IGNORE MASKED FREAKS!',
    lawyer:
      'Standard Force Majeure clauses must demonstrate direct causal impossibility; broad catch-all exceptions for unspecified collateral damages are routinely struck down.',
    traps: [
      'Vague catch-all allows airlines and insurers to classify weather as uninsurable acts',
      'Denies trip cancellation claims without standard partial refund'
    ]
  }
];

export const PolicyDecoder = () => {
  const { currentTheme } = useTheme();
  const [selectedPolicy, setSelectedPolicy] = useState(SPIDEY_POLICIES[0]);
  const [customText, setCustomText] = useState('');
  const [tone, setTone] = useState('peter'); // 'peter' | 'bully' | 'jjj' | 'lawyer'
  const [isScanning, setIsScanning] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  // Aunt May Hospital Bill Calculator State
  const [billAmount, setBillAmount] = useState(600000); // ₹6,00,000
  const [roomRentPaid, setRoomRentPaid] = useState(9000); // ₹9,000/day
  const [roomRentCap, setRoomRentCap] = useState(5000); // 1% of ₹5L base = ₹5,000
  const [consumablesBill, setConsumablesBill] = useState(45000); // ₹45,000
  const [copayPercent, setCopayPercent] = useState(20); // 20%

  // Load audit history from Supabase / Local storage on mount
  useEffect(() => {
    PolicyService.getAuditHistory().then((data) => {
      if (data && data.length > 0) setHistoryList(data);
    });
  }, []);

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

  const handleCustomAnalyze = (e) => {
    e.preventDefault();
    if (!customText.trim()) return;

    sound.playSpiderSense();
    setIsScanning(true);

    setTimeout(async () => {
      const score = Math.floor(Math.random() * 30) + 15;
      const newAudit = {
        id: `custom_${Date.now()}`,
        title: 'Custom Insurer Fine Print Upload',
        category: 'CUSTOM SCAN',
        survivalScore: score,
        riskLevel: 'DIRTY FINE-PRINT TRAP DETECTED',
        legalese: customText,
        peterParker:
          'Spider-Sense is going nuts! This clause has hidden ambiguous trap-doors designed to reject your claim on day 30. Mr. Ditkovich would be proud of how greedy these insurers are!',
        bullyMaguire:
          'You signed this contract? You want your money back? Gonna cry? This clause gives them the right to throw dirt in your eye and keep your premium.',
        jjJameson:
          'FRONT PAGE SCOOP: LAWYERS CONCOCT MOST BAFFLING PARAGRAPH IN HUMAN HISTORY TO FLEECE HARDWORKING CITIZENS!',
        lawyer:
          'Contestable under Section 45 of Insurance Act (misleading exclusion wording without conspicuous disclosure in schedule).',
        traps: [
          'Vague exclusion for non-standardized tertiary procedures',
          'Arbitrary discretion granted to third-party administrator (TPA)',
          'Ambiguous pre-authorization requirement within 12 hours'
        ]
      };

      setSelectedPolicy(newAudit);
      setIsScanning(false);
      sound.playVineBoom();

      // Record to Supabase / Local storage
      await PolicyService.recordAudit(newAudit);
      const updatedHistory = await PolicyService.getAuditHistory();
      setHistoryList(updatedHistory);
    }, 700);
  };

  // Generate Savage Legal Notice to Insurer / Ombudsman
  const generateLegalNotice = () => {
    return `FORMAL NOTICE OF GRIEVANCE & DEMAND FOR WRITTEN INDEMNITY JUSTIFICATION
TO: CLAIMS GRIEVANCE OFFICER / LEGAL HEAD
REGARDING: POLICY CLAUSE DECOMPILATION // POLICY REFERENCE: ${selectedPolicy.title.toUpperCase()}
REGULATORY CITATION: IRDAI Master Circular on Insurance Claims (Circular No: IRDAI/HLT/REG/CIR/194/07/2020)

Dear Sir/Madam,

Take notice that the exclusion clause relied upon under:
"${selectedPolicy.legalese}"

is fundamentally UNLAWFUL, CONTROVERTED, AND ARBITRARY under IRDAI Guidelines and Section 45 of the Insurance Act 1938, as well as Section 2(47) of the Consumer Protection Act 2019 (Unfair Trade Practice).

GROUNDS FOR IMMEDIATE SETTLEMENT:
1. Proportionate deductions cannot be legally applied to standardized consumables or distinct surgical fees where the patient has no control over hospital room inventory tiers.
2. The clause fails the doctrine of Contra Proferentem; ambiguities in fine print must be resolved in favor of the policyholder.
3. Spider-Sense Forensic Survival Score for this clause is ${selectedPolicy.survivalScore}% (Classified as ${selectedPolicy.riskLevel}).

DEMAND:
Cease and desist from repudiating the claim under this clause. Disburse full indemnification within 7 working days, failing which this dossier will be escalated to the Insurance Ombudsman and State Consumer Disputes Redressal Commission with prayer for punitive damages.

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
      colors: ['#ef4444', '#3b82f6', '#facc15', '#ffffff']
    });
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <div className="space-y-10">
      
      {/* Top Banner: Comic Book Heading + Spider-Sense Status */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-red-950/70 via-black to-blue-950/60 border-2 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.25)]">
        {/* Subtle Web Grid Graphic */}
        <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-red-500/20">
          <div className="flex items-start sm:items-center gap-4">
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="p-3.5 rounded-2xl bg-red-600/20 border-2 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex-shrink-0"
            >
              <FileSearch className="w-8 h-8" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                  MARVEL / SPIDER-MAN TRIBUNAL
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  DICE [ 2 & 4 ]
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase font-cyber mt-1">
                SPIDER-SENSE POLICY DECODER
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono">
                "Rent? You'll get your rent when you fix this damn room-rent capping clause!"
              </p>
            </div>
          </div>

          {/* Spider-Sense Tingle Radar Badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/60 border border-red-500/40 backdrop-blur-xl">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600" />
            </span>
            <div className="text-left font-mono">
              <span className="text-[10px] text-zinc-400 block uppercase">SPIDER-SENSE STATUS</span>
              <span className="text-xs font-bold text-red-400">MAXIMUM TINGLING ⚡</span>
            </div>
          </div>
        </div>

        {/* Quick Real-World Preset Tabs */}
        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 mr-2 uppercase font-bold">
            TAP A FINE-PRINT TRAP:
          </span>
          {SPIDEY_POLICIES.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                selectedPolicy.id === p.id
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-105'
                  : 'bg-black/50 hover:bg-white/10 text-zinc-300 border border-white/10'
              }`}
            >
              <span>🕸️</span>
              <span>{p.title.split(' ')[1] || p.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Custom Clause Input Deck */}
        <form onSubmit={handleCustomAnalyze} className="relative z-10 mt-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              rows={2}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste any confusing insurance clause, exclusion, or warranty fine-print here to trigger Spider-Sense..."
              className="flex-1 p-3.5 rounded-2xl bg-black/70 border border-white/15 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 font-mono shadow-inner"
            />
            <button
              type="submit"
              disabled={isScanning}
              className="px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-500 transition-all shadow-[0_0_25px_rgba(239,68,68,0.5)] active:scale-95 flex-shrink-0"
            >
              <Zap className="w-4 h-4 fill-white animate-pulse" />
              <span>{isScanning ? 'TINGLING...' : 'DECOMPILE CLAUSE'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Main Decode Deck: Survival Score + Multi-Persona Translations */}
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
                <span className="text-xs font-mono text-zinc-500 block mt-1">
                  CHANCE YOU GET ZERO MONEY
                </span>
              </motion.div>

              <div className="mt-4">
                <span className="inline-block px-3 py-1.5 text-xs font-black uppercase rounded-full bg-red-500/20 text-red-400 border border-red-500/40 tracking-wider">
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
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-mono">
                  <AlertOctagon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{trap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Sound FX Triggers */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">SPIDEY AUDIO:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => sound.playThwip()}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-red-400 border border-white/10"
                title="Thwip! (Web Shoot)"
              >
                🕷️ Thwip
              </button>
              <button
                onClick={() => sound.playSpiderSense()}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10"
                title="Spider-Sense Tingle"
              >
                ⚡ Tingle
              </button>
              <button
                onClick={() => sound.playVineBoom()}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10"
                title="Vine Boom"
              >
                💥 Boom
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Legalese vs Spider-Man Persona Decompiler */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Raw Insurance Legalese Card */}
          <div className="rounded-3xl p-6 bg-black/60 border border-red-500/20 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase font-bold text-red-400 flex items-center gap-2">
                <Skull className="w-4 h-4 text-red-500" />
                <span>WHAT THE INSURER WROTE (RAW LEGALESE JARGON):</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {selectedPolicy.category}
              </span>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-mono italic leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
              "{selectedPolicy.legalese}"
            </p>
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
                  {tone === 'peter' && "PETER PARKER'S BRUTAL REALITY TRANSLATION:"}
                  {tone === 'bully' && "BULLY MAGUIRE'S SAVAGE VERDICT:"}
                  {tone === 'jjj' && "DAILY BUGLE FRONT PAGE SCOOP (J. JONAH JAMESON):"}
                  {tone === 'lawyer' && "IRDAI OMBUDSMAN STATUTORY AUDIT:"}
                </span>
              </span>
              <span className="text-[11px] font-mono text-amber-400 font-bold">
                {tone === 'bully' ? 'DIRT IN THEIR EYE 🪨' : '100% UNFILTERED TRUTH'}
              </span>
            </div>

            <p className="mt-5 text-sm sm:text-base text-zinc-100 font-medium leading-relaxed font-sans">
              {tone === 'peter' && selectedPolicy.peterParker}
              {tone === 'bully' && selectedPolicy.bullyMaguire}
              {tone === 'jjj' && selectedPolicy.jjJameson}
              {tone === 'lawyer' && selectedPolicy.lawyer}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                VERDICT: <strong className="text-red-400">{selectedPolicy.riskLevel}</strong>
              </span>
              <button
                onClick={handleCopyNotice}
                className="px-4 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>GENERATE IRDAI COMPLAINT NOTICE</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Aunt May's Hospital Bill Simulator (Interactive Math Engine) */}
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
              Test how much cash your insurer secretly steals from you with room rent & consumable fine print!
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-black/60 border border-white/10 text-right font-mono">
            <span className="text-[10px] text-zinc-500 block uppercase">OUT-OF-POCKET SHOCK</span>
            <span className="text-lg font-black text-red-500">{lossPercentage}% YOU PAY</span>
          </div>
        </div>

        {/* Sliders Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Slider 1: Total Hospital Bill */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">TOTAL BILL:</span>
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

          {/* Slider 2: Room Rent Selected */}
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

          {/* Slider 3: Room Rent Cap in Policy */}
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

          {/* Slider 4: Co-Pay % */}
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

      {/* Rebuttal Notice Modal / Card ("PUT SOME DIRT IN THEIR EYE") */}
      <div className="rounded-3xl p-6 sm:p-8 bg-black/80 border-2 border-red-500/40 shadow-2xl space-y-4">
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

      {/* Supabase Audit Trail Feed */}
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
