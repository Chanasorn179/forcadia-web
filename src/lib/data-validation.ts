import { books } from "@/data/books";
import { characters, chapters, cities } from "@/data/forcadia";
import { houses } from "@/data/houses";
import { worldLinks } from "@/data/world-links";

export type ValidationIssue = {
  code: string;
  message: string;
};

function findDuplicates(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  return [...duplicates];
}

export function validateForcadiaData(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const collections = [
    ["CHARACTER", characters.map((item) => item.slug)],
    ["HOUSE", houses.map((item) => item.slug)],
    ["CITY", cities.map((item) => item.slug)],
    ["CHAPTER", chapters.map((item) => item.slug)],
    ["BOOK", books.map((item) => item.slug)],
  ] as const;

  for (const [name, slugs] of collections) {
    for (const slug of findDuplicates([...slugs])) {
      issues.push({
        code: `DUPLICATE_${name}_SLUG`,
        message: `${name} มี slug ซ้ำ: ${slug}`,
      });
    }
  }

  for (const link of worldLinks) {
    if (!characters.some((item) => item.slug === link.characterSlug)) {
      issues.push({
        code: "MISSING_CHARACTER_REFERENCE",
        message: `ไม่พบตัวละคร ${link.characterSlug}`,
      });
    }

    if (!houses.some((item) => item.slug === link.houseSlug)) {
      issues.push({
        code: "MISSING_HOUSE_REFERENCE",
        message: `ไม่พบตระกูล ${link.houseSlug}`,
      });
    }

    if (!cities.some((item) => item.slug === link.citySlug)) {
      issues.push({
        code: "MISSING_CITY_REFERENCE",
        message: `ไม่พบเมือง ${link.citySlug}`,
      });
    }
  }

  for (const house of houses) {
    const link = worldLinks.find((item) => item.houseSlug === house.slug);

    if (!link) {
      issues.push({
        code: "HOUSE_WITHOUT_WORLD_LINK",
        message: `ตระกูล ${house.slug} ยังไม่มี WorldLink`,
      });
      continue;
    }

    if (house.rulerSlug !== link.characterSlug) {
      issues.push({
        code: "HOUSE_RULER_MISMATCH",
        message:
          `${house.slug}: rulerSlug เป็น ${house.rulerSlug} ` +
          `แต่ WorldLink เป็น ${link.characterSlug}`,
      });
    }

    if (house.citySlug !== link.citySlug) {
      issues.push({
        code: "HOUSE_CITY_MISMATCH",
        message:
          `${house.slug}: citySlug เป็น ${house.citySlug} ` +
          `แต่ WorldLink เป็น ${link.citySlug}`,
      });
    }
  }

  for (const book of books) {
    for (const chapterSlug of book.chapterSlugs) {
      if (!chapters.some((chapter) => chapter.slug === chapterSlug)) {
        issues.push({
          code: "MISSING_BOOK_CHAPTER",
          message: `${book.slug} อ้างถึงตอนที่ไม่มีอยู่: ${chapterSlug}`,
        });
      }
    }

    for (const duplicate of findDuplicates(book.chapterSlugs)) {
      issues.push({
        code: "DUPLICATE_BOOK_CHAPTER",
        message: `${book.slug} มีตอนซ้ำ: ${duplicate}`,
      });
    }
  }

  return issues;
}

export function assertForcadiaData() {
  const issues = validateForcadiaData();

  if (issues.length === 0) {
    return;
  }

  const report = issues
    .map((issue) => `[${issue.code}] ${issue.message}`)
    .join("\n");

  throw new Error(`Forcadia data validation failed:\n${report}`);
}
