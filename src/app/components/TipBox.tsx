import { ReactNode } from "react"

type TipBoxProps = {
  title?: string
  children: ReactNode
}

export default function TipBox({ title, children }: TipBoxProps) {
  return (
    <div
      className="tip-box my-8 py-4 px-4 rounded-xl font-normal bg-[color:var(--color-bg-callout)] text-[color:var(--color-text-on-callout)] [&_p]:!mt-0 [&_p]:mb-1 [&_p:first-child_strong]:block [&_p:first-child_strong]:mb-0 [&_p:first-child_strong]:font-black"
      role="note"
      aria-label={title ?? "Tip"}
    >
      {title ? <h6 className="tip-box-title heading-sm-serif">{title}</h6> : null}
      {children}
    </div>
  )
}
