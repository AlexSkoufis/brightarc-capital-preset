import home from "@/content/home.json";
import styles from "./Faq.module.css";

// Native <details> keeps the answers readable and keyboard friendly without any JS.
export default function Faq() {
  const { faq } = home;

  return (
    <section className={`section ${styles.faq}`} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <p className="eyebrow" data-reveal>
            {faq.eyebrow}
          </p>
          <h2 id="faq-title" className="h2" data-reveal>
            {faq.title}
          </h2>
        </div>

        <div className={styles.list} data-reveal-stagger>
          {faq.items.map((item, index) => (
            <details key={item.question} className={styles.item} name="faq" open={index === 0}>
              <summary className={styles.question}>
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
