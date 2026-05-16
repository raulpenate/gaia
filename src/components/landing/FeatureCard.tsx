type StatItem = {
  icon: string;
  label: string;
  value: string;
};

type Props = {
  label: string;
  title: string;
  description: string;
  stats: StatItem[];
};

export function FeatureCard({ label, title, description, stats }: Props) {
  return (
    <div className="flex min-h-[450px] flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.08]">
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-primary">
        {label}
      </p>
      <h3 className="mb-4 text-xl font-bold leading-snug text-text-inverse">
        {title}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-[#c9c5bc]">
        {description}
      </p>

      <div className="flex-1 rounded-xl bg-black/30 p-4">
        {stats.map((stat) => (
          <div key={stat.label} className="mb-3 flex gap-3 last:mb-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-lg">
              {stat.icon}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs text-[#999]">{stat.label}</span>
              <span className="text-sm font-bold text-text-inverse">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
