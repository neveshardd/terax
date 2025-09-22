'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

/**
 * Hook para redirecionar usuários logados de páginas de login/cadastro
 * sempre para a URL principal do app.
 */
export const useAuthRedirect = () => {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      const webUrl = process.env.NEXT_PUBLIC_WEB_URL;
      if (webUrl) {
        window.location.href = webUrl;
      }
    }
  }, [user, loading]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
};
