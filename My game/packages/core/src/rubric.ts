import { AXES, type Axis, type AxisScores } from './types.ts';

// Deterministic, transparent rubric: a short reflective justification can nudge each axis by up to +8.
// It rewards *engagement with the relevant idea*, never length alone, and can never lower a score.
const KEYWORDS: Record<Axis, string[]> = {
  svadharma: ['duty', 'role', 'prince', 'son', 'promise', 'vow', 'responsib', 'कर्तव्य', 'दायित्व', 'वचन', 'पुत्र', 'प्रतिज्ञा'],
  samanyaDharma: ['truth', 'honest', 'non-violence', 'respect', 'restraint', 'kindness', 'सत्य', 'अहिंसा', 'संयम', 'सम्मान', 'दया'],
  samsaraKalyana: ['people', 'citizens', 'kingdom', 'everyone', 'welfare', 'peace', 'society', 'प्रजा', 'जनता', 'राज्य', 'कल्याण', 'शांति', 'समाज'],
  viveka: ['consequence', 'wisdom', 'consider', 'weigh', 'think', 'discern', 'परिणाम', 'विवेक', 'विचार', 'सोच'],
  nishkamaKarma: ['detach', 'without desire', 'selfless', 'sacrifice', 'ego', 'attachment', 'अनासक्ति', 'निष्काम', 'त्याग', 'अहंकार', 'आसक्ति'],
};

export const MIN_JUSTIFICATION_CHARS = 25;
export const MAX_BONUS_PER_AXIS = 8;

export function rubricBonus(text: string): AxisScores {
  const out: AxisScores = { svadharma: 0, samanyaDharma: 0, samsaraKalyana: 0, viveka: 0, nishkamaKarma: 0 };
  if (text.length < MIN_JUSTIFICATION_CHARS) return out;
  const lower = text.toLowerCase();
  for (const axis of AXES) {
    const hits = KEYWORDS[axis].filter((k) => lower.includes(k.toLowerCase())).length;
    out[axis] = Math.min(MAX_BONUS_PER_AXIS, hits * 4);
  }
  return out;
}
