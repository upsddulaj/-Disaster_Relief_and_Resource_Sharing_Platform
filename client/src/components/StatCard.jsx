const iconMap = {
  disasters: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  resources: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  requests: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  volunteers: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
};

const colorMap = {
  disasters: 'from-danger-500 to-orange-400',
  resources: 'from-primary-500 to-sky-400',
  requests: 'from-warning-500 to-amber-400',
  volunteers: 'from-success-500 to-emerald-400'
};

const bgColorMap = {
  disasters: 'bg-danger-50',
  resources: 'bg-primary-50',
  requests: 'bg-warning-50',
  volunteers: 'bg-success-50'
};

const textColorMap = {
  disasters: 'text-danger-600',
  resources: 'text-primary-600',
  requests: 'text-warning-600',
  volunteers: 'text-success-600'
};

const StatCard = ({ label, value, type = 'resources', trend, trendUp }) => (
  <div className="card group relative overflow-hidden">
    <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${colorMap[type]} opacity-10 transition-transform duration-300 group-hover:scale-150`} />
    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        {trend && (
          <p className={`mt-2 text-xs font-semibold flex items-center gap-1 ${trendUp ? 'text-success-600' : 'text-danger-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className={`rounded-xl p-3 ${bgColorMap[type]} ${textColorMap[type]}`}>
        {iconMap[type]}
      </div>
    </div>
  </div>
);

export default StatCard;
