import Link from "next/link";

type Props = {
  href: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function RelationCard({
  href,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/3 p-5 transition hover:-translate-y-0.5 hover:border-amber-200/30 hover:bg-amber-200/5"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-lg text-amber-100">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {description}
        </p>
      )}

      <span className="mt-4 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
        เปิดบันทึก →
      </span>
    </Link>
  );
}
