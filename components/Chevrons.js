// The Brightarc mark: two stacked arches, drawn as SVG so they can be animated.
// Amber arch on top (--blue), coral below (--green); token names are kept from the base design.
export const CHEVRON_PATH = "M8 62 A52 52 0 0 1 112 62 L94 62 A34 34 0 0 0 26 62 Z";

export default function Chevrons({ className, blueClass, greenClass, strokeWidth = 3, filled = false, title }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
    >
      <path
        className={blueClass}
        d={CHEVRON_PATH}
        pathLength="1"
        stroke="var(--blue)"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
        fill={filled ? "var(--blue)" : "transparent"}
        vectorEffect="non-scaling-stroke"
      />
      <path
        className={greenClass}
        d={CHEVRON_PATH}
        transform="translate(0 46)"
        pathLength="1"
        stroke="var(--green)"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
        fill={filled ? "var(--green)" : "transparent"}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
