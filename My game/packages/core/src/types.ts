export type Lang = 'en' | 'hi';
export type Localized = { en: string; hi: string };

export const AXES = ['svadharma', 'samanyaDharma', 'samsaraKalyana', 'viveka', 'nishkamaKarma'] as const;
export type Axis = (typeof AXES)[number];
export type AxisScores = Record<Axis, number>;

export type Choice = {
  id: string;
  text: Localized;
  consequence: Localized;
  /** 0-100 per axis. */
  axes: AxisScores;
};

export type Scene = {
  id: string;
  title: Localized;
  narrative: Localized;
  prompt: Localized;
  choices: Choice[];
};

export type Act = { id: string; title: Localized; intro: Localized; scenes: Scene[] };

export type Answer = { sceneId: string; choiceId: string; justification?: string; flagged?: boolean };

export type Tier = { id: string; min: number; name: Localized; blurb: Localized };

export type ActResult = {
  axes: AxisScores;
  total: number;
  tier: Tier;
  flagged: number;
};
