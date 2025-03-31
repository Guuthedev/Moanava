"use client";

import { useViewTransition } from "@/hooks/useViewTransition";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps, forwardRef } from "react";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  noTransition?: boolean;
  activeClassName?: string;
  prefetch?: boolean;
  scroll?: boolean;
};

export const TransitionLink = forwardRef<
  HTMLAnchorElement,
  TransitionLinkProps
>(function TransitionLink(
  {
    noTransition = false,
    className,
    children,
    activeClassName,
    prefetch = true,
    scroll = true,
    ...props
  },
  ref
) {
  const { isSupported } = useViewTransition();

  // Gestion des classes conditionnelles
  const classes = cn(
    className,
    isSupported && !noTransition && "has-view-transition",
    activeClassName
  );

  // Attributs de transition
  const transitionAttrs = {
    "data-no-transition": noTransition || !isSupported ? "true" : undefined,
    "data-prefetch": prefetch ? "true" : undefined,
    "data-scroll": scroll ? "true" : undefined,
  };

  return (
    <Link
      ref={ref}
      className={classes}
      prefetch={prefetch}
      scroll={scroll}
      {...transitionAttrs}
      {...props}
    >
      {children}
    </Link>
  );
});
