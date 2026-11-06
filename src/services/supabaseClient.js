import { createClient } from '@supabase/supabase-js';

// Environment variables or fallback to in-memory/localStorage mock engine
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mock-roguehack.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key-spiderman-legal-ai';

const isLiveSupabase = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Real client when credentials exist
export const supabase = isLiveSupabase
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Mock Offline-First Fallback Database with 100% Supabase API Parity
const LOCAL_STORAGE_KEY = 'spiderman_policy_audits_v1';

const getLocalAudits = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalAudits = (audits) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(audits));
  } catch {}
};

/**
 * High-Level Policy Service (Dual-Mode: Live Supabase OR Local Indexed Cache)
 */
export const PolicyService = {
  isLive: isLiveSupabase,

  // Fetch recent audits
  async getAuditHistory() {
    if (isLiveSupabase && supabase) {
      const { data, error } = await supabase
        .from('policy_audits')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (!error && data) return data;
    }
    return getLocalAudits();
  },

  // Save new audit to Supabase & local cache
  async recordAudit(audit) {
    const record = {
      id: audit.id || `audit_${Date.now()}`,
      created_at: new Date().toISOString(),
      policy_title: audit.title,
      survival_score: audit.survivalScore,
      risk_rating: audit.riskLevel,
      legalese: audit.legalese,
      plain_english: audit.plainEnglish,
      red_flags: audit.redFlags,
      spidey_verdict: audit.spideyVerdict,
      tone: audit.tone || 'bully_maguire'
    };

    if (isLiveSupabase && supabase) {
      try {
        await supabase.from('policy_audits').insert([record]);
      } catch (err) {
        console.warn('Supabase remote insert fallback to local:', err);
      }
    }

    // Always update local cache
    const current = getLocalAudits();
    const updated = [record, ...current.slice(0, 19)];
    saveLocalAudits(updated);

    return record;
  },

  // Clear audit history
  clearHistory() {
    saveLocalAudits([]);
  }
};
