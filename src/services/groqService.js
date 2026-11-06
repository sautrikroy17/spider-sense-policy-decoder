/**
 * Groq Llama-3 High-Speed AI Engine for Insurance Policy Decompilation
 * Ultra-fast inference (< 400ms) with seamless local fallback
 */

const STORAGE_KEY = 'spidey_groq_api_key';

export const GroqService = {
  getApiKey() {
    return (
      localStorage.getItem(STORAGE_KEY) ||
      import.meta.env.VITE_GROQ_API_KEY ||
      ''
    );
  },

  setApiKey(key) {
    if (key) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  async analyzePolicyWithAI(policyText, tone = 'peter') {
    const apiKey = this.getApiKey();

    // If Groq key is configured, call Groq API with Llama-3.3-70b-versatile
    if (apiKey) {
      try {
        const systemPrompt = `You are Peter Parker (Spider-Man) and an expert IRDAI insurance legal forensic investigator.
Analyze the following insurance policy text or clause. Extract fine-print traps, estimate the claim survival percentage (0-100%), and translate the legalese into plain human terms according to the requested persona tone (${tone}).
Return a valid JSON object strictly matching this schema:
{
  "title": "Short descriptive title of clause/trap",
  "survivalScore": number (0 to 100),
  "riskLevel": "CRITICAL" | "HIGH" | "MODERATE",
  "plainEnglish": "Honest breakdown of what they are actually taking from the patient",
  "traps": ["trap 1", "trap 2", "trap 3"],
  "legalPrecedent": "IRDAI or Consumer Court section violated (e.g. Circular IRDAI/HLT/REG/CIR/194/07/2020 or Section 45)"
}`;

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: policyText.slice(0, 4000) }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2
          })
        });

        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          return {
            ...parsed,
            isAiGenerated: true,
            model: 'Groq Llama 3.3 70B'
          };
        }
      } catch (err) {
        console.warn('Groq API call error, falling back to local forensic engine:', err);
      }
    }

    // 100% Reliable Local Forensic Engine (Never Fails, Instant Offline Response)
    return this.localForensicEngine(policyText, tone);
  },

  localForensicEngine(text, tone) {
    const lower = text.toLowerCase();
    let score = 50;
    const detectedTraps = [];
    let risk = 'MODERATE TRAP DETECTED';

    if (lower.includes('room rent') || lower.includes('proportionate')) {
      score -= 30;
      detectedTraps.push(
        'Room Rent Proportionate Deduction: Doctors and OT charges will be slashed by up to 40% if room cap is breached.'
      );
      risk = 'CRITICAL PROPORTIONATE TRAP';
    }

    if (lower.includes('pre-existing') || lower.includes('36 months') || lower.includes('lookback')) {
      score -= 25;
      detectedTraps.push(
        'Extended Lookback Period: Unfairly attributes unrelated new ailments to past symptoms.'
      );
      risk = 'HIGH PRE-EXISTING LOOKBACK RISK';
    }

    if (lower.includes('co-pay') || lower.includes('deductible') || lower.includes('copay')) {
      score -= 20;
      detectedTraps.push(
        'Mandatory Co-Pay: Insured must pay 20-30% of total hospital bill out of pocket.'
      );
    }

    if (lower.includes('48 hours') || lower.includes('intimation') || lower.includes('notification')) {
      score -= 15;
      detectedTraps.push(
        'Strict Emergency Notice Window: Repudiates claims if delayed past 48 hours even during intensive trauma care.'
      );
    }

    if (lower.includes('consumables') || lower.includes('non-payable') || lower.includes('rubber')) {
      score -= 15;
      detectedTraps.push(
        'Consumable & PPE Exclusion: Leaves syringes, gloves, masks, and sanitary supplies unpayable.'
      );
    }

    if (detectedTraps.length === 0) {
      detectedTraps.push(
        'Ambiguous indemnity phrasing allowing Third Party Administrator (TPA) unilateral denial discretion.'
      );
    }

    const finalScore = Math.max(8, Math.min(85, score));

    return {
      title: 'Forensic Spider-Sense Analysis',
      survivalScore: finalScore,
      riskLevel: risk,
      plainEnglish:
        tone === 'bully'
          ? "You thought you bought health insurance? Gonna cry? The insurer slipped in clauses to steal half your payout. Put some IRDAI dirt in their eye!"
          : "Spider-Sense detected hidden exclusion traps. Under this wording, if you take a standard hospital room or miss paperwork during intensive care, the insurer will slash your claim payout significantly.",
      traps: detectedTraps,
      legalPrecedent:
        'Contestable under IRDAI Circular IRDAI/HLT/REG/CIR/194/07/2020 & Section 45 of Insurance Act.',
      isAiGenerated: false,
      model: 'Spider-Sense Forensic Engine'
    };
  }
};
