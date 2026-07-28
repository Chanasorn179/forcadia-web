import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      books,
      chapters,
      characters,
      houses,
      cities,
    ] = await Promise.all([
      prisma.book.count(),
      prisma.chapter.count(),
      prisma.character.count(),
      prisma.house.count(),
      prisma.city.count(),
    ]);

    return NextResponse.json({
      ok: true,
      database: "connected",
      counts: {
        books,
        chapters,
        characters,
        houses,
        cities,
      },
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    return NextResponse.json(
      {
        ok: false,
        database: "disconnected",
      },
      {
        status: 503,
      },
    );
  }
}
