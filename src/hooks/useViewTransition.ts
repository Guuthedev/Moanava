"use client";

import { useEffect, useState } from "react";

export function useViewTransition() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Vérifier si le navigateur supporte l'API View Transition
    // La vérification est effectuée côté client uniquement
    const isViewTransitionSupported =
      typeof document !== "undefined" && "startViewTransition" in document;

    setIsSupported(isViewTransitionSupported);
  }, []);

  return {
    isSupported,
  };
}
