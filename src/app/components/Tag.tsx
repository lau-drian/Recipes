import { ReactNode } from "react"

type TagProps = {
  children: ReactNode
  className?: string
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "rounded-full px-3.5 py-1.5",
        "text-sm",
        "border-none",
        "bg-[color:var(--color-bg-tag)]",
        "text-[color:var(--color-text-on-tag)]",
        "select-none",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  )
}