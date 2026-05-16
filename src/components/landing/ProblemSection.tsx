import { getTranslations } from "next-intl/server";
import { ProblemIllustration } from "./ProblemIllustration";

export async function ProblemSection() {
  const t = await getTranslations("Landing");

  return (
    <section id="problem" className="bg-bg-muted px-6 py-20">
      <div className="mx-auto max-w-[1000px]">
        <p className="mb-6 text-xs font-bold uppercase tracking-[2px] text-accent">
          {t("problem.label")}
        </p>
        <h2 className="mb-10 font-serif text-3xl leading-tight font-bold text-text md:text-4xl lg:text-5xl">
          {t("problem.title")}
        </h2>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-lg leading-relaxed text-text-muted">
              {t("problem.paragraph1")}
            </p>
            <p className="text-lg leading-relaxed text-text-muted">
              {t("problem.paragraph2")}
            </p>
            <p className="text-lg leading-relaxed text-text-muted">
              {t("problem.paragraph3")}
            </p>
          </div>

          <div className="flex justify-center">
            <ProblemIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
