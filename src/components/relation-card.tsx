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
      className="glass-panel card-hover group rounded-2xl p-5"
    >
      <h3 className="text-lg text-amber-100">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        {eyebrow}
      </p>

      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {description}
        </p>
      )}

      <span className="mt-4 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
        เปิดบันทึก
      </span>
    </Link>
  );
}
