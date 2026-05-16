import { getTranslations } from "next-intl/server";
import { SignupTrigger } from "./SignupTrigger";

export async function HeroSection() {
  const t = await getTranslations("Landing");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-[70px]"
      style={{
        background:
          "linear-gradient(135deg, rgba(13, 15, 12, 0.92) 0%, rgba(15, 21, 17, 0.88) 100%)",
      }}
    >
      <img
        src="/images/seedling.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-75"
      />
      <div className="relative z-10 max-w-[900px] px-6 text-center">
        <h1 className="mb-6 font-serif text-4xl leading-tight font-bold tracking-tight text-text-inverse md:text-5xl lg:text-6xl">
          {t("hero.title")}
        </h1>
        <p className="mx-auto mb-12 max-w-[700px] text-lg font-normal text-[#c9c5bc] md:text-xl">
          {t("hero.subtitle")}
        </p>

        <SignupTrigger label={t("hero.cta")} variant="primary" />

        <span className="mt-4 block text-sm text-text-subtle">
          {t("hero.subtext")}
        </span>
      </div>
    </section>
  );
}
