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
        "rounded-full px-3 py-1",
        "text-sm leading-none",
        "border",
        "bg-[color:var(--color-tag-bg)]",
        "text-[color:var(--color-tag-text)]",
        "border-[color:var(--color-tag-border)]",
        "select-none",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  )
}