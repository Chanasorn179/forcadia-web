import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    created?: string;
    deleted?: string;
    error?: string;
  }>;
};

export default async function AdminCharactersPage({
  searchParams,
}: Props) {
  await requireAdmin();
  const query = await searchParams;

  const characters = await prisma.character.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      house: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Codex Management</p>
          <h1 className="mt-3 text-4xl font-semibold">
            จัดการตัวละคร
          </h1>
          <p className="mt-3 text-slate-400">
            เพิ่มและแก้ไขข้อมูลตัวละครจาก PostgreSQL
          </p>
        </div>

        <Link
          href="/admin/characters/new"
          className="rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/20"
        >
          + เพิ่มตัวละคร
        </Link>
      </div>

      {(query.created || query.deleted) && (
        <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/5 p-4 text-emerald-200">
          ดำเนินการเรียบร้อยแล้ว
        </div>
      )}

      {query.error && (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-300/5 p-4 text-rose-200">
          ไม่สามารถดำเนินการได้
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {characters.map((character) => (
          <article
            key={character.id}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="flex items-start gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border text-xl"
                style={{
                  color: character.accent,
                  borderColor: `${character.accent}55`,
                  backgroundColor: `${character.accent}12`,
                }}
              >
                {character.symbol}
              </span>

              <div className="min-w-0">
                <h2 className="truncate text-xl text-amber-100">
                  {character.name}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {character.thaiName}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-amber-200">
              {character.title}
            </p>

            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
              {character.summary}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {character.house?.name ?? "ยังไม่ผูกตระกูล"}
              </span>

              <Link
                href={`/admin/characters/${character.id}`}
                className="text-sm text-amber-200 transition hover:text-amber-100"
              >
                แก้ไข →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
