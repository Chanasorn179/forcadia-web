import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";
import { CharacterCard } from "@/components/character-card";
import { getPublicCharacters } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "ตัวละคร",
  description: "ผู้ครองอำนาจแห่งจักรวรรดิ Forcadia",
};

export const dynamic = "force-dynamic";

export default async function CharactersPage() {
  const characters = await getPublicCharacters();

  return (
    <main className="container-page pb-16 md:pb-24">
      <PageHeader
        kicker="Dramatis Personae"
        title={<>ผู้ครองอำนาจทั้งแปด</>}
        lede={<>บันทึกผู้ครองอำนาจแห่งจักรวรรดิและตระกูลที่พวกเขาสังกัด</>}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            priority={index < 4}
            character={{
              slug: character.slug,
              name: character.name,
              thaiName: character.thaiName,
              title: character.title,
              house: character.house?.name ?? "Independent",
              accent: character.accent,
              summary: character.summary,
            }}
          />
        ))}
      </div>
    </main>
  );
}
