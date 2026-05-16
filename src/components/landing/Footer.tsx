import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Landing");

  return (
    <footer className="bg-[#f0ede6] px-6 py-10 text-center text-sm text-text-muted">
      <p>{t("footer.tagline")}</p>
      <p className="mt-3">
        <a
          href="#"
          className="mx-3 text-primary no-underline hover:underline"
        >
          {t("footer.support")} ♥
        </a>
        ·
        <a
          href="#"
          className="mx-3 text-primary no-underline hover:underline"
        >
          {t("footer.github")}
        </a>
        ·
        <span className="mx-3">Open Source</span>
      </p>
    </footer>
  );
}
