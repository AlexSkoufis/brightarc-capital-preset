"use client";

import home from "@/content/home.json";
import ArrowIcon from "@/components/ArrowIcon";
import { selectNeed } from "@/components/home/needEvents";
import styles from "./Services.module.css";

// Moves the soft highlight under the pointer.
function trackPointer(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--x", `${event.clientX - rect.left}px`);
  card.style.setProperty("--y", `${event.clientY - rect.top}px`);
}

export default function Services() {
  const { services, paths } = home;

  return (
    <section id={services.id} className={`section ${styles.services}`} aria-labelledby="services-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>
              {services.eyebrow}
            </p>
            <h2 id="services-title" className="h2" data-reveal>
              {services.title}
            </h2>
          </div>
          <p className="lead" data-reveal>
            {services.intro}
          </p>
        </div>

        <ul className={styles.cards} data-reveal-stagger>
          {services.items.map((item) => {
            const need = paths.options.find((option) => option.id === item.key)?.need;
            return (
              <li key={item.key} className={`${styles.card} ${styles[item.tone]}`} onPointerMove={trackPointer}>
                <div className={styles.cardTop}>
                  <span className={styles.number}>{item.number}</span>
                  <span className={styles.tag}>{item.tag}</span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
                <div className={styles.fit}>
                  <p className={styles.fitLabel}>{services.fitLabel}</p>
                  <p>{item.fit}</p>
                </div>
                <a href="#contact" className={styles.cardLink} onClick={() => selectNeed(need)}>
                  {item.cta}
                  <span className={styles.cardArrow}>
                    <ArrowIcon size={12} />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
