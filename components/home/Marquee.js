import home from "@/content/home.json";
import styles from "./Marquee.module.css";

export default function Marquee() {
  const { items } = home.marquee;

  const row = (hidden) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={item} className={styles.item}>
          <span className={index % 2 ? styles.dotGreen : styles.dotBlue} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
