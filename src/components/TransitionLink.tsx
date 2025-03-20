"use client";

import { useViewTransition } from "@/hooks/useViewTransition";
import Link from "next/link";
import { ComponentProps, forwardRef } from "react";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  noTransition?: boolean;
};

export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(function TransitionLink(
  { noTransition = false, className, children, ...props },
  ref
) {
  const { isSupported } = useViewTransition();

  // Ajouter data-attribute pour le gestionnaire de clics
  const dataAttr =
    noTransition || !isSupported ? { "data-no-transition": "true" } : {};

  return (
    <Link
      ref={ref}
      className={`${className || ""} ${
        isSupported ? "has-view-transition" : ""
      }`}
      {...dataAttr}
      {...props}
    >
      {children}
    </Link>
  );
});
