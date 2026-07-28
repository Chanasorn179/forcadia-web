import { redirect } from "next/navigation";
import { books } from "@/data/books";

export default function ReadPage() {
  const firstBook = books
    .slice()
    .sort((a, b) => a.order - b.order)[0];

  if (!firstBook) {
    redirect("/books");
  }

  redirect(`/books/${firstBook.slug}`);
}
