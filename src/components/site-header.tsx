"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchLink } from "@/components/search-link";
import { ThemeToggle } from "@/components/theme-toggle";

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

  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const secondaryActive = secondaryItems.some((item) =>
    isActivePath(pathname, item.href),
  );

  function closeMenus() {
    setMoreOpen(false);
    setMobileOpen(false);
  }

  function toggleMoreMenu() {
    setMobileOpen(false);
    setMoreOpen((current) => !current);
  }

  function toggleMobileMenu() {
    setMoreOpen(false);
    setMobileOpen((current) => !current);
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMoreOpen(false);
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
    <header className="site-header sticky top-0 z-60 border-b shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="container-page">
        <div className="flex min-h-18 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="Forcadia Imperial Archive"
            className="flex min-w-0 items-center gap-3"
          >
            <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-amber-200/30 bg-amber-200/5 p-1.5 shadow-[inset_0_0_16px_rgba(217,184,108,0.08)]">
              <Image
                src="/images/logos/unity-crown-webmark-gold.svg"
                alt=""
                fill
                className="object-contain p-1.5"
                sizes="40px"
              />
            </span>

            <span className="min-w-0">
              <span className="block truncate font-serif text-lg font-semibold tracking-[0.12em] text-amber-100">
                FOURCADIR
              </span>

              <span className="hidden text-[10px] uppercase tracking-[0.25em] text-slate-400 sm:block">
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
                    "relative rounded-full px-4 py-3 text-sm font-semibold transition",
                    active
                      ? "bg-amber-100/10 text-amber-50"
                      : "text-slate-300 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}

                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 -bottom-1 h-px bg-amber-300"
                    />
                  )}
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
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
                  secondaryActive || moreOpen
                    ? "bg-amber-100/10 text-amber-50"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                เพิ่มเติม
                <span
                  aria-hidden="true"
                  className={[
                    "text-xs transition-transform",
                    moreOpen ? "rotate-180" : "",
                  ].join(" ")}
                >
                  ▾
                </span>
                {secondaryActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 -bottom-1 h-px bg-amber-300"
                  />
                )}
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+0.75rem)] w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e18]/98 p-2 shadow-2xl backdrop-blur-xl"
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
                          "flex items-center justify-between rounded-xl px-4 py-3 text-sm transition",
                          active
                            ? "bg-amber-200/10 text-amber-100"
                            : "text-slate-300 hover:bg-white/5 hover:text-white",
                        ].join(" ")}
                      >
                        {item.label}

                        {active && <span aria-hidden="true">✦</span>}
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
              className="hidden rounded-full border border-amber-200/30 px-5 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-200/10 sm:inline-flex"
            >
              เริ่มอ่าน
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={toggleMobileMenu}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white xl:hidden"
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
                        ? "border-amber-200/30 bg-amber-200/10 text-amber-100"
                        : "border-white/10 text-slate-300 hover:bg-white/5",
                    ].join(" ")}
                  >
                    {item.label}

                    {active && <span aria-hidden="true">✦</span>}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/read"
              onClick={closeMenus}
              className="mt-3 flex w-full items-center justify-center rounded-2xl border border-amber-200/30 bg-amber-200/10 px-5 py-3 font-semibold text-amber-100 sm:hidden"
            >
              เริ่มอ่าน
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
