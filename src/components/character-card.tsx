import Link from "next/link";
import type { Character } from "@/data/forcadia";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="glass-panel card-hover group overflow-hidden rounded-3xl p-5"
    >
      <div
        className="grid h-40 place-items-center rounded-2xl border bg-black/20 text-6xl"
        style={{
          color: character.accent,
          borderColor: `${character.accent}55`,
          background: `radial-gradient(circle, ${character.accent}22, transparent 66%)`,
        }}
      >
        {character.symbol}
      </div>
      <p className="mt-5 text-xs uppercase tracking-[0.25em] text-slate-500">
        {character.house}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-slate-100">
        {character.name}
      </h3>
      <p className="mt-1 text-sm text-slate-400">{character.title}</p>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-400">
        {character.summary}
      </p>
      <span className="mt-5 inline-flex text-sm text-amber-200">
        เปิดบันทึกตัวละคร →
      </span>
    </Link>
  );
}
