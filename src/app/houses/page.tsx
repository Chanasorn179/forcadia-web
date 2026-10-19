import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublicHouses } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "แปดตระกูลจักรพรรดิ",
};

export const dynamic = "force-dynamic";

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default async function HousesPage() {
  const houses = await getPublicHouses();
  return (
    <main className="container-page py-16 md:py-24">
      <h1 className="text-4xl md:text-6xl">แปดตระกูลจักรพรรดิ</h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        ตราประจำตระกูลทั้งแปดคือสัญลักษณ์แห่งอำนาจ หน้าที่
        และคำปฏิญาณที่ค้ำจุนจักรวรรดิ Forcadia
      </p>

      <ul className="house-arcana mt-14">
        {houses.map((house, index) => (
          <li key={house.slug}>
            <Link
              href={`/houses/${house.slug}`}
              className="house-arcanum card-hover"
              data-house={house.slug}
            >
              <span className="arcana-index house-arcanum-index" aria-hidden="true">
                {numerals[index]}
              </span>
              <span className="house-arcanum-crest">
                <Image
                  src={house.emblem}
                  alt={`ตรา ${house.name}`}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 220px"
                  className="object-contain"
                />
              </span>
              <h2 className="house-arcanum-name">{house.name.replace("House ", "")}</h2>
              <span className="house-arcanum-thai">{house.thaiName}</span>
              <span className="house-arcanum-emblem">{house.emblemName}</span>
              <p className="house-arcanum-text">{house.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
