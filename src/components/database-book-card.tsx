import Image from "next/image";
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
      className="glass-panel card-hover group grid gap-6 rounded-xl p-5 sm:grid-cols-[11rem_1fr] sm:p-6"
    >
      {/* Book cover: a bound volume with a gilt spine */}
      <div className="relative mx-auto aspect-[2/3] w-40 overflow-hidden rounded-r-md rounded-l-sm border border-[var(--plate-edge)] bg-[radial-gradient(circle_at_50%_38%,rgba(201,164,92,0.22),transparent_60%),linear-gradient(160deg,#1a1626,#0b0c13)] shadow-[0_18px_40px_rgba(0,0,0,0.5)] sm:w-full">
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-3 bg-linear-to-r from-[#8f6f32] via-[#c9a45c] to-[#5c4520] opacity-80" />
        <span aria-hidden="true" className="absolute inset-y-3 left-5 right-3 rounded-sm border border-[rgba(234,211,156,0.25)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pl-5 pr-3 text-center">
          <Image
            src="/images/logos/unity-crown-webmark-gold.svg"
            alt=""
            width={44}
            height={44}
            className="opacity-90"
          />
          <p className="font-[family-name:var(--font-display)] text-lg leading-tight text-[#ead39c]">
            {title}
          </p>
          <span aria-hidden="true" className="h-px w-10 bg-[#c9a45c]/60" />
          <p className="px-1 text-[0.68rem] leading-4 text-[#b9b2a0]">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <span className="house-mark">{statusLabels[status]}</span>
          <span className="text-xs text-slate-500">{chapterCount} ตอนที่เผยแพร่</span>
        </div>

        <h2 className="mt-2 text-3xl text-[var(--foreground)]">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{thaiTitle}</p>

        <p className="mt-4 line-clamp-4 leading-7 text-slate-400">
          {description}
        </p>

        <span className="mt-auto pt-5 text-sm text-[var(--gold)] transition group-hover:text-[var(--gold-soft)]">
          เปิดสารบัญ
        </span>
      </div>
    </Link>
  );
}
