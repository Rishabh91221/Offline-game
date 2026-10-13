import { ACT1 } from './act1.ts';
import { sanitizeJustification } from './guard.ts';
import { rubricBonus } from './rubric.ts';
import { clamp, tierFor, weightedTotal } from './scoring.ts';
import { AXES, type Act, type ActResult, type Answer, type AxisScores, type Choice, type Scene } from './types.ts';

export const MAX_ANSWERS = 50;

export type GameState = { actId: string; answers: Answer[] };

export const newState = (act: Act = ACT1): GameState => ({ actId: act.id, answers: [] });

export function currentScene(state: GameState, act: Act = ACT1): Scene | null {
  return act.scenes[state.answers.length] ?? null;
}

export const isComplete = (state: GameState, act: Act = ACT1): boolean => state.answers.length >= act.scenes.length;

export class GameError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

/** Server-authoritative: validates that the choice belongs to the *current* scene. Pure; returns new state. */
export function applyChoice(
  state: GameState,
  choiceId: unknown,
  justification?: unknown,
  act: Act = ACT1,
): { state: GameState; choice: Choice; scene: Scene; flagged: boolean } {
  const scene = currentScene(state, act);
  if (!scene) throw new GameError('act_complete', 'This act is already complete.');
  if (typeof choiceId !== 'string') throw new GameError('bad_choice', 'Choice is required.');
  const choice = scene.choices.find((c) => c.id === choiceId);
  if (!choice) throw new GameError('bad_choice', 'Unknown choice for this scene.');
  const { text, flagged } = sanitizeJustification(justification);
  const answer: Answer = { sceneId: scene.id, choiceId: choice.id, ...(text ? { justification: text } : {}), ...(flagged ? { flagged: true } : {}) };
  return { state: { ...state, answers: [...state.answers, answer] }, choice, scene, flagged };
}

/** Re-derives the result from the content, never from client-supplied scores. */
export function scoreAct(state: GameState, act: Act = ACT1): ActResult {
  if (!isComplete(state, act)) throw new GameError('act_incomplete', 'Finish the act to see your result.');
  const sums: AxisScores = { svadharma: 0, samanyaDharma: 0, samsaraKalyana: 0, viveka: 0, nishkamaKarma: 0 };
  let flagged = 0;
  act.scenes.forEach((scene, i) => {
    const ans = state.answers[i];
    const choice = scene.choices.find((c) => c.id === ans?.choiceId);
    if (!ans || ans.sceneId !== scene.id || !choice) throw new GameError('corrupt_state', 'Saved progress is invalid.');
    const { text, flagged: f } = sanitizeJustification(ans.justification);
    if (f || ans.flagged === true) flagged++;
    const bonus = rubricBonus(text);
    for (const axis of AXES) sums[axis] += clamp(choice.axes[axis] + bonus[axis]);
  });
  const axes = { ...sums };
  for (const axis of AXES) axes[axis] = Math.round((sums[axis] / act.scenes.length) * 10) / 10;
  const total = weightedTotal(axes);
  return { axes, total, tier: tierFor(total), flagged };
}
