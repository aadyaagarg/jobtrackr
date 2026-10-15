function StatCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  positive = true,
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <div className="rounded-lg bg-blue-50 p-2.5 text-[#2563eb]">
          <Icon className="text-xl" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <h2 className="text-3xl font-bold tracking-tight text-[#10253d]">
          {value}
        </h2>

        {change && (
          <span
            className={`text-sm font-semibold ${
              positive ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {change}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default StatCard;
