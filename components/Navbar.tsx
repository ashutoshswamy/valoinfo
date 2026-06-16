"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/agents",      label: "Agents" },
  { href: "/weapons",     label: "Weapons" },
  { href: "/maps",        label: "Maps" },
  { href: "/skins",       label: "Skins" },
  { href: "/sprays",      label: "Sprays" },
  { href: "/playercards", label: "Cards" },
  { href: "/buddies",      label: "Buddies" },
  { href: "/playertitles", label: "Titles" },
  { href: "/flex",         label: "Flex" },
  { href: "/ranks",        label: "Ranks" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50">
      <nav
        className="border-b border-valo-border bg-valo-bg/90 backdrop-blur-md"
        style={{ borderBottomColor: open ? "transparent" : undefined }}
      >
        {/* Red top accent line */}
        <div className="h-0.5 bg-valo-red w-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-display font-black text-xl tracking-[0.2em] text-valo-text hover:text-white transition-colors select-none flex-shrink-0"
            >
              VALO<span className="text-valo-red">.</span>INFO
            </Link>

            {/* Desktop links — only at lg+ to avoid cramping 10 links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-2.5 py-1 font-display font-700 text-[11px] tracking-widest uppercase transition-colors ${
                      active
                        ? "text-valo-red"
                        : "text-valo-muted hover:text-valo-text"
                    }`}
                  >
                    {active && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-valo-red" />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile/tablet burger (< lg) */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex flex-col gap-1.5 p-2 text-valo-muted hover:text-valo-text transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-5 bg-current transition-all duration-200 origin-center ${
                  open ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-all duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-all duration-200 origin-center ${
                  open ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/tablet menu */}
      {open && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-valo-bg border-b border-valo-border z-40">
          <div className="px-4 py-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-2.5 text-center font-display font-700 text-xs tracking-widest uppercase border transition-colors cut-tr-sm ${
                    active
                      ? "border-valo-red text-valo-red bg-valo-red/5"
                      : "border-valo-border text-valo-muted hover:text-valo-text hover:border-valo-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
