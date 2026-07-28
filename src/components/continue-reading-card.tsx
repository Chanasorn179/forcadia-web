"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getLastRead,
  type LastReadRecord,
} from "@/lib/library-storage";

export function ContinueReadingCard() {
  const [record, setRecord] = useState<LastReadRecord | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setRecord(getLastRead());
      setReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready || !record) {
    return null;
  }

  return (
    <section className="container-page pb-10">
      <Link
        href={`/read/${record.slug}`}
        className="glass-panel card-hover group flex flex-col gap-4 rounded-3xl p-6 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p className="section-kicker">Continue Reading</p>

          <h2 className="mt-2 text-xl text-amber-100">
            {record.title}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {record.order} · อ่านแล้วประมาณ {Math.round(record.progress)}%
          </p>
        </div>

        <span className="shrink-0 text-sm text-amber-200 transition group-hover:translate-x-1">
          อ่านต่อ →
        </span>
      </Link>
    </section>
  );
}
