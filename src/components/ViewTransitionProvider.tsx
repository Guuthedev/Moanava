"use client";

import { useViewTransition } from "@/hooks/useViewTransition";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Le type ViewTransition n'est pas encore supporté par TypeScript
let savedElement: HTMLElement | null = null;

export default function ViewTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isSupported } = useViewTransition();
  const [isPending, setIsPending] = useState(false);

  // Un effet pour gérer la suppression de la classe view-transition-old-page
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains("view-transition-old-page")) {
            savedElement = target;
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Un effet pour nettoyer la classe sur le nouvel élément
  useEffect(() => {
    if (!isPending && savedElement) {
      savedElement.classList.remove("view-transition-old-page");
      savedElement = null;
    }
  }, [isPending]);

  // Effet pour suivre les changements de chemin
  useEffect(() => {
    // Si les transitions de vue ne sont pas supportées, on ne fait rien
    if (!isSupported) return;

    // Lorsque le chemin change, on indique que la transition est terminée
    setIsPending(false);
  }, [pathname, isSupported]);

  return (
    <div
      className="view-transition-container"
      data-pathname={pathname}
      suppressHydrationWarning={true}
    >
      {children}
    </div>
  );
}
