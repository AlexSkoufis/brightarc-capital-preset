"use client";

import home from "@/content/home.json";
import { CHEVRON_PATH } from "@/components/Chevrons";
import styles from "./Audience.module.css";

// Gentle 3D tilt that follows the pointer (mouse only, CSS does the easing).
function tilt(event) {
  if (event.pointerType !== "mouse") return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
  card.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
  card.style.setProperty("--x", `${(x + 0.5) * 100}%`);
  card.style.setProperty("--y", `${(y + 0.5) * 100}%`);
}

function reset(event) {
  const card = event.currentTarget;
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
}

export default function Audience() {
  const { audience } = home;

  return (
    <section className={`section ${styles.audience}`} aria-labelledby="audience-title">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow" data-reveal>
            {audience.eyebrow}
          </p>
          <h2 id="audience-title" className="h2" data-reveal>
            {audience.title}
          </h2>
        </div>

        <ul className={styles.cards} data-reveal-stagger>
          {audience.items.map((item) => (
            <li key={item.title} className={styles.cardWrap}>
              <article
                className={`${styles.card} ${styles[item.tone]}`}
                onPointerMove={tilt}
                onPointerLeave={reset}
              >
                <svg className={styles.art} viewBox="0 0 120 70" fill="none" aria-hidden="true">
                  <path d={CHEVRON_PATH} vectorEffect="non-scaling-stroke" />
                </svg>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
                <ul className={styles.tags}>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
