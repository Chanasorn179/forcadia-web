import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPublicCities } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "จักรวรรดิ",
};

/**
 * Pin coordinates (percent of the map image, 1448×1086) placed on each
 * dominion's emblem in /images/maps/empire-of-fourcadir.webp.
 * `side` decides which way the info card opens so it stays inside the map.
 */
const mapPins: Record<string, { x: number; y: number; side: "left" | "right" }> = {
  "fourcadir-central-capital": { x: 50, y: 40.5, side: "right" },
  "lux-aeternum": { x: 49.9, y: 7.3, side: "right" },
  "astra-caelum": { x: 72.9, y: 19.7, side: "left" },
  "floraven-mortis": { x: 82.0, y: 40.7, side: "left" },
  silentharrow: { x: 74.9, y: 63.8, side: "left" },
  thalassara: { x: 49.4, y: 72.1, side: "right" },
  "aurea-fortuna": { x: 24.7, y: 64.2, side: "right" },
  "ferrum-vanguard": { x: 16.1, y: 41.6, side: "right" },
  "nihil-ruina": { x: 26.2, y: 19.6, side: "right" },
};

export const dynamic = "force-dynamic";

export default async function WorldPage() {
  const cities = await getPublicCities();

  return (
    <main className="container-page pb-16 md:pb-24">
      <PageHeader
        kicker="Union of Eight"
        title={<>แผนที่จักรวรรดิ Fourcadir</>}
        lede={<>นครหลวงตั้งอยู่ศูนย์กลาง เชื่อมต่อแปดดินแดนซึ่งต่างครอบครองอำนาจ วัฒนธรรม และความลับของตนเอง แตะตราประจำดินแดนบนแผนที่เพื่อเปิดบันทึกนคร</>}
      />

      <section aria-label="แผนที่จักรวรรดิ" className="empire-map-frame">
        <div className="empire-map-scroll">
          <div className="empire-map">
            <Image
              src="/images/maps/empire-of-fourcadir.webp"
              alt="แผนที่จักรวรรดิ Fourcadir: นครหลวงอยู่กลาง ล้อมด้วยแปดดินแดนของแปดตระกูล"
              width={1448}
              height={1086}
              priority
              sizes="(max-width: 768px) 900px, 1180px"
              className="block h-auto w-full"
            />

            {cities.map((city) => {
              const pin = mapPins[city.slug];
              if (!pin) return null;

              return (
                <Link
                  key={city.slug}
                  href={`/world/${city.slug}`}
                  aria-label={`${city.name} — ${city.faction}`}
                  className="map-pin"
                  data-side={pin.side}
                  style={
                    {
                      left: `${pin.x}%`,
                      top: `${pin.y}%`,
                      "--accent": city.accent,
                    } as CSSProperties
                  }
                >
                  <span className="map-pin-ring" aria-hidden="true" />

                  <span className="map-pin-card" aria-hidden="true">
                    <span className="house-mark">{city.faction}</span>
                    <span className="mt-1 block font-[family-name:var(--font-display)] text-2xl leading-tight text-[var(--foreground)]">
                      {city.name}
                    </span>
                    <span className="block text-xs text-slate-400">{city.ruler}</span>
                    <span className="mt-3 line-clamp-3 block text-sm leading-6 text-slate-300">
                      {city.description}
                    </span>
                    <span className="mt-3 block text-sm text-[var(--gold)]">เปิดบันทึกนคร</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <p className="md:hidden">เลื่อนซ้าย–ขวาเพื่อดูแผนที่ทั้งผืน</p>
        <a
          href="/images/maps/empire-of-fourcadir.webp"
          target="_blank"
          rel="noopener"
          className="text-[var(--gold)] underline decoration-[var(--plate-edge)] underline-offset-4 hover:decoration-[var(--gold)] md:ml-auto"
        >
          เปิดแผนที่ขนาดเต็ม
        </a>
      </div>

      <h2 className="mt-16 text-3xl md:text-[2.75rem]">นครทั้งเก้า</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/world/${city.slug}`}
            className="world-city-card glass-panel card-hover group rounded-xl p-6"
            style={{ "--accent": city.accent } as CSSProperties}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="house-mark">{city.faction}</span>
                <h3 className="mt-1 text-2xl text-[var(--foreground)]">{city.name}</h3>
                <p className="text-xs text-slate-500">{city.ruler}</p>
              </div>

              <span
                className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border"
                style={{
                  borderColor: `${city.accent}55`,
                  backgroundColor: `${city.accent}12`,
                }}
              >
                <Image
                  src={city.emblem}
                  alt=""
                  fill
                  className={
                    city.slug === "fourcadir-central-capital"
                      ? "object-contain p-1"
                      : "object-cover"
                  }
                  sizes="48px"
                />
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {city.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
