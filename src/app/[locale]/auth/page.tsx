import { setRequestLocale } from "next-intl/server";
import { AuthForm } from "@/components/auth/AuthForm";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div
        className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden lg:flex"
        style={{
          background:
            "linear-gradient(135deg, rgba(13, 15, 12, 0.92) 0%, rgba(15, 21, 17, 0.88) 100%)",
        }}
      >
        <img
          src="/images/seedling.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-md px-10 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold tracking-[3px] text-white">
            GAIA
          </h1>
          <p className="text-lg leading-relaxed text-[#c9c5bc]">
            Satellite data + your field observations = a real diagnosis for your
            land.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <AuthForm />
      </div>
    </div>
  );
}
