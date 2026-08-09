import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

const navLabels = ['Início', 'Tech Stack', 'Projetos', 'Sobre', 'Contato'];

describe('Header', () => {
  let scrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the logo and one desktop plus one mobile entry per nav item', () => {
    render(<Header mode="light" toggleTheme={() => {}} />);

    expect(screen.getByText('<Dev/>')).toBeInTheDocument();
    navLabels.forEach((label) => {
      expect(screen.getAllByRole('button', { name: label })).toHaveLength(2);
    });
  });

  it('scrolls to the section of the clicked nav item', async () => {
    const section = document.createElement('div');
    section.id = 'projects';
    document.body.appendChild(section);

    render(<Header mode="light" toggleTheme={() => {}} />);
    await userEvent.click(screen.getAllByRole('button', { name: 'Projetos' })[0]);

    expect(scrollTo).toHaveBeenCalledWith({ top: -80, behavior: 'smooth' });

    section.remove();
  });

  it('does not scroll when the target section does not exist', async () => {
    render(<Header mode="light" toggleTheme={() => {}} />);

    await userEvent.click(screen.getAllByRole('button', { name: 'Sobre' })[0]);

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('clicking the logo scrolls back to the hero section', async () => {
    const hero = document.createElement('div');
    hero.id = 'hero';
    document.body.appendChild(hero);

    render(<Header mode="light" toggleTheme={() => {}} />);
    await userEvent.click(screen.getByText('<Dev/>'));

    expect(scrollTo).toHaveBeenCalledTimes(1);

    hero.remove();
  });

  it('calls toggleTheme from the desktop and mobile toggles', async () => {
    const toggleTheme = vi.fn();
    render(<Header mode="light" toggleTheme={toggleTheme} />);

    const toggles = screen.getAllByTestId('Brightness4Icon');
    expect(toggles).toHaveLength(2);

    for (const toggle of toggles) {
      await userEvent.click(toggle);
    }

    expect(toggleTheme).toHaveBeenCalledTimes(2);
  });

  it('shows the sun icon when the dark mode is active', () => {
    render(<Header mode="dark" toggleTheme={() => {}} />);

    expect(screen.getAllByTestId('Brightness7Icon')).toHaveLength(2);
    expect(screen.queryByTestId('Brightness4Icon')).not.toBeInTheDocument();
  });

  it('opens and closes the mobile menu', async () => {
    render(<Header mode="light" toggleTheme={() => {}} />);

    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('MenuIcon'));
    expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('CloseIcon'));
    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
  });

  it('closes the mobile menu after navigating', async () => {
    render(<Header mode="light" toggleTheme={() => {}} />);

    await userEvent.click(screen.getByTestId('MenuIcon'));
    await userEvent.click(screen.getAllByRole('button', { name: 'Contato' })[1]);

    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
  });

  it('adds the scrolled styles once the page is scrolled past 50px', () => {
    const { container } = render(<Header mode="light" toggleTheme={() => {}} />);
    const appBar = container.querySelector('.MuiAppBar-root') as HTMLElement;

    expect(appBar).toHaveStyle({ background: 'transparent' });

    Object.defineProperty(window, 'scrollY', { value: 120, writable: true });
    fireEvent.scroll(window);

    expect(appBar).toHaveStyle({ background: 'rgba(255, 255, 255, 0.8)' });
  });

  it('removes the scroll listener on unmount', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<Header mode="light" toggleTheme={() => {}} />);
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
