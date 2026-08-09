import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const stubMatchMedia = (prefersDark: boolean) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: prefersDark && query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );
};

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    stubMatchMedia(false);
    vi.stubGlobal('scrollTo', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders every section of the page', () => {
    const { container } = render(<App />);

    ['hero', 'techstack', 'projects', 'about', 'contact'].forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('starts in light mode when nothing is stored and the OS prefers light', () => {
    render(<App />);

    expect(screen.getAllByTestId('Brightness4Icon').length).toBeGreaterThan(0);
  });

  it('starts in dark mode when the OS prefers dark', () => {
    stubMatchMedia(true);

    render(<App />);

    expect(screen.getAllByTestId('Brightness7Icon').length).toBeGreaterThan(0);
  });

  it('prefers the mode stored in localStorage over the OS preference', () => {
    stubMatchMedia(true);
    localStorage.setItem('themeMode', 'light');

    render(<App />);

    expect(screen.getAllByTestId('Brightness4Icon').length).toBeGreaterThan(0);
  });

  it('ignores an invalid stored mode', () => {
    localStorage.setItem('themeMode', 'solarized');

    render(<App />);

    expect(screen.getAllByTestId('Brightness4Icon').length).toBeGreaterThan(0);
  });

  it('toggles the theme and persists the new mode', async () => {
    render(<App />);

    await userEvent.click(screen.getAllByTestId('Brightness4Icon')[0]);

    expect(screen.getAllByTestId('Brightness7Icon').length).toBeGreaterThan(0);
    expect(localStorage.getItem('themeMode')).toBe('dark');

    await userEvent.click(screen.getAllByTestId('Brightness7Icon')[0]);

    expect(screen.getAllByTestId('Brightness4Icon').length).toBeGreaterThan(0);
    expect(localStorage.getItem('themeMode')).toBe('light');
  });
});
