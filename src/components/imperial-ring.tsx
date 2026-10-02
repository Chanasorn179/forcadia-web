import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

type RingHouse = {
  slug: string;
  name: string;
  emblem: string;
  accent: string;
};

const GAP_CENTER = 202.5; // between the 5th and 6th crest, lower left
const GAP_HALF = 7;

function point(radius: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return [50 + radius * Math.sin(rad), 50 - radius * Math.cos(rad)] as const;
}

/** A circle arc drawn clockwise from `from` to `to` degrees (0 = top). */
function arc(radius: number, from: number, to: number) {
  const [x1, y1] = point(radius, from);
  const [x2, y2] = point(radius, to);
  const sweep = (to - from + 360) % 360;
  const large = sweep > 180 ? 1 : 0;
  return `M ${x1.toFixed(3)} ${y1.toFixed(3)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(3)} ${y2.toFixed(3)}`;
}

/** Jagged fracture lines at each side of the break. */
function fracture(angle: number, direction: 1 | -1) {
  const steps = [
    [41, 0],
    [43.4, direction * 1.4],
    [41.8, direction * 2.6],
    [44.2, direction * 3.4],
  ];
  return steps
    .map(([r, offset], index) => {
      const [x, y] = point(r, angle + offset);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(3)} ${y.toFixed(3)}`;
    })
    .join(" ");
}

export function ImperialRing({ houses }: { houses: RingHouse[] }) {
  const ringStart = GAP_CENTER + GAP_HALF;
  const ringEnd = GAP_CENTER - GAP_HALF + 360;

  return (
    <div className="imperial-ring ring-fade-in">
      <svg className="ring-lines" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id="ring-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ead39c" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#c9a45c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8f6f32" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <path d={arc(41, ringStart, ringEnd)} fill="none" stroke="url(#ring-gold)" strokeWidth="0.45" />
        <path d={arc(43.2, ringStart + 1.5, ringEnd - 1.5)} fill="none" stroke="#c9a45c" strokeOpacity="0.28" strokeWidth="0.18" />
        <circle cx="50" cy="50" r="29" fill="none" stroke="#c9a45c" strokeOpacity="0.2" strokeWidth="0.18" strokeDasharray="0.6 1.4" />

        <path d={fracture(GAP_CENTER + GAP_HALF, -1)} fill="none" stroke="#ead39c" strokeOpacity="0.7" strokeWidth="0.25" />
        <path d={fracture(GAP_CENTER - GAP_HALF, 1)} fill="none" stroke="#ead39c" strokeOpacity="0.7" strokeWidth="0.25" />

        {/* Shards drifting out of the break */}
        {[
          [47.5, GAP_CENTER - 2, 0.7],
          [50.5, GAP_CENTER + 3, 0.5],
          [53, GAP_CENTER - 0.5, 0.35],
        ].map(([r, a, s]) => {
          const [x, y] = point(r, a);
          return (
            <rect
              key={`${r}-${a}`}
              x={x - s / 2}
              y={y - s / 2}
              width={s}
              height={s}
              fill="#c9a45c"
              fillOpacity="0.7"
              transform={`rotate(45 ${x} ${y})`}
            />
          );
        })}
      </svg>

      <div className="ring-center">
        <Image
          src="/images/logos/unity-crown-ornate-transparent.png"
          alt="Unity Crown"
          width={220}
          height={220}
          priority
          className="h-[78%] w-[78%] object-contain drop-shadow-[0_10px_40px_rgba(201,164,92,0.35)]"
        />
      </div>

      {houses.slice(0, 8).map((house, index) => (
        <Link
          key={house.slug}
          href={`/houses/${house.slug}`}
          aria-label={house.name}
          className="ring-crest"
          style={
            {
              "--angle": `${index * 45}deg`,
              "--accent": house.accent,
              "--i": index,
            } as CSSProperties
          }
        >
          <span className="crest-disc">
            <Image
              src={house.emblem}
              alt=""
              fill
              sizes="96px"
              className="object-contain p-[6%]"
            />
          </span>
          <span className="crest-name">{house.name.replace(/^House\s+/, "")}</span>
        </Link>
      ))}
    </div>
  );
}
