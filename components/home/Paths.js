"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import home from "@/content/home.json";
import ArrowIcon from "@/components/ArrowIcon";
import Chevrons from "@/components/Chevrons";
import { selectNeed } from "@/components/home/needEvents";
import { prefersReducedMotion } from "@/lib/scroll";
import styles from "./Paths.module.css";

const noopSubscribe = () => () => {};

const TONES = { growth: "green", liquidity: "green", advisory: "blue" };

export default function Paths() {
  const { paths } = home;
  const { options } = paths;
  // Before hydration every panel is rendered open, so the content reads fine without JS.
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [current, setCurrent] = useState(0);
  const tabs = useRef([]);
  const panelRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prefersReducedMotion() || !panelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-swap]", { y: 18, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.05 });
      gsap.from("[data-swap-art]", { scale: 0.85, rotate: -8, autoAlpha: 0, duration: 0.9, ease: "power3.out" });
    }, panelRef);
    return () => ctx.revert();
  }, [current]);

  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in keys) next = (current + keys[event.key] + options.length) % options.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = options.length - 1;
    if (next === null) return;
    event.preventDefault();
    setCurrent(next);
    tabs.current[next]?.focus();
  };

  const renderPanel = (option) => (
    <div
      key={option.id}
      id={`path-panel-${option.id}`}
      role={ready ? "tabpanel" : undefined}
      aria-labelledby={ready ? `path-tab-${option.id}` : undefined}
      className={`${styles.panel} ${styles[TONES[option.id]]}`}
      ref={ready ? panelRef : undefined}
    >
      <div className={styles.art} data-swap-art>
        <Chevrons strokeWidth={1.5} />
      </div>
      {!ready && <p className={styles.panelKicker}>{option.label}</p>}
      <h3 className={styles.headline} data-swap>
        {option.headline}
      </h3>
      <p className={styles.text} data-swap>
        {option.text}
      </p>
      <ul className={styles.points}>
        {option.points.map((point) => (
          <li key={point} data-swap>
            <span aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
      <a href="#contact" className="btn" onClick={() => selectNeed(option.need)} data-swap>
        {option.cta}
        <span className="btnIcon">
          <ArrowIcon size={12} />
        </span>
      </a>
    </div>
  );

  return (
    <section className={`section ${styles.paths}`} aria-labelledby="paths-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <p className="eyebrow" data-reveal>
            {paths.eyebrow}
          </p>
          <h2 id="paths-title" className="h2" data-reveal>
            {paths.title}
          </h2>

          {ready && (
            <div className={styles.tabs} role="tablist" aria-label={paths.tablistLabel} aria-orientation="vertical">
              {options.map((option, index) => {
                const selected = index === current;
                return (
                  <button
                    key={option.id}
                    ref={(el) => (tabs.current[index] = el)}
                    id={`path-tab-${option.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`path-panel-${option.id}`}
                    tabIndex={selected ? 0 : -1}
                    className={`${styles.tab} ${selected ? styles.tabActive : ""} ${styles[TONES[option.id]]}`}
                    onClick={() => setCurrent(index)}
                    onKeyDown={onKeyDown}
                  >
                    <span className={styles.tabIndex}>0{index + 1}</span>
                    <span className={styles.tabLabel}>{option.label}</span>
                    <span className={styles.tabArrow} aria-hidden="true">
                      <ArrowIcon size={14} />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.stage}>{ready ? renderPanel(options[current]) : options.map(renderPanel)}</div>
      </div>
    </section>
  );
}
