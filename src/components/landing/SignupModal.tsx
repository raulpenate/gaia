"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
};

export function SignupModal({ onClose }: Props) {
  const t = useTranslations("Landing");
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const focusable = overlay.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
        className="relative flex w-full max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center text-xl text-text-subtle transition-colors hover:text-text"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Branding panel */}
        <div className="hidden flex-col items-center justify-center bg-gaia-earth-900 p-10 text-center md:flex md:w-1/2">
          <span className="mb-4 font-serif text-4xl font-bold tracking-[3px] text-white">
            GAIA
          </span>
          <p className="text-lg text-[#c9c5bc]">{t("signup.brandTagline")}</p>
        </div>

        {/* Form panel */}
        <div className="flex w-full flex-col justify-center overflow-y-auto p-10 md:w-1/2">
          <div className="mx-auto w-full max-w-[400px]">
            <div className="mb-8 text-center">
              <h2
                id="signup-title"
                className="mb-2 text-2xl font-bold text-text"
              >
                {t("signup.title")}
              </h2>
              <p className="text-sm text-text-muted">{t("signup.subtitle")}</p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mb-6 flex flex-col gap-4"
            >
              <div className="flex flex-col">
                <label
                  htmlFor="signup-email"
                  className="mb-1.5 text-sm font-semibold text-text"
                >
                  {t("signup.emailLabel")}
                </label>
                <input
                  ref={firstInputRef}
                  id="signup-email"
                  type="email"
                  placeholder={t("signup.emailPlaceholder")}
                  className="rounded-md border border-border bg-surface px-4 py-3 text-base text-text transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="signup-password"
                  className="mb-1.5 text-sm font-semibold text-text"
                >
                  {t("signup.passwordLabel")}
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder={t("signup.passwordPlaceholder")}
                  className="rounded-md border border-border bg-surface px-4 py-3 text-base text-text transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="min-h-[44px] w-full rounded-md bg-primary py-3 text-base font-semibold text-white transition-all hover:bg-primary-hover hover:-translate-y-px"
              >
                {t("signup.submit")}
              </button>
            </form>

            <div className="my-8 flex items-center gap-3 text-xs font-semibold tracking-wide text-text-subtle">
              <span className="h-px flex-1 bg-border" />
              {t("signup.divider")}
              <span className="h-px flex-1 bg-border" />
            </div>

            <button
              ref={lastFocusableRef}
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-md border border-border-strong bg-white px-4 py-3 text-base font-semibold text-text transition-colors hover:bg-bg-subtle"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {t("signup.google")}
            </button>

            <p className="mt-6 text-center text-sm text-text-muted">
              {t("signup.hasAccount")}{" "}
              <a
                href="#"
                className="font-semibold text-primary no-underline hover:underline"
              >
                {t("signup.login")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
