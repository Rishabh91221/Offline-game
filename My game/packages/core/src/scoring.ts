import { AXES, type AxisScores, type Tier } from './types.ts';

export const WEIGHTS: AxisScores = {
  svadharma: 0.25,
  samanyaDharma: 0.2,
  samsaraKalyana: 0.25,
  viveka: 0.15,
  nishkamaKarma: 0.15,
};

export const clamp = (n: number, lo = 0, hi = 100): number => Math.min(hi, Math.max(lo, n));

export function weightedTotal(axes: AxisScores): number {
  let t = 0;
  for (const a of AXES) t += axes[a] * WEIGHTS[a];
  return Math.round(clamp(t) * 10) / 10;
}

// Reflective, non-judgemental names; ordered high to low.
export const TIERS: Tier[] = [
  { id: 'rishi', min: 80, name: { en: 'Rishi-tulya', hi: 'ऋषितुल्य (Rishi-tulya)' },
    blurb: { en: 'Your choices held duty, compassion and detachment together with rare steadiness.',
             hi: 'आपके निर्णयों में कर्तव्य, करुणा और अनासक्ति दुर्लभ स्थिरता के साथ एक साथ दिखे।' } },
  { id: 'dharmatma', min: 70, name: { en: 'Dharmatma', hi: 'धर्मात्मा (Dharmatma)' },
    blurb: { en: 'A principled path, with only small tensions between your duties.',
             hi: 'सिद्धांतनिष्ठ मार्ग, जिसमें आपके कर्तव्यों के बीच केवल छोटे द्वंद्व रहे।' } },
  { id: 'sadhu', min: 55, name: { en: 'Sadhu', hi: 'साधु (Sadhu)' },
    blurb: { en: 'Good instincts. Some choices favoured feeling or haste over wider duty.',
             hi: 'अच्छी प्रवृत्तियाँ। कुछ निर्णयों में भावना या शीघ्रता व्यापक कर्तव्य से आगे रही।' } },
  { id: 'grihastha', min: 40, name: { en: 'Grihastha', hi: 'गृहस्थ (Grihastha)' },
    blurb: { en: 'You weighed personal bonds heavily; the wider consequences got less weight.',
             hi: 'आपने व्यक्तिगत संबंधों को अधिक महत्व दिया; व्यापक परिणामों को कम।' } },
  { id: 'jijnasu', min: 0, name: { en: 'Jijnasu (the seeker)', hi: 'जिज्ञासु (Jijnasu)' },
    blurb: { en: 'Dharma is hard. Replay the act and notice what changes when you pause before choosing.',
             hi: 'धर्म कठिन है। खेल दोबारा खेलें और देखें कि चुनने से पहले ठहरने पर क्या बदलता है।' } },
];

export function tierFor(total: number): Tier {
  return TIERS.find((t) => total >= t.min) ?? TIERS[TIERS.length - 1]!;
}
