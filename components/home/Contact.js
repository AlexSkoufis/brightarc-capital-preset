"use client";

import { useEffect, useState } from "react";
import home from "@/content/home.json";
import site from "@/content/site.json";
import ArrowIcon from "@/components/ArrowIcon";
import { NEED_EVENT } from "@/components/home/needEvents";
import styles from "./Contact.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { contact } = home;
  const { form } = contact;
  const person = site.contact;
  const [need, setNeed] = useState("");
  const [status, setStatus] = useState("idle");

  // CTAs elsewhere on the page preselect the matching option.
  useEffect(() => {
    const onNeed = (event) => {
      if (form.needOptions.includes(event.detail)) setNeed(event.detail);
    };
    window.addEventListener(NEED_EVENT, onNeed);
    return () => window.removeEventListener(NEED_EVENT, onNeed);
  }, [form.needOptions]);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !EMAIL_PATTERN.test(email) || !need) {
      setStatus("error");
      return;
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company && `Company: ${company}`,
      `Looking for: ${need}`,
      "",
      message,
    ]
      .filter((line) => line !== false && line !== "")
      .join("\n");

    const href = `mailto:${person.email}?subject=${encodeURIComponent(form.emailSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("sent");
  };

  return (
    <section id={contact.id} className={`section onDark ${styles.contact}`} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <p className="eyebrow" data-reveal>
            {contact.eyebrow}
          </p>
          <h2 id="contact-title" className={`h2 ${styles.title}`} data-reveal>
            {contact.title}
          </h2>
          <p className={styles.lead} data-reveal>
            {contact.lead}
          </p>

          <div className={styles.direct} data-reveal>
            <p className={styles.directTitle}>{contact.directTitle}</p>
            <p className={styles.person}>{person.person}</p>
            <a className={styles.directLink} href={person.phoneHref}>
              <span>{contact.phoneLabel}</span>
              {person.phone}
            </a>
            <a className={styles.directLink} href={`mailto:${person.email}`}>
              <span>{contact.emailLabel}</span>
              {person.email}
            </a>
          </div>
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate data-reveal>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>{form.nameLabel}</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label className={styles.field}>
              <span>{form.emailLabel}</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>
          <label className={styles.field}>
            <span>{form.companyLabel}</span>
            <input name="company" type="text" autoComplete="organization" />
          </label>

          <fieldset className={styles.needs}>
            <legend>{form.needLabel}</legend>
            <div className={styles.chips}>
              {form.needOptions.map((option) => (
                <label key={option} className={styles.chip}>
                  <input
                    type="radio"
                    name="need"
                    value={option}
                    checked={need === option}
                    onChange={() => setNeed(option)}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className={styles.field}>
            <span>{form.messageLabel}</span>
            <textarea name="message" rows={4} placeholder={form.messagePlaceholder} />
          </label>

          <div className={styles.submitRow}>
            <button type="submit" className="btn">
              {form.submit}
              <span className="btnIcon">
                <ArrowIcon size={12} />
              </span>
            </button>
            <p className={styles.note}>{form.note}</p>
          </div>

          <p
            className={`${styles.status} ${status === "error" ? styles.statusError : ""}`}
            role="status"
            aria-live="polite"
          >
            {status === "error" && form.error}
            {status === "sent" && form.success}
          </p>
        </form>
      </div>
    </section>
  );
}
