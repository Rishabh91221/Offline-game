import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest, NextResponse } from 'next/server';
import { ACT1, MAX_ANSWERS, newState, type GameState } from '@ramayan/core';

const COOKIE = 'ramayan_run';

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET (>=16 chars) is required in production');
  return 'dev-only-insecure-secret';
}

const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url');

export function encodeState(state: GameState): string {
  const payload = Buffer.from(JSON.stringify(state)).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function decodeState(raw: string | undefined): GameState | null {
  if (!raw) return null;
  const [payload, sig] = raw.split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const s = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as GameState;
    if (s.actId !== ACT1.id || !Array.isArray(s.answers) || s.answers.length > MAX_ANSWERS) return null;
    return s;
  } catch {
    return null;
  }
}

export const readState = (req: NextRequest): GameState | null => decodeState(req.cookies.get(COOKIE)?.value);

export function writeState(res: NextResponse, state: GameState): void {
  res.cookies.set(COOKIE, encodeState(state), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export const freshState = () => newState();

/** CSRF defence for cookie-authenticated POSTs: Origin (when present) must match Host. */
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin fetches from older browsers may omit it; SameSite=Lax still applies
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}
