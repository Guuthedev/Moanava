"use client";

import { useViewTransition } from "@/hooks/useViewTransition";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef } from "react";

interface ViewTransitionProviderProps {
  children: ReactNode;
}

export function ViewTransitionProvider({
  children,
}: ViewTransitionProviderProps) {
  const router = useRouter();
  const { isSupported } = useViewTransition();
  const prevPathname = useRef<string>("");

  // Gestionnaire de navigation avec transition
  const handleNavigate = useCallback(
    (url: string, options: { scroll: boolean } = { scroll: true }) => {
      if (!isSupported) {
        // Si l'API n'est pas supportée, navigation normale
        router.push(url, options);
        return;
      }

      // Si les URLs sont identiques, éviter la transition
      if (prevPathname.current === url) {
        router.push(url, options);
        return;
      }

      prevPathname.current = url;

      // @ts-expect-error - L'API View Transition n'est pas encore dans les types TypeScript
      document.startViewTransition(() => {
        router.push(url, options);
      });
    },
    [isSupported, router]
  );

  // Intercepter tous les clics sur les liens pour appliquer la transition
  useEffect(() => {
    if (!isSupported) return;

    const handleClick = (e: MouseEvent) => {
      // Ignorer les clics qui ne sont pas sur des liens
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      // Ignorer les liens externes ou spéciaux
      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:")
      ) {
        return;
      }

      // Vérifier les attributs data pour désactiver la transition
      const skipTransition = link.getAttribute("data-no-transition") === "true";
      if (skipTransition) return;

      // Empêcher le comportement par défaut et effectuer la navigation
      e.preventDefault();
      handleNavigate(href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isSupported, handleNavigate]);

  return <div className="view-transition-container">{children}</div>;
}
