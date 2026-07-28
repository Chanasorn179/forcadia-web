import type { Metadata } from "next";
import { BookCard } from "@/components/book-card";
import { books, getBookChapters } from "@/data/books";

export const metadata: Metadata = {
  title: "หนังสือ",
  description: "รวมหนังสือทั้งหมดในจักรวาล Forcadia",
};

export default function BooksPage() {
  return (
    <main className="container-page py-16 md:py-24">
      <p className="section-kicker">The Imperial Library</p>

      <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
        หนังสือแห่ง Forcadia
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        รวมเรื่องราวทุกเล่มในมหากาพย์ The Shattered Ring
        ตั้งแต่บัลลังก์ที่ว่างเปล่าไปจนถึงศึกชี้ชะตาแห่งวงแหวน
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {books
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((book) => (
            <BookCard
              key={book.slug}
              book={book}
              chapterCount={getBookChapters(book).length}
            />
          ))}
      </div>
    </main>
  );
}
