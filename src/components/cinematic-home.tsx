"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./cinematic-home.module.css";

const destinations = [
  { label: "HOME", href: "/" },
  { label: "STORIES", href: "/books" },
  { label: "WORLD", href: "/world" },
  { label: "HOUSES", href: "/houses" },
  { label: "LORE", href: "/lore" },
  { label: "GALLERY", href: "/gallery" },
];
const chapters = [
  { label: "THE STORIES", href: "/books" },
  { label: "THE WORLD", href: "/world" },
  { label: "THE HOUSES", href: "/houses" },
  { label: "THE CHARACTERS", href: "/characters" },
];
function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function CinematicHome() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (preference.matches) video.current?.pause();
      else void video.current?.play().catch(() => {});
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <main className={`${styles.hero} ${light ? styles.light : ""}`}>
      <video ref={video} className={styles.video} loop muted playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-hidden="true">
        <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/nexo-hero-bg-video.webm" type="video/webm" />
      </video>
      <div className={styles.wash} />
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Forcadia home">FOR<span>C</span>ADIA<span className={styles.logoDot}>®</span></Link>
        <nav className={styles.nav} aria-label="Main navigation">
          {destinations.map((item, index) => <Link key={item.href} href={item.href} aria-current={index === 0 ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className={styles.actions}>
          <button className={styles.theme} onClick={() => setLight(!light)} aria-label={light ? "Switch to dark theme" : "Switch to light theme"} aria-pressed={light}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{light ? <path d="M20 15.5A8 8 0 0 1 8.5 4a8 8 0 1 0 11.5 11.5Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>}</svg>
          </button>
          <Link href="/read" className={styles.smallCta}>START READING <Arrow /></Link>
          <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="hero-mobile-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? "✕" : "☰"}</button>
        </div>
        {menuOpen && <nav id="hero-mobile-menu" className={styles.mobileNav} aria-label="Mobile navigation">{destinations.map(item => <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}</nav>}
      </header>
      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span /> A WORLD BEYOND THE ORDINARY</p>
          <h1>EVERY WORLD<span>HOLDS A STORY.</span>ENTER OURS.</h1>
          <p className={styles.description}>An empire of untold stories, ancient Houses, and unforgettable destinies. Welcome to the world of Forcadia.</p>
          <div className={styles.ctas}>
            <Link href="/read" className={styles.primary}>EXPLORE THE STORIES <Arrow /></Link>
            <Link href="/world" className={styles.secondary}>DISCOVER THE WORLD</Link>
          </div>
        </div>
        <nav className={styles.chapters} aria-label="Explore Forcadia">{chapters.map((item, index) => <Link href={item.href} key={item.href}><span>0{index + 1}</span>{item.label}</Link>)}</nav>
      </div>
      <footer className={styles.footer}>
        <p>FANTASY. LORE. LIMITLESS IMAGINATION.</p>
        <Link href="/books" className={styles.explore}><span className={styles.scroll}>↓</span> EXPLORE FORCADIA</Link>
        <button className={styles.playback} onClick={() => { if (video.current?.paused) void video.current.play().catch(() => {}); else video.current?.pause(); }} aria-label={playing ? "Pause background video" : "Play background video"}><span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span> {playing ? "PAUSE MOTION" : "PLAY MOTION"}</button>
      </footer>
    </main>
  );
}
