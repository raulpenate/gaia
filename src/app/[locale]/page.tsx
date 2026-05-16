import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-emerald-400">Gaia</p>
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">{t("title")}</h1>
      <p className="mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl">{t("tagline")}</p>
      <p className="mt-2 max-w-2xl text-sm text-zinc-500">{t("subtitle")}</p>
    </main>
  );
}
