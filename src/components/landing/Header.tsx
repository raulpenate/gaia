import { getTranslations } from "next-intl/server";
import { LanguageSelector } from "./LanguageSelector";
import { MobileMenu } from "./MobileMenu";

export async function Header() {
  const t = await getTranslations("Landing");

  const navItems = [
    { href: "#hero", label: t("nav.home") },
    { href: "#problem", label: t("nav.problem") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#diagnosis", label: t("nav.diagnosis") },
    { href: "#access", label: t("nav.access") },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[70px] items-center justify-between border-b border-white/10 bg-gaia-earth-900/95 px-6 backdrop-blur-md md:px-10">
      <div className="flex items-center gap-3">
        <MobileMenu navItems={navItems} />
        <a
          href="#hero"
          className="font-serif text-2xl font-bold tracking-[3px] text-white no-underline"
        >
          GAIA
        </a>
      </div>

      <nav className="hidden md:block" aria-label="Main navigation">
        <ul className="flex list-none gap-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative text-sm font-medium tracking-wide text-white/90 no-underline transition-colors duration-300 hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <LanguageSelector />
    </header>
  );
}
