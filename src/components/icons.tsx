import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </Icon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </Icon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />
    </Icon>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

/* The deck's suit mark: a lozenge, used for the active place in navigation. */
export function SuitIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 18.5 12 12 20.5 5.5 12Z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

export function BookmarkIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <Icon {...props}>
      <path d="M7 3.5h10v17l-5-3.6-5 3.6Z" fill={filled ? "currentColor" : "none"} />
    </Icon>
  );
}

/* The world's own marks. Content stores them as single characters; each one
   is drawn here so it keeps its meaning instead of falling back to a font glyph. */
const symbolPaths: Record<string, React.ReactNode> = {
  "☀": (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
    </>
  ),
  "⌛": (
    <>
      <path d="M6.5 3h11M6.5 21h11" />
      <path d="M7.5 3c0 5 4.5 6.5 4.5 9s-4.5 4-4.5 9M16.5 3c0 5-4.5 6.5-4.5 9s4.5 4 4.5 9" />
      <path d="M9.5 18.5h5" />
    </>
  ),
  "≋": <path d="M3 8c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 12.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0M3 17c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0" />,
  "♛": (
    <>
      <path d="M4 18.5h16M5 18.5 3.5 8l5 4L12 5l3.5 7 5-4L19 18.5" />
      <circle cx="12" cy="4" r="0.6" fill="currentColor" />
    </>
  ),
  "♜": <path d="M6 21h12M7 21l1-9h8l1 9M7.5 12 6 9V4h2.5v2h2V4h3v2h2V4H18v5l-1.5 3" />,
  "⚿": (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M17.5 12v3.5M20.5 12v2.5" />
    </>
  ),
  "⬢": <path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4Z" fill="currentColor" stroke="none" />,
  "◉": (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none" />
    </>
  ),
  "◯": <circle cx="12" cy="12" r="8" />,
  "◆": <path d="M12 3.5 18.5 12 12 20.5 5.5 12Z" fill="currentColor" stroke="none" />,
  "◇": <path d="M12 3.5 18.5 12 12 20.5 5.5 12Z" />,
  "♢": <path d="M12 3.5 18.5 12 12 20.5 5.5 12Z" />,
  "✦": <path d="M12 2.5c.8 5.2 4.3 8.7 9.5 9.5-5.2.8-8.7 4.3-9.5 9.5-.8-5.2-4.3-8.7-9.5-9.5 5.2-.8 8.7-4.3 9.5-9.5Z" fill="currentColor" stroke="none" />,
};

export function SymbolIcon({ symbol, ...props }: IconProps & { symbol: string }) {
  return <Icon {...props}>{symbolPaths[symbol] ?? symbolPaths["◆"]}</Icon>;
}
