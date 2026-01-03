const AlertBanner = ({ alert }) => {
  if (!alert) return null;
  const colorMap = {
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    critical: 'bg-red-50 text-red-700 border-red-200'
  };

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm ${
        colorMap[alert.severity] || colorMap.info
      }`}
    >
      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-current opacity-70" />
      <div>
        <p className="font-semibold">{alert.title}</p>
        <p className="mt-1 text-sm">{alert.message}</p>
      </div>
    </div>
  );
};

export default AlertBanner;
