type Props = {
  step: number;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: Props) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
        {step}
      </div>
      <h3 className="mb-3 text-xl font-bold text-text">{title}</h3>
      <p className="leading-relaxed text-text-muted">{description}</p>
    </div>
  );
}
