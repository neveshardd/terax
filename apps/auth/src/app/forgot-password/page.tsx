'use client';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('Se existir uma conta, enviaremos instruções por e-mail.');
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 transition-colors">
      <div
        className="
          w-full max-w-md rounded-2xl px-8 py-10
          border border-neutral-200 dark:border-neutral-800
          bg-white/80 dark:bg-neutral-900/80
          backdrop-blur-md shadow-sm
          transition-colors
        "
      >
        <h1 className="text-3xl font-bold text-center text-neutral-900 dark:text-white mb-8">
          Recuperar Senha
        </h1>

        {message && (
          <p className="text-blue-600 dark:text-blue-400 text-sm mb-4 text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="
                w-full rounded-lg border border-neutral-300 dark:border-neutral-700
                bg-white dark:bg-neutral-800/70
                px-3 py-2
                text-neutral-900 dark:text-neutral-100
                placeholder-neutral-400 dark:placeholder-neutral-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors
              "
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="
              w-full bg-blue-600 text-white font-medium py-2 rounded-lg shadow-sm
              hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none
              transition
            "
          >
            Enviar link de recuperação
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <p>
            Lembrou a senha?{' '}
            <a
              href="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Entrar
            </a>
          </p>
          <a
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Criar uma nova conta
          </a>
        </div>
      </div>
    </main>
  );
}
