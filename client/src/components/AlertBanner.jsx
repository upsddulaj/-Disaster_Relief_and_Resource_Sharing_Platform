const iconMap = {
  info: (
    <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  critical: (
    <svg className="h-5 w-5 flex-shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const colorMap = {
  info: 'bg-primary-50 text-primary-700 border-primary-200 ring-primary-100',
  warning: 'bg-warning-50 text-warning-700 border-warning-200 ring-warning-100',
  critical: 'bg-danger-50 text-danger-700 border-danger-200 ring-danger-100'
};

const dotColorMap = {
  info: 'bg-primary-500',
  warning: 'bg-warning-500',
  critical: 'bg-danger-500 animate-pulse'
};

const AlertBanner = ({ alert, onDismiss }) => {
  if (!alert) return null;

  const severity = alert.severity || 'info';

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 shadow-sm ring-1 transition-all duration-300 hover:shadow-md animate-slide-up ${colorMap[severity]}`}
    >
      {iconMap[severity]}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`status-dot ${dotColorMap[severity]}`} />
          <p className="font-semibold text-sm">{alert.title}</p>
        </div>
        <p className="mt-1 text-sm opacity-90">{alert.message}</p>
        {alert.createdAt && (
          <p className="mt-2 text-xs opacity-70">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(alert._id)}
          className="p-1 rounded-lg hover:bg-black/5 transition"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
