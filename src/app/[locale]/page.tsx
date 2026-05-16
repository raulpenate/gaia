import { DiagnosisSection } from "@/components/landing/DiagnosisSection";
import { Footer } from "@/components/landing/Footer";
import { FreeForeverSection } from "@/components/landing/FreeForeverSection";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <DiagnosisSection />
        <FreeForeverSection />
      </main>
      <Footer />
    </>
  );
}
