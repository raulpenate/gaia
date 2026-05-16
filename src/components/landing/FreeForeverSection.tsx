import { getTranslations } from "next-intl/server";
import { SignupTrigger } from "./SignupTrigger";

export async function FreeForeverSection() {
  const t = await getTranslations("Landing");

  return (
    <section id="access" className="bg-bg-subtle px-6 py-20">
      <div className="mx-auto max-w-[1000px]">
        <p className="mb-6 text-xs font-bold uppercase tracking-[2px] text-accent">
          {t("access.label")}
        </p>
        <h2 className="mb-10 font-serif text-3xl leading-tight font-bold text-text md:text-4xl">
          {t("access.title")}
        </h2>

        <div className="space-y-5">
          <p className="text-lg leading-relaxed text-text-muted">
            {t("access.paragraph1")}
          </p>
          <p className="text-lg leading-relaxed text-text-muted">
            {t("access.paragraph2")}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <SignupTrigger label={`${t("access.cta1")} →`} variant="primary" />
          <SignupTrigger label={`${t("access.cta2")} ♥`} variant="secondary" />
        </div>
        <p className="mt-4 text-sm text-text-subtle">
          {t("access.smallPrint")}
        </p>
      </div>
    </section>
  );
}
