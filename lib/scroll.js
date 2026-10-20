// Shared handle to the Lenis instance so components (menu, CTAs) can stop or drive scrolling.
let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: -72 });
  } else {
    target.scrollIntoView({ block: "start" });
  }
}
