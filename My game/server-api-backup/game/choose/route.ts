import { NextResponse, type NextRequest } from 'next/server';
import { GameError, applyChoice, isComplete, scoreAct } from '@ramayan/core';
import { readState, sameOrigin, writeState } from '../../../../lib/session';
import { sceneView } from '../../../../lib/view';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const state = readState(req);
  if (!state) return NextResponse.json({ error: 'no_run' }, { status: 400 });

  let body: { choiceId?: unknown; justification?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  try {
    const { state: next, choice, flagged } = applyChoice(state, body.choiceId, body.justification);
    const done = isComplete(next);
    const res = NextResponse.json({
      consequence: choice.consequence,
      justificationIgnored: flagged,
      scene: done ? null : sceneView(next),
      result: done ? scoreAct(next) : null,
    });
    writeState(res, next);
    return res;
  } catch (e) {
    if (e instanceof GameError) return NextResponse.json({ error: e.code, message: e.message }, { status: 400 });
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
