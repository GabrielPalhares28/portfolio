import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from './Hero';

describe('Hero', () => {
  let scrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the CTA buttons and the social links', () => {
    render(<Hero />);

    expect(screen.getByRole('button', { name: /ver projetos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute(
      'href',
      '/cv.pdf'
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/GabrielPalhares28'
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Email' })).toBeInTheDocument();
  });

  it('scrolls to the projects section from the primary CTA', async () => {
    const section = document.createElement('div');
    section.id = 'projects';
    document.body.appendChild(section);

    render(<Hero />);
    await userEvent.click(screen.getByRole('button', { name: /ver projetos/i }));

    expect(scrollTo).toHaveBeenCalledWith({ top: -80, behavior: 'smooth' });

    section.remove();
  });

  it('scrolls to the tech stack section from the scroll down hint', async () => {
    const section = document.createElement('div');
    section.id = 'techstack';
    document.body.appendChild(section);

    render(<Hero />);
    await userEvent.click(screen.getByText(/scroll/i));

    expect(scrollTo).toHaveBeenCalledWith({ top: -80, behavior: 'smooth' });

    section.remove();
  });

  it('does not scroll when the target section is missing', async () => {
    render(<Hero />);

    await userEvent.click(screen.getByRole('button', { name: /ver projetos/i }));

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('applies a parallax offset that follows the mouse', () => {
    const { container } = render(<Hero />);
    const decoration = container.querySelector('#hero > div') as HTMLElement;
    const initialTransform = getComputedStyle(decoration).transform;

    fireEvent.mouseMove(window, { clientX: window.innerWidth, clientY: window.innerHeight });

    expect(getComputedStyle(decoration).transform).not.toBe(initialTransform);
  });

  it('removes the mousemove listener on unmount', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<Hero />);
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });
});
