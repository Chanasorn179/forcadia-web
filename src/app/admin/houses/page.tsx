import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    created?: string;
    deleted?: string;
    error?: string;
  }>;
};

export default async function AdminHousesPage({
  searchParams,
}: Props) {
  await requireAdmin();
  const query = await searchParams;

  const houses = await prisma.house.findMany({
    orderBy: { name: "asc" },
    include: {
      ruler: {
        select: {
          name: true,
        },
      },
      city: {
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
          <p className="section-kicker">House Management</p>
          <h1 className="mt-3 text-4xl font-semibold">
            จัดการตระกูล
          </h1>
          <p className="mt-3 text-slate-400">
            จัดการตรา ผู้ปกครอง Sovereign Key และ Domain
          </p>
        </div>

        <Link
          href="/admin/houses/new"
          className="rounded-full border border-amber-200/30 bg-amber-200/10 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/20"
        >
          + เพิ่มตระกูล
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

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {houses.map((house) => (
          <article
            key={house.id}
            className="glass-panel grid gap-5 rounded-3xl p-6 sm:grid-cols-[96px_1fr]"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <Image
                src={house.emblem}
                alt={house.emblemName}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            <div>
              <h2 className="text-xl text-amber-100">
                {house.name}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {house.thaiName}
              </p>

              <div className="mt-4 grid gap-2 text-sm text-slate-400">
                <p>ผู้ปกครอง: {house.ruler.name}</p>
                <p>เมือง: {house.city?.name ?? "ยังไม่เชื่อมเมือง"}</p>
              </div>

              <Link
                href={`/admin/houses/${house.id}`}
                className="mt-5 inline-flex text-sm text-amber-200 transition hover:text-amber-100"
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
