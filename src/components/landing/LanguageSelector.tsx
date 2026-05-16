"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";

const locales = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
] as const;

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border border-white/30 px-3 py-2 text-sm text-white transition-colors hover:border-primary hover:text-primary"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span aria-hidden="true">🌐</span>
        <span>{locale.toUpperCase()}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            role="presentation"
          />
          <ul
            role="listbox"
            className="absolute top-full right-0 z-50 mt-2 min-w-[150px] overflow-hidden rounded-lg border border-white/20 bg-gaia-earth-900/98 shadow-lg backdrop-blur-md"
          >
            {locales.map((loc) => (
              <li key={loc.code} role="option" aria-selected={locale === loc.code}>
                <button
                  type="button"
                  onClick={() => switchLocale(loc.code)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                    locale === loc.code
                      ? "font-semibold text-primary"
                      : "text-white"
                  }`}
                >
                  {loc.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
