"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { gsap } from "gsap";
import site from "@/content/site.json";
import DeadLink from "@/components/DeadLink";
import ArrowIcon from "@/components/ArrowIcon";
import { getLenis, prefersReducedMotion } from "@/lib/scroll";
import styles from "./Header.module.css";

export default function Header() {
  const { brand, nav, contact } = site;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Solid background after leaving the top, hide while scrolling down, show on the way up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY + 2);
      if (y < lastY - 2 || y <= 480) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Mobile menu: lock scroll, close on Escape, animate items in.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    let ctx;
    if (!prefersReducedMotion() && menuRef.current) {
      ctx = gsap.context(() => {
        gsap.from("[data-menu-item]", {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.06,
          delay: 0.15,
        });
      }, menuRef);
    }
    menuRef.current?.querySelector("a")?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      ctx?.revert();
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => event.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const className = [
    styles.header,
    scrolled && styles.scrolled,
    hidden && !open && styles.hidden,
    open && styles.open,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className}>
      <div className={`container ${styles.inner}`}>
        <a href="#main" className={styles.logo} aria-label={`${brand.name}, back to top`}>
          <Logo label={brand.logo.alt} />
        </a>

        <nav className={styles.nav} aria-label={nav.label}>
          <ul>
            {nav.items.map((item) => (
              <li key={item.label}>
                <DeadLink className={styles.navLink}>
                  <span className={styles.navMask}>
                    <span className={styles.navLabel}>{item.label}</span>
                  </span>
                </DeadLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={nav.cta.href} className={`btn ${styles.cta}`}>
            {nav.cta.label}
            <span className="btnIcon">
              <ArrowIcon size={12} />
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className={styles.menu} hidden={!open}>
        <div className={`container ${styles.menuInner}`}>
          <ul className={styles.menuList}>
            {nav.items.map((item, index) => (
              <li key={item.label} className={styles.menuMask}>
                <DeadLink className={styles.menuLink} data-menu-item onClick={() => setOpen(false)}>
                  <span className={styles.menuIndex}>0{index + 1}</span>
                  {item.label}
                </DeadLink>
              </li>
            ))}
          </ul>
          <div className={styles.menuFoot} data-menu-item>
            <a href={nav.cta.href} className="btn btnLight" onClick={() => setOpen(false)}>
              {nav.cta.label}
              <span className="btnIcon">
                <ArrowIcon size={12} />
              </span>
            </a>
            <div className={styles.menuContact}>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
