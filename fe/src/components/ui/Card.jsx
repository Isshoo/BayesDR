export function ClassificationCard({
  level,
  color,
  bgColor,
  borderColor,
  description,
  severity,
}) {
  return (
    <div
      className={`${bgColor} rounded-2xl border-2 p-5 ${borderColor} text-center transition-all hover:shadow-lg`}
    >
      <div
        className={`h-12 w-12 ${color} mx-auto mb-4 flex items-center justify-center rounded-xl`}
      >
        <span className="text-xl font-extrabold text-white">{severity}</span>
      </div>
      <h3 className="mb-1 text-sm font-bold text-(--color-text-primary)">
        {level}
      </h3>
      <p className="text-xs text-(--color-text-secondary)">{description}</p>
    </div>
  );
}

export function FeatureCard({ icon, title, description, bgColor }) {
  return (
    <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`h-16 w-16 rounded-2xl ${bgColor} mb-6 flex items-center justify-center text-3xl`}
      >
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-(--color-text-primary)">
        {title}
      </h3>
      <p className="leading-relaxed text-(--color-text-secondary)">
        {description}
      </p>
    </div>
  );
}
