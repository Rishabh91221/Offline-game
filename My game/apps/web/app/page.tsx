'use client';

import { useState } from 'react';
import { ACT1, applyChoice, isComplete, newState, scoreAct, type GameState } from '@ramayan/core';
import { sceneView } from '../lib/view';

type L = { en: string; hi: string };
type SceneV = { id: string; index: number; total: number; title: L; narrative: L; prompt: L; choices: { id: string; text: L }[] };
type Result = {
  axes: Record<string, number>; total: number; flagged: number;
  tier: { id: string; name: L; blurb: L };
};
type Lang = 'en' | 'hi';

const AXIS_LABEL: Record<string, L> = {
  svadharma: { en: 'Svadharma (own duty)', hi: 'स्वधर्म (Svadharma)' },
  samanyaDharma: { en: 'Samanya Dharma (universal values)', hi: 'सामान्य धर्म (Samanya Dharma)' },
  samsaraKalyana: { en: 'Welfare of the world', hi: 'लोक-कल्याण (Samsara Kalyana)' },
  viveka: { en: 'Viveka (discernment)', hi: 'विवेक (Viveka)' },
  nishkamaKarma: { en: 'Nishkama Karma (detached action)', hi: 'निष्काम कर्म (Nishkama Karma)' },
};

const UI = {
  begin: { en: 'Begin the journey', hi: 'यात्रा आरंभ करें' },
  scene: { en: 'Scene', hi: 'दृश्य' },
  of: { en: 'of', hi: 'में से' },
  why: { en: 'Why did you choose this? (optional, improves your reflection score)', hi: 'आपने यह क्यों चुना? (वैकल्पिक, आपके चिंतन-अंक को बढ़ाता है)' },
  next: { en: 'Continue', hi: 'आगे बढ़ें' },
  ignored: { en: 'Your written reflection was not counted because it looked like an instruction to the scorer.', hi: 'आपका लिखित चिंतन गिना नहीं गया क्योंकि वह मूल्यांकक को दिया गया निर्देश प्रतीत हुआ।' },
  total: { en: 'Dharma score', hi: 'धर्म-अंक' },
  again: { en: 'Play again', hi: 'फिर से खेलें' },
  note: { en: 'This is a reflective game, not a verdict on anyone. Interpretations of the Ramayana vary across traditions.', hi: 'यह एक चिंतनशील खेल है, किसी का निर्णय नहीं। रामायण की व्याख्याएँ परंपराओं में भिन्न-भिन्न हैं।' },
  error: { en: 'Something went wrong. Please try again.', hi: 'कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।' },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [phase, setPhase] = useState<'intro' | 'scene' | 'consequence' | 'result'>('intro');
  const [title, setTitle] = useState<L | null>(null);
  const [intro, setIntro] = useState<L | null>(null);
  const [scene, setScene] = useState<SceneV | null>(null);
  const [pending, setPending] = useState<{ consequence: L; scene: SceneV | null; result: Result | null; ignored: boolean } | null>(null);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [err, setErr] = useState(false);
  const t = (l: L) => l[lang];

  function start() {
    setBusy(true); setErr(false);
    try {
      // All gameplay runs locally; no API server, cookies, or network connection required.
      const state = newState(ACT1);
      setGameState(state);
      setTitle(ACT1.title); setIntro(ACT1.intro); setScene(sceneView(state));
      setPending(null); setText(''); setPhase('scene');
    } catch { setErr(true); } finally { setBusy(false); }
  }

  function choose(choiceId: string) {
    if (!gameState) { setErr(true); return; }
    setBusy(true); setErr(false);
    try {
      const { state: next, choice, flagged } = applyChoice(gameState, choiceId, text, ACT1);
      const done = isComplete(next, ACT1);
      setGameState(next);
      setPending({
        consequence: choice.consequence,
        scene: done ? null : sceneView(next),
        result: done ? scoreAct(next, ACT1) : null,
        ignored: flagged,
      });
      setPhase('consequence');
    } catch { setErr(true); } finally { setBusy(false); }
  }

  function next() {
    if (!pending) return;
    setText('');
    if (pending.result) { setPhase('result'); return; }
    setScene(pending.scene); setPhase('scene');
  }

  return (
    <main>
      <div className="lang" role="group" aria-label="Language">
        <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
        <button aria-pressed={lang === 'hi'} onClick={() => setLang('hi')}>हिन्दी</button>
      </div>
      <h1>{title ? t(title) : lang === 'en' ? 'Ramayan: The Eternal Path' : 'रामायण: शाश्वत पथ'}</h1>

      {phase === 'intro' && (
        <div className="card">
          <p>{lang === 'en'
            ? 'An interactive retelling of the Ayodhya Kanda. Make five choices as Rama and see how they weigh on five lenses of dharma.'
            : 'अयोध्याकांड की एक इंटरैक्टिव पुनर्कथा। राम के रूप में पाँच निर्णय लें और देखें कि वे धर्म (Dharma) के पाँच दृष्टिकोणों पर कैसे तौले जाते हैं।'}</p>
          <button className="primary" onClick={start} disabled={busy}>{t(UI.begin)}</button>
        </div>
      )}

      {phase === 'scene' && scene && (
        <section className="card" aria-live="polite">
          {scene.index === 0 && intro && <p className="muted">{t(intro)}</p>}
          <p className="muted">{t(UI.scene)} {scene.index + 1} {t(UI.of)} {scene.total}</p>
          <h2>{t(scene.title)}</h2>
          <p>{t(scene.narrative)}</p>
          <p><strong>{t(scene.prompt)}</strong></p>
          <label className="muted" htmlFor="why">{t(UI.why)}</label>
          <textarea id="why" maxLength={600} value={text} onChange={(e) => setText(e.target.value)} />
          {scene.choices.map((c) => (
            <button key={c.id} disabled={busy} onClick={() => choose(c.id)}>{t(c.text)}</button>
          ))}
        </section>
      )}

      {phase === 'consequence' && pending && (
        <section className="card" aria-live="polite">
          <p>{t(pending.consequence)}</p>
          {pending.ignored && <p className="muted">{t(UI.ignored)}</p>}
          <button className="primary" onClick={next}>{t(UI.next)}</button>
        </section>
      )}

      {phase === 'result' && pending?.result && (
        <section className="card" aria-live="polite">
          <h2>{t(pending.result.tier.name)}</h2>
          <p>{t(pending.result.tier.blurb)}</p>
          <p><strong>{t(UI.total)}: {pending.result.total} / 100</strong></p>
          {Object.entries(pending.result.axes).map(([k, v]) => (
            <div key={k} style={{ margin: '12px 0' }}>
              <div className="muted">{t(AXIS_LABEL[k] ?? { en: k, hi: k })} — {v}</div>
              <div className="bar" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${v}%` }} /></div>
            </div>
          ))}
          <p className="muted">{t(UI.note)}</p>
          <button className="primary" onClick={start} disabled={busy}>{t(UI.again)}</button>
        </section>
      )}

      {err && <p role="alert" className="muted">{t(UI.error)}</p>}
    </main>
  );
}
