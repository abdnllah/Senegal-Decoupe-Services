import { logoShapes } from "./logo-shapes.generated";

// Charcoal parts follow the text colour (ink on paper, white on photos); orange parts use the accent.
export function Logo({ className, title = "Sénégal Découpe Services" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 15 1800 975" className={className} role="img" aria-label={title} fillRule="evenodd">
      {logoShapes.map((s, i) => {
        const fill = s.accent ? "var(--color-accent)" : "currentColor";
        return s.tag === "path" ? (
          <path key={i} d={s.d} fill={fill} />
        ) : (
          <rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} fill={fill} />
        );
      })}
    </svg>
  );
}
