import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from '@mui/material/styles';
import { ThemeContextProvider, useThemeContext } from './ThemeContext';

const Probe = () => {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="palette-mode">{theme.palette.mode}</span>
      <span data-testid="primary">{theme.palette.primary.main}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
};

describe('ThemeContextProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to light mode when nothing is stored', () => {
    render(
      <ThemeContextProvider>
        <Probe />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(screen.getByTestId('palette-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('primary')).toHaveTextContent('#2563eb');
  });

  it('restores the mode persisted in localStorage', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeContextProvider>
        <Probe />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('primary')).toHaveTextContent('#3b82f6');
  });

  it('toggles the mode and persists it', async () => {
    render(
      <ThemeContextProvider>
        <Probe />
      </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('palette-mode')).toHaveTextContent('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('falls back to the default context value outside of the provider', async () => {
    render(<Probe />);

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });
});
