"use client";

import { Link } from "@/i18n/navigation";

type Props = {
  label: string;
  variant?: "primary" | "secondary";
};

export function SignupTrigger({ label, variant = "primary" }: Props) {
  const baseClasses =
    "inline-flex items-center justify-center min-h-[44px] rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-150 cursor-pointer no-underline";

  const variantClasses =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-md"
      : "border-2 border-text text-text hover:bg-text hover:text-background";

  return (
    <Link href="/auth" className={`${baseClasses} ${variantClasses}`}>
      {label}
    </Link>
  );
}
