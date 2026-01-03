const PageHeader = ({ title, subtitle, children }) => (
  <header className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  </header>
);

export default PageHeader;
