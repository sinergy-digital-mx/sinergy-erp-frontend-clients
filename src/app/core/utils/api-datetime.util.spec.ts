import { describe, expect, it } from 'vitest';
import { parseApiDateTime } from './api-datetime.util';

describe('parseApiDateTime', () => {
  it('trata el datetime de MySQL sin zona como UTC', () => {
    const date = parseApiDateTime('2026-09-07 23:46:00');
    expect(date?.toISOString()).toBe('2026-09-07T23:46:00.000Z');
  });

  it('no vuelve a desplazar un ISO con Z', () => {
    const date = parseApiDateTime('2026-09-07T22:58:00.000Z');
    expect(date?.toISOString()).toBe('2026-09-07T22:58:00.000Z');
  });
});
