import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { getPublicHouses } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "แปดตระกูลจักรพรรดิ",
};

export const dynamic = "force-dynamic";

export default async function HousesPage() {
  const houses = await getPublicHouses();
  return (
    <main className="container-page pb-16 md:pb-24">
      <PageHeader
        kicker="The Eight Imperial Houses"
        title={<>แปดตระกูลจักรพรรดิ</>}
        lede={<>ตราประจำตระกูลทั้งแปดคือสัญลักษณ์แห่งอำนาจ หน้าที่ และคำปฏิญาณที่ค้ำจุนจักรวรรดิ Forcadia</>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {houses.map((house) => (
          <Link
            key={house.slug}
            href={`/houses/${house.slug}`}
            className="portrait-card group"
            style={{ "--accent": house.accent } as CSSProperties}
          >
            <div className="relative grid aspect-square place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_62%)]">
              <Image
                src={house.emblem}
                alt={`ตรา ${house.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="house-emblem-image object-contain p-8 transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="portrait-frame" aria-hidden="true" />
            </div>

            <div className="flex flex-1 flex-col border-t border-[var(--plate-edge)] p-5">
              <span className="house-mark">{house.emblemName}</span>
              <h2 className="mt-1 text-2xl text-[var(--foreground)]">{house.name}</h2>
              <p className="text-sm text-slate-400">{house.thaiName}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
                {house.description}
              </p>
              <p className="mt-auto pt-4 font-[family-name:var(--font-display)] text-[0.98rem] italic text-[var(--accent)]">
                “{house.motto}”
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
