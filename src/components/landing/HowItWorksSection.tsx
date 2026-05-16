import { getTranslations } from "next-intl/server";
import { StepCard } from "./StepCard";

export async function HowItWorksSection() {
  const t = await getTranslations("Landing");

  const steps = [
    { step: 1, title: t("howItWorks.step1.title"), description: t("howItWorks.step1.description") },
    { step: 2, title: t("howItWorks.step2.title"), description: t("howItWorks.step2.description") },
    { step: 3, title: t("howItWorks.step3.title"), description: t("howItWorks.step3.description") },
  ];

  return (
    <section id="how-it-works" className="border-b border-divider bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1000px]">
        <p className="mb-6 text-xs font-bold uppercase tracking-[2px] text-accent">
          {t("howItWorks.label")}
        </p>
        <h2 className="mb-16 font-serif text-3xl leading-tight font-bold text-text md:text-4xl">
          {t("howItWorks.title")}
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <StepCard key={s.step} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
