import { NextResponse, type NextRequest } from 'next/server';
import { ACT1 } from '@ramayan/core';
import { freshState, sameOrigin, writeState } from '../../../../lib/session';
import { sceneView } from '../../../../lib/view';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const state = freshState();
  const res = NextResponse.json({ title: ACT1.title, intro: ACT1.intro, scene: sceneView(state) });
  writeState(res, state);
  return res;
}
