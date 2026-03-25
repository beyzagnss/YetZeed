export default function Input({ label, hint, error, className = '', ...props }) {
  const id = props.id || `input_${Math.random().toString(16).slice(2)}`

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
          {label}
        </label>
      ) : null}

      <input
        id={id}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20 ${className}`}
        {...props}
      />

      {error ? (
        <p className="text-sm font-semibold text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-sm text-slate-600">{hint}</p>
      ) : null}
    </div>
  )
}

