export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="8" fill="#2c4a3e" />
      <path d="M18 46 L32 12 L46 46" fill="none" stroke="#e8d5a3" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="28" r="4" fill="#c45c26" />
      <path d="M22 46h20" stroke="#e8d5a3" strokeWidth="2" />
    </svg>
  );
}
