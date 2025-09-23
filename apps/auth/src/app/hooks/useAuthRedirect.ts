'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";

export const useAuthRedirect = () => {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const webUrl = process.env.NEXT_PUBLIC_WEB_URL;

      if (window.history.length > 1) {
        window.history.back();
      }
      else if (webUrl) {
        window.location.href = webUrl;
      }
    }
  }, [user, loading]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
};
