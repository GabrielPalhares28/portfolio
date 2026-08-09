import { describe, expect, it } from 'vitest';
import { darkTheme, lightTheme } from './theme';

describe('themes', () => {
  it('exposes a light theme with the light palette', () => {
    expect(lightTheme.palette.mode).toBe('light');
    expect(lightTheme.palette.primary.main).toBe('#2563eb');
    expect(lightTheme.palette.secondary.main).toBe('#7c3aed');
    expect(lightTheme.palette.background.default).toBe('#f8fafc');
    expect(lightTheme.palette.text.primary).toBe('#1e293b');
  });

  it('exposes a dark theme with the dark palette', () => {
    expect(darkTheme.palette.mode).toBe('dark');
    expect(darkTheme.palette.primary.main).toBe('#3b82f6');
    expect(darkTheme.palette.secondary.main).toBe('#8b5cf6');
    expect(darkTheme.palette.background.default).toBe('#0f172a');
    expect(darkTheme.palette.text.primary).toBe('#f1f5f9');
  });

  it('shares the same typography across both themes', () => {
    expect(lightTheme.typography.fontFamily).toContain('Inter');
    expect(darkTheme.typography.fontFamily).toBe(lightTheme.typography.fontFamily);
  });
});
