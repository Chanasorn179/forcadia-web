type Props = {
  name: string;
  thaiName: string;
  /** Heading level the plate carries; it is the House's title, not decoration. */
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
};

/**
 * The brand kit's House nameplate, drawn in CSS so the name stays real text:
 * a black plate, double gold frame and a lozenge at each end.
 */
export function Nameplate({ name, thaiName, as: Heading = "h2", size = "md", className = "" }: Props) {
  /* "House Void-Requiem" sets as "House" over "Void-Requiem", so a plate never
     breaks a House name at its hyphen. */
  const match = name.match(/^(House)\s+(.+)$/);
  const prefix = match?.[1];
  const core = match?.[2] ?? name;

  return (
    <div className={`nameplate nameplate-${size} ${className}`}>
      <span className="nameplate-lozenge nameplate-lozenge-start" aria-hidden="true" />
      <Heading className="nameplate-name">
        {prefix && <span className="nameplate-prefix">{prefix} </span>}
        <span className="nameplate-core">{core}</span>
      </Heading>
      <span className="nameplate-thai">{thaiName}</span>
      <span className="nameplate-lozenge nameplate-lozenge-end" aria-hidden="true" />
    </div>
  );
}
