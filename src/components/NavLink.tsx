"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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
    <Link
      href={href}
      className={`text-secondary font-medium relative group transition-all duration-300 hover:scale-105 transform-gpu hover:text-primary ${className} ${
        isActive ? "font-semibold" : ""
      }`}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary origin-left transition-all duration-300 group-hover:w-full group-hover:bg-primary"
        aria-hidden="true"
      />
    </Link>
  );
}
