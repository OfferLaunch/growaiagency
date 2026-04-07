import "./glowing-shadow.css";

import { type ReactNode } from "react";

import { clsx } from "clsx";

export interface GlowingShadowProps {
  children: ReactNode;
  className?: string;
  /** Edge-to-edge inner content (e.g. video) — no padding inside the frame */
  flush?: boolean;
  /** Use button semantics (omit for video embeds) */
  interactive?: boolean;
}

export function GlowingShadow({
  children,
  className,
  flush,
  interactive,
}: GlowingShadowProps) {
  return (
    <div
      className={clsx("glow-container", className)}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <span className="glow" aria-hidden />
      <div className={clsx("glow-content", flush && "glow-content--flush")}>
        {children}
      </div>
    </div>
  );
}
