import type { Metadata } from "next";
import Link from "next/link";
import { HouseEmblem } from "@/components/house-emblem";
import { houses } from "@/data/houses";

export const metadata: Metadata = {
  title: "แปดตระกูลจักรพรรดิ",
};

export default function HousesPage() {
  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">The Eight Imperial Houses</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        แปดตระกูลจักรพรรดิ
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        ตราประจำตระกูลทั้งแปดคือสัญลักษณ์แห่งอำนาจ หน้าที่
        และคำปฏิญาณที่ค้ำจุนจักรวรรดิ Forcadia
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {houses.map((house) => (
          <Link
            key={house.slug}
            href={`/houses/${house.slug}`}
            className="glass-panel card-hover group rounded-3xl p-5"
          >
            <HouseEmblem
              src={house.emblem}
              alt={`ตรา ${house.name}`}
              accent={house.accent}
              size="lg"
            />

            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-slate-500">
              {house.emblemName}
            </p>

            <h2 className="mt-2 text-xl text-amber-100">{house.name}</h2>

            <p className="mt-1 text-sm text-slate-400">{house.thaiName}</p>

            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-400">
              {house.description}
            </p>

            <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
              เปิดบันทึกตระกูล →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
