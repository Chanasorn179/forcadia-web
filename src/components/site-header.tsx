"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchLink } from "@/components/search-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChevronIcon, SuitIcon } from "@/components/icons";

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

export function SiteHeader() {
  const pathname = usePathname();
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const [moreOpenAt, setMoreOpenAt] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreOpen = moreOpenAt === pathname;

  const secondaryActive = secondaryItems.some((item) =>
    isActivePath(pathname, item.href),
  );

  function closeMenus() {
    setMoreOpenAt(null);
    setMobileOpen(false);
  }

  function toggleMoreMenu() {
    setMobileOpen(false);
    setMoreOpenAt((current) => current === pathname ? null : pathname);
  }

  function toggleMobileMenu() {
    setMoreOpenAt(null);
    setMobileOpen((current) => !current);
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setMoreOpenAt(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMoreOpenAt(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header sticky top-0 z-60 border-b backdrop-blur-md">
      <div className="container-page">
        <div className="flex min-h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
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

          {/* Desktop navigation */}
          <nav
            aria-label="เมนูหลัก"
            className="hidden items-center gap-1 xl:flex"
          >
            {primaryItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold transition",
                    active
                      ? "text-amber-100"
                      : "text-slate-300 hover:text-slate-100",
                  ].join(" ")}
                >
                  {active && <SuitIcon className="h-2.5 w-2.5 text-amber-300" />}
                  {item.label}
                </Link>
              );
            })}

            {/* More menu */}
            <div ref={moreMenuRef} className="relative">
              <button
                type="button"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                onClick={toggleMoreMenu}
                className={[
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold transition",
                  secondaryActive || moreOpen
                    ? "text-amber-100"
                    : "text-slate-300 hover:text-slate-100",
                ].join(" ")}
              >
                {secondaryActive && <SuitIcon className="h-2.5 w-2.5 text-amber-300" />}
                เพิ่มเติม
                <ChevronIcon
                  className={[
                    "h-3.5 w-3.5 transition-transform",
                    moreOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  className="more-menu absolute right-0 top-[calc(100%+0.75rem)] w-56 overflow-hidden rounded-2xl border p-2"
                >
                  {secondaryItems.map((item) => {
                    const active = isActivePath(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                        role="menuitem"
                        aria-current={active ? "page" : undefined}
                        className={[
                          "more-menu-link flex items-center justify-between rounded-xl px-4 py-3 text-sm transition",
                          active
                            ? "text-amber-100"
                            : "text-slate-300 hover:bg-white/5 hover:text-slate-100",
                        ].join(" ")}
                      >
                        {item.label}

                        {active && <SuitIcon className="h-2.5 w-2.5 text-amber-300" />}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            <SearchLink />
            <ThemeToggle />

            <Link
              href="/read"
              onClick={closeMenus}
              className="btn-action hidden min-h-11 items-center rounded-full px-5 text-sm font-bold transition sm:inline-flex"
            >
              เริ่มอ่าน
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={toggleMobileMenu}
              className="theme-toggle grid h-11 w-11 place-items-center rounded-full border transition xl:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={[
                    "absolute left-0 top-0 h-px w-5 bg-current transition",
                    mobileOpen ? "translate-y-[7px] rotate-45" : "",
                  ].join(" ")}
                />

                <span
                  className={[
                    "absolute left-0 top-[7px] h-px w-5 bg-current transition",
                    mobileOpen ? "opacity-0" : "",
                  ].join(" ")}
                />

                <span
                  className={[
                    "absolute bottom-0 left-0 h-px w-5 bg-current transition",
                    mobileOpen ? "-translate-y-[7px] -rotate-45" : "",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <nav
            id="mobile-navigation"
            aria-label="เมนูมือถือ"
            className="border-t border-white/10 py-4 xl:hidden"
          >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[...primaryItems, ...secondaryItems].map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition",
                      active
                        ? "border-amber-200/40 text-amber-100"
                        : "border-white/10 text-slate-300 hover:bg-white/5",
                    ].join(" ")}
                  >
                    {item.label}

                    {active && <SuitIcon className="h-2.5 w-2.5 text-amber-300" />}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/read"
              onClick={closeMenus}
              className="btn-action mt-3 flex min-h-12 w-full items-center justify-center rounded-2xl px-5 font-bold sm:hidden"
            >
              เริ่มอ่าน
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
