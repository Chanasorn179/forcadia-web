import Link from "next/link";
import { SearchIcon } from "@/components/icons";

export function SearchLink() {
  return (
    <Link
      href="/search"
      aria-label="ค้นหาในเว็บไซต์"
      title="ค้นหา"
      className="theme-toggle grid h-11 w-11 shrink-0 place-items-center rounded-full border transition"
    >
      <SearchIcon className="h-[18px] w-[18px]" />
    </Link>
  );
}
