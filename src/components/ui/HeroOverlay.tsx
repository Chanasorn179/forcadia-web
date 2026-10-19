"use client";

import Link from "next/link";
import Image from "next/image";
import { books } from "@/data/books";
import { houses } from "@/data/houses";
import { AnimatePresence, motion } from "framer-motion";
import { useArchiveStore } from "@/store/archiveStore";

const links = [
  ["ARCHIVE", "/library"],
  ["HOUSES", "/houses"],
  ["WORLD", "/world"],
  ["CHARACTERS", "/characters"],
];

export function HeroOverlay() {
  const entered = useArchiveStore((state) => state.enteredArchive);
  const enterArchive = useArchiveStore((state) => state.enterArchive);

  return (
    <AnimatePresence>
      {!entered ? (
        <motion.div className="archive-hero" exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <header className="archive-topbar">
            <Link href="/" className="archive-wordmark" aria-label="Forcadia home"><Image src="/images/logos/unity-crown-webmark-gold.svg" alt="" width={34} height={34} /> FORCADIA</Link>
            <nav aria-label="Archive navigation">
              {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
              <button type="button" onClick={enterArchive}>EXPLORE</button>
            </nav>
          </header>

          <motion.div
            className="archive-hero__content"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1.1 }}
          >
            <p className="archive-kicker"><span /> The Shattered Ring · Imperial Archive</p>
            <h1><span>THE WORLD OF</span>FORCADIA</h1>
            <p className="archive-hero__subtitle">แปดตระกูล หนึ่งบัลลังก์ว่างเปล่า<br />ทุกเรื่องราว… รอให้คุณเปิดอ่าน</p>
            <div className="archive-hero__actions">
            <Link className="archive-read-link" href="/read">เริ่มอ่านเรื่องราว <span aria-hidden="true">↗</span></Link>
            <button className="archive-enter" type="button" onClick={enterArchive}>
              <span>สำรวจหอจดหมายเหตุ 3D</span><i aria-hidden="true">→</i>
            </button>
            </div>
            <div className="archive-house-seals" aria-label="แปดตระกูลแห่งจักรวรรดิ">
              {houses.map((house) => <Link key={house.slug} href={`/houses/${house.slug}`} aria-label={house.thaiName} title={house.thaiName}><Image src={house.emblem} alt="" width={48} height={58} /></Link>)}
            </div>
          </motion.div>

          <div className="archive-artwork">
            <Image src="/images/portraits/group.png" alt="เหล่าตัวละครแห่งจักรวรรดิ Forcadia" fill sizes="(max-width: 700px) 100vw, 58vw" priority />
          </div>
          {books[0] ? <Link href={`/books/${books[0].slug}`} className="archive-featured-book">
            <div className="archive-book-cover"><span>FORCADIA</span><Image src={books[0].cover ?? "/images/crests-transparent/unity-crown.png"} alt="" width={78} height={90} /><small>THE EMPTY THRONE</small></div>
            <div><p className="archive-kicker">จากชั้นหนังสือ · เล่ม {books[0].order}</p><h2>{books[0].thaiTitle}</h2><p>{books[0].subtitle}</p><span>เปิดหนังสือ <i aria-hidden="true">↗</i></span></div>
          </Link> : null}
          <div className="archive-hero__footer">
            <p><span>✦</span> Eight Houses. One broken empire.</p>
            <Link href="/gallery">ชมภาพทั้งหมด ↗</Link>
            <Link className="archive-classified" href="/library">เปิดคลังเรื่องราว ↗</Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
