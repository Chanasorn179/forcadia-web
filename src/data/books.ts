import { chapters } from "@/data/forcadia";

export type BookStatus = "draft" | "ongoing" | "completed";

export type Book = {
  slug: string;
  title: string;
  thaiTitle: string;
  subtitle: string;
  description: string;
  cover?: string;
  status: BookStatus;
  order: number;
  chapterSlugs: string[];
};

export const books: Book[] = [
  {
    slug: "the-empty-throne",
    title: "Book I: The Empty Throne",
    thaiTitle: "เล่มที่ 1 บัลลังก์ว่างเปล่า",
    subtitle: "Forcadia: The Shattered Ring",
    description:
      "เมื่อวงแหวนแห่งจักรวรรดิแตกร้าว บัลลังก์กลางไร้ผู้ครอบครอง และผู้พิทักษ์ทั้งแปดต้องเผชิญกับความลับที่ถูกฝังไว้เหนือกาลเวลา",
    status: "ongoing",
    order: 1,
    chapterSlugs: chapters.map((chapter) => chapter.slug),
  },
];

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}

export function getBookChapters(book: Book) {
  return book.chapterSlugs
    .map((slug) => chapters.find((chapter) => chapter.slug === slug))
    .filter((chapter): chapter is (typeof chapters)[number] => Boolean(chapter));
}
