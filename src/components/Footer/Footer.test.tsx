import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from './Footer';

describe('Footer', () => {
  let scrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the brand and the social links', () => {
    render(<Footer />);

    expect(screen.getByText('<Gabriel Palhares />')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/GabrielPalhares28'
    );
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:gabrielpalhares764@gmail.com'
    );
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/5564992980763'
    );
  });

  it('scrolls to the top when the back to top button is clicked', async () => {
    render(<Footer />);

    await userEvent.click(screen.getByRole('button', { name: 'Voltar ao topo' }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('scrolls to the section of a quick link when it exists', async () => {
    const section = document.createElement('div');
    section.id = 'techstack';
    document.body.appendChild(section);

    render(<Footer />);
    await userEvent.click(screen.getByText('Tech Stack'));

    expect(scrollTo).toHaveBeenCalledWith({ top: -80, behavior: 'smooth' });

    section.remove();
  });

  it('ignores quick links whose section is not rendered', async () => {
    render(<Footer />);

    await userEvent.click(screen.getByText('Projetos'));

    expect(scrollTo).not.toHaveBeenCalled();
  });
});
