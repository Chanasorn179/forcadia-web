import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/data/forcadia";
import { houses } from "@/data/houses";
import { getCharacterArtwork } from "@/data/media";

export function CharacterCard({ character }: { character: Character }) {
  const houseSlug = houses.find((house) => house.name === character.house)?.slug;

  return (
    <Link
      href={`/characters/${character.slug}`}
      className="portrait-card card-hover group"
      data-house={houseSlug}
    >
      <span className="portrait-card-art">
        <Image
          src={getCharacterArtwork(character.slug)}
          alt=""
          fill
          className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </span>
      <span className="portrait-card-body">
        <h3 className="portrait-card-name">{character.name}</h3>
        <span className="portrait-card-title">{character.title}</span>
        <span className="portrait-card-house">{character.house}</span>
        <p className="portrait-card-summary">{character.summary}</p>
      </span>
    </Link>
  );
}
