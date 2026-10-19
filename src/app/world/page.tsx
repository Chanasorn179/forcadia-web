import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublicCities } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "จักรวรรดิ",
};

/* Where each city's label sits on the painted map, in % of the image. */
const mapPoints: Record<string, { x: number; y: number }> = {
  "fourcadir-central-capital": { x: 50, y: 51.5 },
  "lux-aeternum": { x: 50.2, y: 11.6 },
  "astra-caelum": { x: 74, y: 23.6 },
  "floraven-mortis": { x: 82.6, y: 44.4 },
  silentharrow: { x: 75.7, y: 68.2 },
  thalassara: { x: 50.6, y: 76.2 },
  "aurea-fortuna": { x: 25.8, y: 68.2 },
  "ferrum-vanguard": { x: 16.7, y: 45.2 },
  "nihil-ruina": { x: 26.9, y: 23.6 },
};

export const dynamic = "force-dynamic";

export default async function WorldPage() {
  const cities = await getPublicCities();
  return (
    <main className="container-page py-16 md:py-24">
      <h1 className="text-4xl md:text-6xl">
        แผนที่จักรวรรดิ Forcadia
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        นครหลวงตั้งอยู่ศูนย์กลาง เชื่อมต่อแปดดินแดนซึ่งต่างครอบครองอำนาจ
        วัฒนธรรม และความลับของตนเอง
      </p>

      <figure className="empire-map mt-12">
        <div className="empire-map-scroll">
        <div className="empire-map-frame">
          <Image
            src="/images/empire/empire-map.webp"
            alt="แผนที่จักรวรรดิ Fourcadir: นครหลวงอยู่ศูนย์กลาง ล้อมรอบด้วยแปดดินแดนของแปดตระกูล"
            width={1448}
            height={1086}
            priority
            sizes="(max-width: 1240px) 100vw, 1200px"
            className="empire-map-image"
          />
          {cities.map((city) => {
            const point = mapPoints[city.slug];
            if (!point) return null;

            return (
              <Link
                key={city.slug}
                href={`/world/${city.slug}`}
                className="empire-map-pin"
                aria-label={`${city.name} — ${city.thaiName}`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <span className="empire-map-tip" aria-hidden="true">
                  <span className="empire-map-tip-name">{city.name}</span>
                  <span className="empire-map-tip-meta">{city.thaiName} · {city.ruler}</span>
                </span>
              </Link>
            );
          })}
        </div>
        </div>
        <figcaption className="mt-4 text-sm text-slate-400">
          <span className="hidden md:inline">เลือกชื่อเมืองบนแผนที่เพื่อเปิดบันทึกสถานที่</span>
          <span className="md:hidden">เลื่อนแผนที่ไปทางซ้าย–ขวา แล้วแตะชื่อเมือง หรือเลือกจากรายการด้านล่าง</span>
        </figcaption>
      </figure>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/world/${city.slug}`}
            className="world-city-card glass-panel card-hover group rounded-3xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl text-amber-100">{city.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{city.ruler}</p>
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
                  alt={`ตรา ${city.name}`}
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

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {city.description}
            </p>

            <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
              ดูรายละเอียดสถานที่
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
