"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import home from "@/content/home.json";
import ArrowIcon from "@/components/ArrowIcon";
import FillingChevrons, { chevronFillTimeline, chevronShineLoop } from "@/components/FillingChevrons";
import { prefersReducedMotion } from "@/lib/scroll";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

function Words({ text }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <Fragment key={index}>
      <span className={styles.word}>
        <span className={styles.wordInner} data-word>
          {word}
        </span>
      </span>
      {index < words.length - 1 && " "}
    </Fragment>
  ));
}

export default function Hero() {
  const { hero } = home;
  const root = useRef(null);
  const visual = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-word]", { yPercent: 115, duration: 1.2, stagger: 0.06 })
        .from("[data-underline]", { strokeDashoffset: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.6")
        .from("[data-fade]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.35)
        .fromTo(
          "[data-visual]",
          { clipPath: "inset(18% 12% 18% 12% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.5, ease: "expo.inOut" },
          0.1
        )
        .add(chevronFillTimeline("[data-hero-mark]"), 0.6)
        .from("[data-tag]", { scale: 0.6, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "back.out(1.8)" }, 1.9)
        .from("[data-glow]", { autoAlpha: 0, scale: 0.6, duration: 1.4, ease: "power2.out" }, 1.8);

      chevronShineLoop("[data-hero-mark]", { delay: 3.4 });

      // Slow drift of the arrows, then scroll parallax on the panel.
      gsap.to("[data-float]", { y: -14, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("[data-visual-inner]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    // Pointer parallax on devices with a mouse.
    const panel = visual.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let onMove;
    let onLeave;
    if (panel && canHover) {
      const layers = panel.querySelectorAll("[data-depth]");
      const setters = [...layers].map((el) => ({
        depth: parseFloat(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
      }));
      onMove = (event) => {
        const rect = panel.getBoundingClientRect();
        const dx = (event.clientX - rect.left) / rect.width - 0.5;
        const dy = (event.clientY - rect.top) / rect.height - 0.5;
        panel.style.setProperty("--mx", `${(dx + 0.5) * 100}%`);
        panel.style.setProperty("--my", `${(dy + 0.5) * 100}%`);
        setters.forEach((s) => {
          s.x(dx * s.depth);
          s.y(dy * s.depth);
        });
      };
      onLeave = () => setters.forEach((s) => (s.x(0), s.y(0)));
      panel.addEventListener("pointermove", onMove);
      panel.addEventListener("pointerleave", onLeave);
    }

    return () => {
      ctx.revert();
      if (onMove) {
        panel.removeEventListener("pointermove", onMove);
        panel.removeEventListener("pointerleave", onLeave);
      }
    };
  }, []);

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-fade>
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className={styles.title}>
            {hero.titleLines.map((line) => (
              <span key={line} className={styles.line}>
                <Words text={line} />
              </span>
            ))}
            <span className={`${styles.line} ${styles.accent}`}>
              <Words text={hero.titleAccent} />
              <svg className={styles.underline} viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="hero-underline" x1="0" x2="1">
                    <stop offset="0" stopColor="var(--blue)" />
                    <stop offset="1" stopColor="var(--green)" />
                  </linearGradient>
                </defs>
                <path
                  d="M4 14 C 110 4, 260 4, 396 10"
                  stroke="url(#hero-underline)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  pathLength="1"
                  strokeDasharray="1"
                  data-underline
                />
              </svg>
            </span>
          </h1>
          <p className={`lead ${styles.lead}`} data-fade>
            {hero.lead}
          </p>
          <div className={styles.ctas} data-fade>
            <a href={hero.primaryCta.href} className="btn">
              {hero.primaryCta.label}
              <span className="btnIcon">
                <ArrowIcon size={12} />
              </span>
            </a>
            <a href={hero.secondaryCta.href} className="btn btnGhost">
              {hero.secondaryCta.label}
              <ArrowIcon size={14} direction="down" />
            </a>
          </div>
        </div>

        <div ref={visual} className={styles.visual} data-visual>
          <div className={styles.visualInner} data-visual-inner>
            <div className={styles.grain} aria-hidden="true" />
            <div className={styles.rings} data-depth="12" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.mark} data-depth="28">
              <div className={styles.glow} data-glow aria-hidden="true" />
              <div data-float data-hero-mark>
                <FillingChevrons className={styles.chevrons} />
              </div>
            </div>
            <p className={styles.visualLabel} data-depth="6">
              {hero.visual.label}
            </p>
            <span className={`${styles.tag} ${styles.tagStrategy}`} data-tag data-depth="40">
              <i aria-hidden="true" />
              {hero.visual.tagStrategy}
            </span>
            <span className={`${styles.tag} ${styles.tagCapital}`} data-tag data-depth="52">
              <i aria-hidden="true" />
              {hero.visual.tagCapital}
            </span>
            <p className={styles.caption}>{hero.visual.caption}</p>
          </div>
        </div>
      </div>

      <div className={`container ${styles.scrollHint}`} aria-hidden="true">
        <span>{hero.scrollHint}</span>
        <i />
      </div>
    </section>
  );
}

