import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublicCities } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "จักรวรรดิ",
};

const positions: Record<string, string> = {
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  north: "left-1/2 top-[8%] -translate-x-1/2",
  northeast: "right-[10%] top-[20%]",
  east: "right-[3%] top-1/2 -translate-y-1/2",
  southeast: "right-[10%] bottom-[18%]",
  south: "left-1/2 bottom-[7%] -translate-x-1/2",
  southwest: "left-[10%] bottom-[18%]",
  west: "left-[3%] top-1/2 -translate-y-1/2",
  northwest: "left-[10%] top-[20%]",
};

export const dynamic = "force-dynamic";

export default async function WorldPage() {
  const cities = await getPublicCities();
  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">The Shattered Empire</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        แผนที่จักรวรรดิ Forcadia
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        นครหลวงตั้งอยู่ศูนย์กลาง เชื่อมต่อแปดดินแดนซึ่งต่างครอบครองอำนาจ
        วัฒนธรรม และความลับของตนเอง
      </p>

      <section className="world-map glass-panel relative mt-12 hidden aspect-8/5 overflow-hidden rounded-4xl md:block">
        <div className="world-map-ring world-map-ring-outer absolute inset-[8%] rounded-full border" />

        <div className="world-map-ring world-map-ring-inner absolute inset-[18%] rounded-full border border-dashed" />

        <div className="world-map-glow absolute inset-0" />

        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/world/${city.slug}`}
            aria-label={`ดูรายละเอียด ${city.name}`}
            className={`world-map-node group absolute ${positions[city.position]} z-10 w-40 text-center`}
          >
            <div
              className="world-map-emblem relative mx-auto h-16 w-16 overflow-hidden rounded-full border shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110"
              style={{
                borderColor: `${city.accent}80`,
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
                sizes="64px"
              />
            </div>

            <p className="world-map-city mt-2 text-sm font-semibold transition">
              {city.name}
            </p>

            <p className="world-map-ruler text-[11px] transition">
              {city.ruler}
            </p>

            <p
              className="mt-1 text-[10px] uppercase tracking-[0.12em]"
              style={{ color: city.accent }}
            >
              {city.faction}
            </p>

            <span className="mt-1 inline-block text-[10px] text-amber-200/0 transition group-hover:text-amber-200">
              เปิดบันทึกเมือง →
            </span>
          </Link>
        ))}
      </section>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/world/${city.slug}`}
            className="world-city-card glass-panel card-hover group rounded-3xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {city.ruler}
                </p>

                <h2 className="mt-2 text-xl text-amber-100">{city.name}</h2>
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
              ดูรายละเอียดสถานที่ →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
