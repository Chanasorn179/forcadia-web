import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  accent: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-16 w-16",
  md: "h-28 w-28",
  lg: "h-72 w-full",
};

export function HouseEmblem({
  src,
  alt,
  accent,
  size = "md",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border bg-black/20 ${sizes[size]}`}
      style={{
        borderColor: `${accent}55`,
        boxShadow: `0 0 36px ${accent}18`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={size === "lg" ? "(max-width: 1024px) 100vw, 40vw" : "180px"}
        className="object-cover"
      />
    </div>
  );
}
