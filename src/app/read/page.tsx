import { redirect } from "next/navigation";
import { getFirstPublishedChapter } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export default async function ReadPage() {
  const firstChapter = await getFirstPublishedChapter();

  if (!firstChapter) {
    redirect("/books");
  }

  redirect(`/read/${firstChapter.slug}`);
}
