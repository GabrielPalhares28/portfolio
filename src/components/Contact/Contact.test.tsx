import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { Contact } from './Contact';

vi.mock('axios', () => ({
  default: { post: vi.fn() },
}));

const post = vi.mocked(axios.post);

const fillForm = async (
  overrides: Partial<{ name: string; email: string; message: string }> = {}
) => {
  const values = {
    name: 'Gabriel Palhares',
    email: 'gabriel@example.com',
    message: 'Mensagem com mais de dez caracteres',
    ...overrides,
  };

  await userEvent.type(screen.getByRole('textbox', { name: /nome completo/i }), values.name);
  await userEvent.type(screen.getByRole('textbox', { name: /e-mail/i }), values.email);
  await userEvent.type(screen.getByRole('textbox', { name: /mensagem/i }), values.message);
};

// Submitting the form element directly skips the browser level `required`
// validation so the component's own validation can be exercised.
const submit = () => fireEvent.submit(document.querySelector('form') as HTMLFormElement);

describe('Contact', () => {
  beforeEach(() => {
    post.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubEnv('VITE_API_URL', 'https://api.test');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders the contact methods', () => {
    render(<Contact />);

    expect(screen.getByText('gabriel@email.com')).toBeInTheDocument();
    expect(screen.getByText('/gabriel-palhares')).toBeInTheDocument();
    expect(screen.getByText('@GabrielPalhares28')).toBeInTheDocument();
    expect(screen.getByText('+55 (64) 99298-0763')).toBeInTheDocument();
  });

  it('shows validation errors for an empty form and does not call the API', async () => {
    render(<Contact />);

    await submit();

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Mensagem é obrigatória')).toBeInTheDocument();
    expect(post).not.toHaveBeenCalled();
  });

  it('validates the minimum length of name and message and the email format', async () => {
    render(<Contact />);

    await fillForm({ name: 'Ga', email: 'invalido', message: 'curta' });
    await submit();

    expect(screen.getByText('Nome deve ter pelo menos 3 caracteres')).toBeInTheDocument();
    expect(screen.getByText('Email inválido')).toBeInTheDocument();
    expect(screen.getByText('Mensagem deve ter pelo menos 10 caracteres')).toBeInTheDocument();
    expect(post).not.toHaveBeenCalled();
  });

  it('clears a field error as soon as the user types again', async () => {
    render(<Contact />);

    await submit();
    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();

    await userEvent.type(screen.getByRole('textbox', { name: /nome completo/i }), 'Gabriel');

    expect(screen.queryByText('Nome é obrigatório')).not.toBeInTheDocument();
  });

  it('posts the mapped payload and resets the form on success', async () => {
    post.mockResolvedValue({ data: { success: true } });
    render(<Contact />);

    await fillForm();
    await submit();

    await waitFor(() =>
      expect(post).toHaveBeenCalledWith(
        'https://api.test/api/send-email',
        {
          name: 'Gabriel Palhares',
          email: 'gabriel@example.com',
          subject: 'Nova mensagem do portfólio',
          message: 'Mensagem com mais de dez caracteres',
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
    );

    expect(await screen.findByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /nome completo/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /e-mail/i })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /mensagem/i })).toHaveValue('');
  });

  it('disables the button while the request is in flight', async () => {
    let resolvePost: (value: { data: { success: boolean } }) => void = () => {};
    post.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePost = resolve;
        })
    );
    render(<Contact />);

    await fillForm();
    await submit();

    const button = screen.getByRole('button', { name: /enviando/i });
    expect(button).toBeDisabled();

    resolvePost({ data: { success: true } });

    expect(
      await screen.findByRole('button', { name: /enviar mensagem/i })
    ).toBeEnabled();
  });

  it('shows the API error message when the request fails', async () => {
    post.mockRejectedValue({ response: { status: 429, data: { message: 'Muitas requisições.' } } });
    render(<Contact />);

    await fillForm();
    await submit();

    expect(await screen.findByText('Muitas requisições.')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /nome completo/i })).toHaveValue(
      'Gabriel Palhares'
    );
  });

  it('falls back to a generic error message for unexpected failures', async () => {
    post.mockRejectedValue(new Error('Network Error'));
    render(<Contact />);

    await fillForm();
    await submit();

    expect(await screen.findByText(/erro ao enviar mensagem\. tente novamente/i)).toBeInTheDocument();
  });

  it('lets the user dismiss the feedback snackbar', async () => {
    post.mockResolvedValue({ data: { success: true } });
    render(<Contact />);

    await fillForm();
    await submit();

    const alert = await screen.findByRole('alert');
    await userEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => expect(alert).not.toBeInTheDocument());
  });
});
