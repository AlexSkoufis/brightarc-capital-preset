"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, prefersReducedMotion } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

/*
  Starts Lenis and the shared scroll reveals.
  Markup hooks:
    [data-reveal]          fades and lifts the element in
    [data-reveal-stagger]  does the same for its direct children, one after another
  Content is fully visible in the HTML; motion only runs once JS is ready and reduced motion is off.
*/
export default function MotionProvider() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray("[data-reveal-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });
    });

    // Fonts and images can shift layout after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
