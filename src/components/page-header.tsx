import type { ReactNode } from "react";

type Props = {
  /** Latin inscription line shown above the title. */
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional element aligned to the end of the title row (e.g. a link). */
  aside?: ReactNode;
  className?: string;
};

export function PageHeader({ kicker, title, lede, aside, className = "" }: Props) {
  return (
    <header className={`page-header ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0">
          {kicker && <p className="section-kicker">{kicker}</p>}
          <h1>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </header>
  );
}

export function SectionHeading({
  kicker,
  title,
  aside,
}: {
  kicker?: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && <p className="section-kicker">{kicker}</p>}
        <h2 className="mt-2 text-3xl md:text-[2.75rem]">{title}</h2>
      </div>
      {aside}
    </div>
  );
}
