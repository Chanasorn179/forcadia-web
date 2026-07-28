import type { Metadata } from "next";
import Link from "next/link";
import { searchForcadia, type SearchCategory } from "@/lib/search-data";

export const metadata: Metadata = {
  title: "ค้นหา",
  description: "ค้นหาข้อมูลทั้งหมดภายใน Codex of Fourcadir",
};

type Props = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
  }>;
};

const categoryLabels: Record<SearchCategory, string> = {
  character: "ตัวละคร",
  house: "ตระกูล",
  city: "สถานที่",
  chapter: "ตอนนิยาย",
  era: "ศักราช",
  lore: "คลังตำนาน",
};

const validCategories = Object.keys(categoryLabels) as SearchCategory[];

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = getSingleValue(params.q).trim();
  const selectedCategory = getSingleValue(params.category);

  const allResults = searchForcadia(query);
  const results = validCategories.includes(selectedCategory as SearchCategory)
    ? allResults.filter((item) => item.category === selectedCategory)
    : allResults;

  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">Search the Imperial Archive</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        ค้นหาในจักรวรรดิ
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        ค้นหาตัวละคร ตระกูล เมือง ตอนนิยาย ศักราช และข้อมูลจากคลังตำนาน
      </p>

      <form
        action="/search"
        method="get"
        className="glass-panel mt-10 rounded-3xl p-5 md:p-7"
      >
        <label
          htmlFor="search-query"
          className="text-xs uppercase tracking-[0.22em] text-slate-500"
        >
          คำค้นหา
        </label>

        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <input
            id="search-query"
            name="q"
            type="search"
            defaultValue={query}
            autoFocus
            placeholder="เช่น Astraea, Unity Crown, Lux Aeternum..."
            className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-black/20 px-5 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-amber-200/40"
          />

          <select
            name="category"
            defaultValue={selectedCategory}
            className="min-h-12 rounded-2xl border border-white/10 bg-[#0d101b] px-4 text-slate-300 outline-none focus:border-amber-200/40"
          >
            <option value="">ทุกหมวดหมู่</option>
            {validCategories.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[category]}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="min-h-12 rounded-2xl border border-amber-200/30 bg-amber-200/10 px-7 font-semibold text-amber-100 transition hover:bg-amber-200/20"
          >
            ค้นหา
          </button>
        </div>
      </form>

      {!query ? (
        <section className="mt-12 rounded-3xl border border-dashed border-amber-200/15 p-10 text-center">
          <p className="text-xl text-amber-100">เริ่มค้นหาบันทึกแห่ง Forcadia</p>
          <p className="mt-3 text-slate-500">
            ลองค้นหาชื่อตัวละคร เมือง ตระกูล หรือคำว่า Unity Crown
          </p>
        </section>
      ) : (
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Search Results</p>
              <h2 className="mt-3 text-2xl font-semibold md:text-4xl">
                ผลการค้นหา “{query}”
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              พบ {results.length} รายการ
            </p>
          </div>

          {results.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-white/10 p-10 text-center">
              <p className="text-lg text-slate-300">ไม่พบข้อมูลที่ตรงกับคำค้นหา</p>
              <p className="mt-2 text-sm text-slate-500">
                ลองใช้ชื่อภาษาอังกฤษ ภาษาไทย หรือเลือกทุกหมวดหมู่
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  className="glass-panel card-hover group rounded-3xl p-6"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-amber-200">
                    {categoryLabels[result.category]}
                  </p>

                  <h3 className="mt-3 text-2xl text-amber-100">
                    {result.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {result.subtitle}
                  </p>

                  <p className="mt-4 line-clamp-3 leading-7 text-slate-400">
                    {result.description}
                  </p>

                  <span className="mt-5 inline-flex text-sm text-amber-200 transition group-hover:translate-x-1">
                    เปิดบันทึก →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
