import { ReactNode } from "react"

type FilterPillProps = {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export default function FilterPill({
  children,
  active = false,
  onClick,
  className = "",
}: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5",
        "rounded-full px-3.5 py-1.5",
        "text-sm font-medium",
        "transition active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)]",
        active
          ? "border border-transparent bg-[color:var(--color-bg-tag)] text-[color:var(--color-text-on-tag)]"
          : "border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-elevated)] text-[color:var(--color-text-default)] hover:border-[color:var(--color-border-strong)]",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  )
}
