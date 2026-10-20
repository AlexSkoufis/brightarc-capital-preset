"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import home from "@/content/home.json";
import { prefersReducedMotion } from "@/lib/scroll";
import styles from "./Process.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const { process } = home;
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = root.current;
    section.classList.add(styles.armed);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const progress = {
        ease: "none",
        scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 55%", scrub: 0.6 },
      };
      mm.add("(min-width: 900px)", () => {
        gsap.fromTo("[data-line]", { scaleX: 0 }, { scaleX: 1, ...progress });
      });
      mm.add("(max-width: 899px)", () => {
        gsap.fromTo("[data-line]", { scaleY: 0 }, { scaleY: 1, ...progress });
      });

      gsap.utils.toArray("[data-step]").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          onEnter: () => step.classList.add(styles.lit),
          onLeaveBack: () => step.classList.remove(styles.lit),
        });
      });
    }, root);
    return () => {
      ctx.revert();
      section.classList.remove(styles.armed);
    };
  }, []);

  return (
    <section ref={root} className={`section ${styles.process}`} aria-labelledby="process-title">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow" data-reveal>
            {process.eyebrow}
          </p>
          <h2 id="process-title" className="h2" data-reveal>
            {process.title}
          </h2>
        </div>

        <div className={styles.stepsWrap} data-steps>
          <span className={styles.track} aria-hidden="true">
            <span className={styles.line} data-line />
          </span>
          <ol className={styles.steps}>
            {process.steps.map((step) => (
              <li key={step.number} className={styles.step} data-step>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.number}>{step.number}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
