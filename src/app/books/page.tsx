import { PageHeader } from "@/components/page-header";
import type { Metadata } from "next";
import { DatabaseBookCard } from "@/components/database-book-card";
import { getPublishedBooks } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "หนังสือ",
  description: "รวมหนังสือที่เผยแพร่ในจักรวาล Forcadia",
};

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await getPublishedBooks();

  return (
    <main className="container-page pb-16 md:pb-24">
      <PageHeader
        kicker="The Imperial Library"
        title={<>หนังสือแห่ง Forcadia</>}
        lede={<>รวมเรื่องราวที่ได้รับการเผยแพร่จาก Imperial Archive</>}
      />

      {books.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {books.map((book) => (
            <DatabaseBookCard
              key={book.id}
              slug={book.slug}
              title={book.title}
              thaiTitle={book.thaiTitle}
              subtitle={book.subtitle}
              description={book.description}
              status={book.status}
              chapterCount={book._count.chapters}
            />
          ))}
        </div>
      ) : (
        <section className="mt-10 rounded-xl border border-dashed border-white/10 p-10 text-center">
          <p className="text-xl text-slate-300">
            ยังไม่มีหนังสือที่เผยแพร่
          </p>
          <p className="mt-3 text-sm text-slate-500">
            เปิดสถานะเผยแพร่ของตอนจาก Admin Dashboard ก่อน
          </p>
        </section>
      )}
    </main>
  );
}
