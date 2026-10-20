"use client";

import { useId } from "react";
import { gsap } from "gsap";
import { CHEVRON_PATH } from "@/components/Chevrons";

// Arch bounds inside the 120 x 120 viewBox (see CHEVRON_PATH).
const TOP = 8;
const BOTTOM = 64;

const ARROWS = [
  { tone: "blue", color: "var(--blue)", offset: 0 },
  { tone: "green", color: "var(--green)", offset: 46 },
];

/*
  The Brightarc mark as two arches that can enter, draw their outline and fill from the bottom up.
  Rendered filled, so it reads correctly before (or without) any animation.
*/
export default function FillingChevrons({ className, strokeWidth = 1.6 }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" overflow="visible" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-shape`}>
          <path d={CHEVRON_PATH} />
        </clipPath>
        {ARROWS.map((arrow) => (
          <clipPath key={arrow.tone} id={`${uid}-fill-${arrow.tone}`}>
            <rect x="0" y={TOP} width="120" height={BOTTOM - TOP} data-fill-rect />
          </clipPath>
        ))}
      </defs>

      {ARROWS.map((arrow) => (
        <g key={arrow.tone} transform={`translate(0 ${arrow.offset})`}>
          <g data-chev-group data-tone={arrow.tone}>
            <path d={CHEVRON_PATH} fill={arrow.color} clipPath={`url(#${uid}-fill-${arrow.tone})`} />
            <g clipPath={`url(#${uid}-shape)`}>
              <rect x="0" y={BOTTOM + 4} width="120" height="18" fill={`url(#${uid}-shine)`} data-shine />
            </g>
            <path
              d={CHEVRON_PATH}
              stroke={arrow.color}
              strokeWidth={strokeWidth}
              strokeLinejoin="miter"
              pathLength="1"
              strokeDasharray="1"
              data-stroke
            />
          </g>
        </g>
      ))}
    </svg>
  );
}

/*
  Builds the entrance for a FillingChevrons inside `scope`.
  enter: "rise"  both arrows come up from below, green first (hero)
         "merge" blue drops in from above, green rises from below (they meet in the mark)
*/
export function chevronFillTimeline(scope, { enter = "rise", timeline } = {}) {
  const q = gsap.utils.selector(scope);
  // Bottom arrow first, so the motion reads upwards.
  const groups = q("[data-chev-group]").reverse();
  const strokes = q("[data-stroke]").reverse();
  const rects = q("[data-fill-rect]").reverse();
  const tl = timeline || gsap.timeline();

  tl.from(groups, {
    y: (index) => (enter === "merge" && index === 1 ? -70 : 70),
    autoAlpha: 0,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.18,
  })
    .from(strokes, { strokeDashoffset: 1, duration: 1.3, ease: "power2.inOut", stagger: 0.18 }, "<")
    .fromTo(
      rects,
      { attr: { y: BOTTOM, height: 0 } },
      { attr: { y: TOP, height: BOTTOM - TOP }, duration: 1, ease: "power3.inOut", stagger: 0.18 },
      "-=0.55"
    );

  return tl;
}

// A soft light passing up through the filled arrows, on a loop.
export function chevronShineLoop(scope, { delay = 0 } = {}) {
  const shines = gsap.utils.selector(scope)("[data-shine]").reverse();
  return gsap.fromTo(
    shines,
    { attr: { y: BOTTOM + 4 } },
    { attr: { y: TOP - 22 }, duration: 1.4, ease: "power2.inOut", stagger: 0.16, repeat: -1, repeatDelay: 3.2, delay }
  );
}
