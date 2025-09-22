'use client';

import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import Link from "next/link";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

export default function Dashboard() {
  const { user, loading } = useAuth();

  useAuthRedirect()

  useEffect(() => {
    if (!loading && !user) {
      // redireciona para login central com redirect
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
    }
  }, [user, loading]);

  if (loading || !user) return <p className="text-center p-8">Carregando...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 space-y-6">
      <h1 className="text-3xl font-bold text-yellow-500">Você já está logado!</h1>

      {user && (
        <p className="text-neutral-700 dark:text-neutral-300">
          Olá, <strong>{user.name}</strong> ({user.email})
        </p>
      )}

      <p className="text-neutral-600 dark:text-neutral-400">
        Não é necessário acessar esta página. Use os links abaixo para navegar:
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link
          href={`${process.env.NEXT_PUBLIC_STORE_URL}`}
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition shadow-md"
        >
          Loja
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_FORUM_URL}`}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition shadow-md"
        >
          Fórum
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_SITE_URL}`}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition shadow-md"
        >
          Site
        </Link>

        <Link
          href={`${process.env.NEXT_PUBLIC_BLOG_URL}`}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition shadow-md"
        >
          Blog
        </Link>
      </div>
    </main>
  );
}
