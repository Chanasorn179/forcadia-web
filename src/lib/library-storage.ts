export type LastReadRecord = {
  slug: string;
  title: string;
  order: string;
  progress: number;
  savedAt: string;
};

export type BookmarkRecord = {
  slug: string;
  title: string;
  order: string;
  excerpt: string;
  savedAt: string;
};

const LAST_READ_KEY = "forcadia:last-read";
const BOOKMARKS_KEY = "forcadia:bookmarks";

export function getLastRead(): LastReadRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(LAST_READ_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as LastReadRecord;

    if (
      typeof parsed.slug !== "string" ||
      typeof parsed.title !== "string" ||
      typeof parsed.progress !== "number"
    ) {
      return null;
    }

    return parsed;
  } catch {
    localStorage.removeItem(LAST_READ_KEY);
    return null;
  }
}

export function getBookmarks(): BookmarkRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(BOOKMARKS_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as BookmarkRecord[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item) =>
        typeof item.slug === "string" &&
        typeof item.title === "string" &&
        typeof item.order === "string",
    );
  } catch {
    localStorage.removeItem(BOOKMARKS_KEY);
    return [];
  }
}

export function isBookmarked(slug: string) {
  return getBookmarks().some((item) => item.slug === slug);
}

export function addBookmark(bookmark: BookmarkRecord) {
  const current = getBookmarks();
  const withoutDuplicate = current.filter(
    (item) => item.slug !== bookmark.slug,
  );

  localStorage.setItem(
    BOOKMARKS_KEY,
    JSON.stringify([bookmark, ...withoutDuplicate]),
  );
}

export function removeBookmark(slug: string) {
  const next = getBookmarks().filter((item) => item.slug !== slug);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
}

export function clearBookmarks() {
  localStorage.removeItem(BOOKMARKS_KEY);
}
