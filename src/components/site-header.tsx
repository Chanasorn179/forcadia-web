"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchLink } from "@/components/search-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronIcon, SuitIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavItem = {
  href: string;
  label: string;
};

const primaryItems: NavItem[] = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/books", label: "หนังสือ" },
  { href: "/characters", label: "ตัวละคร" },
  { href: "/houses", label: "ตระกูล" },
  { href: "/world", label: "จักรวรรดิ" },
];

const secondaryItems: NavItem[] = [
  { href: "/timeline", label: "เส้นเวลา" },
  { href: "/lore", label: "คลังตำนาน" },
  { href: "/glossary", label: "คำศัพท์" },
  { href: "/sovereign-keys", label: "กุญแจราชันย์" },
  { href: "/gallery", label: "หอศิลป์" },
  { href: "/library", label: "ชั้นหนังสือ" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuIcon() {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span className="absolute left-0 top-0 h-px w-5 bg-current" />
      <span className="absolute left-0 top-[7px] h-px w-5 bg-current" />
      <span className="absolute bottom-0 left-0 h-px w-5 bg-current" />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const secondaryActive = secondaryItems.some((item) =>
    isActivePath(pathname, item.href),
  );

  return (
    <header className="site-header sticky top-0 z-60 border-b backdrop-blur-md">
      <div className="container-page">
        <div className="flex min-h-18 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Forcadia Imperial Archive"
            className="flex min-w-0 items-center gap-3"
          >
            <span className="relative grid h-10 w-10 shrink-0 place-items-center">
              <Image
                src="/images/logos/unity-crown-webmark-gold.svg"
                alt=""
                fill
                className="object-contain p-1.5"
                sizes="40px"
              />
            </span>

            <span className="min-w-0">
              <span className="card-title block truncate text-base tracking-[0.08em] text-amber-100 sm:text-lg sm:tracking-[0.14em]">
                FOURCADIR
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.22em] text-slate-400 sm:block">
                Imperial Archive
              </span>
            </span>
          </Link>

          <nav aria-label="เมนูหลัก" className="hidden items-center gap-1 xl:flex">
            {primaryItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold transition",
                    active ? "text-amber-100" : "text-slate-300 hover:text-slate-100",
                  ].join(" ")}
                >
                  {active && <SuitIcon className="h-2.5 w-2.5 text-amber-300" />}
                  {item.label}
                </Link>
              );
            })}

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                className={[
                  "group relative inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold transition outline-none",
                  secondaryActive
                    ? "text-amber-100"
                    : "text-slate-300 hover:text-slate-100 data-[state=open]:text-amber-100",
                ].join(" ")}
              >
                {secondaryActive && <SuitIcon className="h-2.5 w-2.5 text-amber-300" />}
                เพิ่มเติม
                <ChevronIcon className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={12} className="deck-menu w-56">
                {secondaryItems.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="deck-menu-item justify-between"
                      >
                        {item.label}
                        {active && <SuitIcon className="h-2.5 w-2.5 text-amber-300" />}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <SearchLink />
            <ThemeToggle />

            <Link
              href="/read"
              className="btn-action hidden min-h-11 items-center rounded-full px-5 text-sm font-bold transition sm:inline-flex"
            >
              เริ่มอ่าน
            </Link>

            <Sheet>
              <SheetTrigger
                aria-label="เปิดเมนู"
                className="theme-toggle grid h-11 w-11 place-items-center rounded-full border transition xl:hidden"
              >
                <MenuIcon />
              </SheetTrigger>

              <SheetContent side="right" className="deck-sheet w-[min(22rem,88vw)] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="card-title text-xl font-normal text-amber-100">
                    FOURCADIR
                  </SheetTitle>
                  <SheetDescription className="text-slate-400">
                    เลือกปลายทางในคลังจักรวรรดิ
                  </SheetDescription>
                </SheetHeader>

                <nav aria-label="เมนูมือถือ" className="grid gap-2 px-4">
                  {[...primaryItems, ...secondaryItems].map((item) => {
                    const active = isActivePath(pathname, item.href);

                    return (
                      <SheetClose key={item.href} asChild>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={[
                            "flex min-h-12 items-center justify-between rounded-2xl border px-4 text-[15px] transition",
                            active
                              ? "border-amber-200/40 text-amber-100"
                              : "border-white/10 text-slate-300 hover:bg-white/5",
                          ].join(" ")}
                        >
                          {item.label}
                          {active && <SuitIcon className="h-2.5 w-2.5 text-amber-300" />}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                <div className="p-4">
                  <SheetClose asChild>
                    <Link
                      href="/read"
                      className="btn-action flex min-h-12 w-full items-center justify-center rounded-2xl px-5 font-bold"
                    >
                      เริ่มอ่าน
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
