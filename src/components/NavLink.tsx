"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { TransitionLink } from "./TransitionLink";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TransitionLink
      href={href}
      className={`text-secondary font-medium relative group transition-all duration-300 transform-gpu pb-0.5 ${className} ${
        isActive ? "font-semibold" : ""
      }`}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary origin-left transition-all duration-300 group-hover:w-full"
        aria-hidden="true"
      />
    </TransitionLink>
  );
}
