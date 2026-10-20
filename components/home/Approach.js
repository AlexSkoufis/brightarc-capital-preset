"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import home from "@/content/home.json";
import ArrowIcon from "@/components/ArrowIcon";
import { CHEVRON_PATH } from "@/components/Chevrons";
import FillingChevrons, { chevronFillTimeline } from "@/components/FillingChevrons";
import { prefersReducedMotion } from "@/lib/scroll";
import styles from "./Approach.module.css";

gsap.registerPlugin(ScrollTrigger);

function Operator({ symbol, label }) {
  return (
    <div className={styles.operator} data-eq-op>
      <span aria-hidden="true">{symbol}</span>
      <span className="srOnly">{label}</span>
    </div>
  );
}

function ArrowCard({ panel }) {
  return (
    <article className={`${styles.card} ${styles[panel.tone]}`} data-eq-card>
      <svg className={styles.cardIcon} viewBox="0 6 120 60" aria-hidden="true">
        <path d={CHEVRON_PATH} />
      </svg>
      <p className={styles.label}>{panel.label}</p>
      <h3 className={styles.cardTitle}>{panel.title}</h3>
      <p className={styles.cardText}>{panel.text}</p>
    </article>
  );
}

// "The thinking + The fuel = Take one, or take both." The two arcs meet in the full mark.
export default function Approach() {
  const { approach } = home;
  const [thinking, fuel, together] = approach.panels;
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: the equation assembles with the scroll.
      mm.add("(min-width: 1100px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: "[data-equation]", start: "top 85%", end: "top 25%", scrub: 0.8 },
        });
        const [left, right] = gsap.utils.toArray("[data-eq-card]");
        const [plus, equals] = gsap.utils.toArray("[data-eq-op]");
        tl.from(left, { xPercent: -30, rotate: -4, autoAlpha: 0, duration: 1 })
          .from(plus, { scale: 0, rotate: -90, autoAlpha: 0, duration: 0.6 }, "-=0.4")
          .from(right, { xPercent: -30, rotate: -4, autoAlpha: 0, duration: 1 }, "-=0.3")
          .from(equals, { scale: 0, rotate: -90, autoAlpha: 0, duration: 0.6 }, "-=0.4")
          .from("[data-eq-result]", { xPercent: 20, autoAlpha: 0, duration: 1 }, "-=0.3");
        chevronFillTimeline("[data-result-mark]", { enter: "merge", timeline: tl });
      });

      // Smaller screens: a simple sequence once it comes into view.
      mm.add("(max-width: 1099px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: "[data-equation]", start: "top 80%", once: true },
        });
        tl.from("[data-eq-card], [data-eq-op], [data-eq-result]", {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
        });
        chevronFillTimeline("[data-result-mark]", { enter: "merge", timeline: tl });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={`section onDark ${styles.approach}`} aria-labelledby="approach-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>
              {approach.eyebrow}
            </p>
            <h2 id="approach-title" className="h2" data-reveal>
              {approach.title}
            </h2>
          </div>
          <p className={styles.intro} data-reveal>
            {approach.intro}
          </p>
        </div>

        <div className={styles.equation} data-equation>
          <ArrowCard panel={thinking} />
          <Operator symbol="+" label={approach.operators.plus} />
          <ArrowCard panel={fuel} />
          <Operator symbol="=" label={approach.operators.equals} />

          <article className={styles.result} data-eq-result>
            <div className={styles.resultArt}>
              <div className={styles.resultGlow} aria-hidden="true" />
              <div data-result-mark>
                <FillingChevrons className={styles.resultMark} />
              </div>
            </div>
            <div className={styles.resultBody}>
              <p className={styles.label}>{together.label}</p>
              <h3 className={styles.resultTitle}>{together.title}</h3>
              <p className={styles.resultText}>{together.text}</p>
              <a href={approach.cta.href} className="btn">
                {approach.cta.label}
                <span className="btnIcon">
                  <ArrowIcon size={12} />
                </span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
