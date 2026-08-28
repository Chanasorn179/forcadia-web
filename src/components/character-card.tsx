import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/data/forcadia";
import { getCharacterArtwork } from "@/data/media";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="glass-panel card-hover group relative overflow-hidden rounded-3xl p-5"
    >
      <div
        className="relative h-56 overflow-hidden rounded-2xl border bg-black/20"
        style={{
          borderColor: `${character.accent}55`,
          background: `radial-gradient(circle, ${character.accent}22, transparent 66%)`,
        }}
      >
        <Image
          src={getCharacterArtwork(character.slug)}
          alt={character.thaiName}
          fill
          className="object-cover object-top transition duration-700 group-hover:scale-[1.035]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#090b13] via-transparent to-transparent" />
        <span
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border bg-black/55 text-lg backdrop-blur"
          style={{ color: character.accent, borderColor: `${character.accent}66` }}
          aria-hidden="true"
        >
          {character.symbol}
        </span>
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
      <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
        เปิดบันทึกตัวละคร →
      </span>
    </Link>
  );
}
