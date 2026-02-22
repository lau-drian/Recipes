const waveSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="16" viewBox="0 0 60 16">
  <path d="M0 8 Q7.5 0 15 8 T30 8 T45 8 T60 8"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"/>
</svg>
`.trim())

export default function WaveDivider() {
  return (
    <div
      aria-hidden="true"
      className="my-6 h-4 w-full bg-repeat-x"
      style={{
        backgroundImage: `url("data:image/svg+xml,${waveSvg}")`,
        backgroundSize: "60px 16px",
        color: "var(--color-border-default)",
      }}
    />
  )
}