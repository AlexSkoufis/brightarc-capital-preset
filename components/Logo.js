import { CHEVRON_PATH } from "@/components/Chevrons";

// Horizontal logo: the two-arch mark plus the wordmark, in currentColor.
export default function Logo({ className = "", label }) {
  return (
    <svg className={className} viewBox="0 0 300 64" role="img" aria-label={label}>
      <g transform="translate(0 2) scale(0.5)">
        <path d={CHEVRON_PATH} fill="var(--blue)" />
        <path d={CHEVRON_PATH} transform="translate(0 46)" fill="var(--green)" />
      </g>
      <text x="72" y="44" fill="currentColor" className="logo-word">
        brightarc
      </text>
    </svg>
  );
}
