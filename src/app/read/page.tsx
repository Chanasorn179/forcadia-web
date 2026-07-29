import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ReadPage() {
  const firstChapter = await prisma.chapter.findFirst({
    where: {
      published: true,
    },
    orderBy: [
      {
        book: {
          order: "asc",
        },
      },
      {
        sortOrder: "asc",
      },
    ],
    select: {
      slug: true,
    },
  });

  if (!firstChapter) {
    redirect("/books");
  }

  redirect(`/read/${firstChapter.slug}`);
}
