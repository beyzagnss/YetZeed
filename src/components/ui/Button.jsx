export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary:
      'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-500',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-500',
    ghost: 'bg-transparent text-slate-800 hover:bg-slate-100 focus-visible:outline-slate-500'
  }

  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none'

  return (
    <button type={type} className={`${base} ${variants[variant] ?? variants.primary} ${className}`} {...props} />
  )
}

