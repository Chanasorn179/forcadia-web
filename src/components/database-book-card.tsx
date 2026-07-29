import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  thaiTitle: string;
  subtitle: string;
  description: string;
  status: "DRAFT" | "ONGOING" | "COMPLETED";
  chapterCount: number;
};

const statusLabels = {
  DRAFT: "ฉบับร่าง",
  ONGOING: "กำลังเผยแพร่",
  COMPLETED: "จบแล้ว",
} as const;

export function DatabaseBookCard({
  slug,
  title,
  thaiTitle,
  subtitle,
  description,
  status,
  chapterCount,
}: Props) {
  return (
    <Link
      href={`/books/${slug}`}
      className="glass-panel card-hover group overflow-hidden rounded-3xl"
    >
      <div className="relative min-h-72 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_center,rgba(217,184,108,0.2),rgba(7,9,18,0.96)_70%)]">
        <div className="absolute inset-0 grid place-items-center p-8">
          <div className="w-full max-w-xs rounded-3xl border border-amber-200/20 bg-black/30 p-8 text-center shadow-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-amber-200">
              {subtitle}
            </p>
            <h2 className="gold-text mt-5 text-3xl font-semibold">
              {title}
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              {thaiTitle}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-amber-200/20 bg-amber-200/5 px-3 py-1 text-xs text-amber-100">
            {statusLabels[status]}
          </span>
          <span className="text-xs text-slate-500">
            {chapterCount} ตอนที่เผยแพร่
          </span>
        </div>

        <p className="mt-5 line-clamp-3 leading-7 text-slate-400">
          {description}
        </p>

        <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
          เปิดหนังสือ →
        </span>
      </div>
    </Link>
  );
}
