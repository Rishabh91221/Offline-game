import { ACT1, currentScene, type GameState } from '@ramayan/core';

/** Public view of the current scene. Deliberately omits axis scores (revealed only at act end). */
export function sceneView(state: GameState) {
  const scene = currentScene(state);
  if (!scene) return null;
  return {
    id: scene.id,
    index: state.answers.length,
    total: ACT1.scenes.length,
    title: scene.title,
    narrative: scene.narrative,
    prompt: scene.prompt,
    choices: scene.choices.map((c) => ({ id: c.id, text: c.text })),
  };
}
