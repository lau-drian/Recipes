interface Props {
  className?: string;
}

export default function WaveDivider({
  className = "text-[var(--color-border-wavy)]",
}: Props) {
  return (
  <svg
      aria-hidden="true"
      className={`w-full h-4 ${className}`}
  > 
    <defs>
      <pattern
          id="wavyPattern"
          patternUnits="userSpaceOnUse"
          width="40"
          height="20"
      > 
        <path 
          d="M0 10 Q 10 0, 20 10 T 40 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        /> 
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wavyPattern)"/>
  </svg>
  );
}