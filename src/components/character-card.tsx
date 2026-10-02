import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Character } from "@/data/forcadia";
import { getCharacterArtwork } from "@/data/media";

type Props = {
  character: Pick<Character, "slug" | "name" | "thaiName" | "title" | "house" | "accent" | "summary">;
  /** Show the summary paragraph under the name. */
  showSummary?: boolean;
  priority?: boolean;
};

export function CharacterCard({ character, showSummary = true, priority = false }: Props) {
  const artwork = getCharacterArtwork(character.slug);
  const isPortrait = artwork.includes("/portraits/");

  return (
    <Link
      href={`/characters/${character.slug}`}
      className="portrait-card group"
      style={{ "--accent": character.accent } as CSSProperties}
    >
      <div className="portrait-art">
        <Image
          src={artwork}
          alt={character.thaiName}
          fill
          priority={priority}
          className={isPortrait ? "object-cover object-top" : "object-contain p-10 opacity-80"}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <span className="portrait-frame" aria-hidden="true" />
      </div>

      <div className="relative -mt-14 flex flex-1 flex-col px-3.5 pb-4 sm:-mt-16 sm:px-5 sm:pb-5">
        <span className="house-mark relative z-10">{character.house.replace(/^House\s+/, "")}</span>
        <h3 className="relative z-10 mt-1 text-lg leading-tight sm:text-[1.45rem] text-[var(--foreground)]">
          {character.name}
        </h3>
        <p className="mt-1 text-xs text-[var(--gold)] sm:text-sm">{character.title}</p>
        {showSummary && (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">
            {character.summary}
          </p>
        )}
      </div>
    </Link>
  );
}
