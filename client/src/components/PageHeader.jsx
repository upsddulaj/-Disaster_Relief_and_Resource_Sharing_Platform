const PageHeader = ({ title, subtitle, children, icon }) => (
  <header className="card relative overflow-hidden">
    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary-500/10 to-sky-500/10 blur-2xl" />
    <div className="relative flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-sky-500 text-white shadow-lg">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  </header>
);

export default PageHeader;
