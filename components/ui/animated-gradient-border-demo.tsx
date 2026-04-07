import { Zap } from "lucide-react";

import { BorderRotate } from "@/components/ui/animated-gradient-border";

/** Minimal demo; expand with Tailwind where you render this. */
export function AnimatedGradientBorderDemo() {
  return (
    <div style={{ padding: 48, display: "flex", justifyContent: "center" }}>
      <BorderRotate className="p-8" animationMode="rotate-on-hover" animationSpeed={6}>
        <div style={{ color: "#fff", textAlign: "center" }}>
          <Zap
            style={{ width: 32, height: 32, margin: "0 auto 12px", display: "block" }}
            aria-hidden
          />
          <h3 style={{ margin: 0, fontSize: "1.25rem" }}>Animated border</h3>
        </div>
      </BorderRotate>
    </div>
  );
}
