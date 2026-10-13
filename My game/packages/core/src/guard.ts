export const MAX_JUSTIFICATION = 600;

const INJECTION_PATTERNS: RegExp[] = [
  /\bignore\b[^.]{0,40}\b(previous|above|prior|all|instructions?|rules?)\b/i,
  /\bdisregard\b[^.]{0,40}\b(previous|above|prior|all|instructions?|rules?)\b/i,
  /\b(forget|override|bypass)\b[^.]{0,30}\b(instructions?|rules?|prompt|scoring)\b/i,
  /\bsystem\s*prompt\b/i,
  /\byou\s+are\s+now\b/i,
  /\b(give|award|assign|set)\b[^.]{0,30}\b(max(imum)?|full|top|perfect|highest)\b[^.]{0,20}\b(score|marks|points)\b/i,
  /\b(100\s*\/\s*100|score\s*(of|=|:)?\s*100)\b/i,
  /<\s*\/?\s*(system|assistant|instructions?)\b/i,
  /पिछले\s+निर्देश|ऊपर\s+के\s+निर्देश.{0,20}(अनदेखा|भूल)|पूरे\s+अंक\s+दो/u,
];

export type Sanitized = { text: string; flagged: boolean };

export function sanitizeJustification(raw: unknown): Sanitized {
  if (typeof raw !== 'string') return { text: '', flagged: false };
  // strip control characters, collapse whitespace, normalise Unicode
  const cleaned = raw
    .normalize('NFKC')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁦-⁩]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_JUSTIFICATION);
  const flagged = INJECTION_PATTERNS.some((p) => p.test(cleaned));
  return { text: flagged ? '' : cleaned, flagged };
}
