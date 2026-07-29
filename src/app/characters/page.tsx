import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "ตัวละคร",
  description: "ผู้ครองอำนาจแห่งจักรวรรดิ Forcadia",
};

export const dynamic = "force-dynamic";

export default async function CharactersPage() {
  const characters = await prisma.character.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      house: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">Dramatis Personae</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        ผู้ครองอำนาจทั้งแปด
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        ข้อมูลตัวละครในหน้านี้ดึงจาก PostgreSQL
        และอัปเดตตาม Admin Dashboard
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {characters.map((character) => (
          <Link
            key={character.id}
            href={`/characters/${character.slug}`}
            className="glass-panel card-hover group rounded-3xl p-6"
          >
            <div className="flex items-start gap-4">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border text-2xl"
                style={{
                  color: character.accent,
                  borderColor: `${character.accent}66`,
                  backgroundColor: `${character.accent}14`,
                }}
              >
                {character.symbol}
              </span>

              <div className="min-w-0">
                <h2 className="text-xl text-amber-100">
                  {character.name}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {character.thaiName}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-amber-200">
              {character.title}
            </p>

            <p className="mt-3 line-clamp-3 leading-7 text-slate-400">
              {character.summary}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {character.house?.name ?? "Independent"}
              </span>

              <span className="text-sm text-amber-200 transition group-hover:translate-x-1">
                ดูรายละเอียด →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
