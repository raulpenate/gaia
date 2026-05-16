import { getTranslations } from "next-intl/server";
import { FeatureCard } from "./FeatureCard";

export async function DiagnosisSection() {
  const t = await getTranslations("Landing");

  const cards = [
    {
      label: t("diagnosis.card1.label"),
      title: t("diagnosis.card1.title"),
      description: t("diagnosis.card1.description"),
      stats: [
        { icon: "💧", label: t("diagnosis.card1.stat1Label"), value: t("diagnosis.card1.stat1Value") },
        { icon: "🌱", label: t("diagnosis.card1.stat2Label"), value: t("diagnosis.card1.stat2Value") },
        { icon: "⬇️", label: t("diagnosis.card1.stat3Label"), value: t("diagnosis.card1.stat3Value") },
      ],
    },
    {
      label: t("diagnosis.card2.label"),
      title: t("diagnosis.card2.title"),
      description: t("diagnosis.card2.description"),
      stats: [
        { icon: "📡", label: t("diagnosis.card2.stat1Label"), value: t("diagnosis.card2.stat1Value") },
        { icon: "🔍", label: t("diagnosis.card2.stat2Label"), value: t("diagnosis.card2.stat2Value") },
        { icon: "✓", label: t("diagnosis.card2.stat3Label"), value: t("diagnosis.card2.stat3Value") },
      ],
    },
    {
      label: t("diagnosis.card3.label"),
      title: t("diagnosis.card3.title"),
      description: t("diagnosis.card3.description"),
      stats: [
        { icon: "⚠️", label: t("diagnosis.card3.stat1Label"), value: t("diagnosis.card3.stat1Value") },
        { icon: "1️⃣", label: t("diagnosis.card3.stat2Label"), value: t("diagnosis.card3.stat2Value") },
        { icon: "🌾", label: t("diagnosis.card3.stat3Label"), value: t("diagnosis.card3.stat3Value") },
      ],
    },
  ];

  return (
    <section
      id="diagnosis"
      className="px-6 py-20"
      style={{
        background:
          "linear-gradient(135deg, #0d0f0c 0%, #0f1511 100%)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-6 text-xs font-bold uppercase tracking-[2px] text-accent">
          {t("diagnosis.label")}
        </p>
        <h2 className="mb-4 font-serif text-3xl leading-tight font-bold text-text-inverse md:text-4xl">
          {t("diagnosis.title")}
        </h2>
        <p className="mb-16 text-lg text-[#c9c5bc]">
          {t("diagnosis.subtitle")}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <FeatureCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
