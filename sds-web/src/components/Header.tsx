"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/config/site";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";

const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export function Header() {
  const pathname = normalize(usePathname() ?? "/");
  // On the home page the header sits over the dark hero photo.
  const overlay = pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30 text-white"
          : "sticky top-0 z-30 border-b border-line bg-paper/95 text-ink backdrop-blur"
      }
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-8 px-5 md:h-20 md:px-8">
        <Link href="/" aria-label="Sénégal Découpe Services, accueil" className="shrink-0">
          <Logo className="h-10 w-auto md:h-12" />
        </Link>

        <nav aria-label="Navigation principale" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-8 text-[15px]">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`border-b-2 py-1 transition-colors ${
                      active ? "border-accent" : "border-transparent hover:border-current"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden sm:block md:ml-0">
          <WhatsAppButton size="sm">Devis WhatsApp</WhatsAppButton>
        </div>

        <button
          type="button"
          className="-mr-2 ml-auto p-2 sm:ml-0 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Navigation mobile" className="border-t border-line bg-paper text-ink md:hidden">
          <ul className="px-5 py-2">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line last:border-0">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-lg ${pathname === item.href ? "text-accent" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-5">
            <WhatsAppButton className="w-full">Devis WhatsApp</WhatsAppButton>
          </div>
        </nav>
      )}
    </header>
  );
}
