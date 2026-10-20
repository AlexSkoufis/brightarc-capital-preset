import Logo from "./Logo";
import site from "@/content/site.json";
import DeadLink from "@/components/DeadLink";
import ArrowIcon from "@/components/ArrowIcon";
import Chevrons from "@/components/Chevrons";
import styles from "./Footer.module.css";

export default function Footer() {
  const { brand, nav, contact, footer } = site;
  const year = new Date().getFullYear();

  return (
    <footer className={`onDark ${styles.footer}`}>
      <Chevrons className={styles.watermark} strokeWidth={1.5} />

      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo className={styles.logo} label={brand.logo.alt} />
          <p className={styles.tagline}>{footer.tagline}</p>
          <a href={footer.cta.href} className="btn btnLight">
            {footer.cta.label}
            <span className="btnIcon">
              <ArrowIcon size={12} />
            </span>
          </a>
        </div>

        <nav className={styles.col} aria-label={footer.navTitle}>
          <h2 className={styles.colTitle}>{footer.navTitle}</h2>
          <ul>
            {nav.items.map((item) => (
              <li key={item.label}>
                <DeadLink className={styles.link}>{item.label}</DeadLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{footer.contactTitle}</h2>
          <ul>
            <li className={styles.person}>{contact.person}</li>
            <li>
              <a className={styles.link} href={contact.phoneHref}>
                {contact.phone}
              </a>
            </li>
            <li>
              <a className={styles.link} href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {brand.legalName}. {footer.rights}
        </p>
        <p className={styles.credit}>
          {footer.credit.prefix}{" "}
          <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
            {footer.credit.label}
          </a>
        </p>
        <a href="#main" className={styles.top2}>
          {footer.backToTop}
          <ArrowIcon size={12} direction="up" />
        </a>
      </div>
    </footer>
  );
}
