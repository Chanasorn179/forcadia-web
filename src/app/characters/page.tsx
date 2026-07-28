import type { Metadata } from "next";
import { CharacterCard } from "@/components/character-card";
import { characters } from "@/data/forcadia";

export const metadata: Metadata = { title: "ตัวละคร" };

export default function CharactersPage() {
  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">The Eight Sovereigns</p>
      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        รายนามผู้ปกครอง
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        ผู้พิทักษ์กุญแจราชันย์ทั้งแปด ผู้ค้ำจุนจักรวรรดิเดียวกัน
        และอาจเป็นผู้ทำลายมันด้วยมือของตนเอง
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard key={character.slug} character={character} />
        ))}
      </div>
    </main>
  );
}
