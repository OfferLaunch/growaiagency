import { GlowingShadow } from "@/components/ui/glowing-shadow";

export default function GlowingShadowDemo() {
  return (
    <div className="flex items-center justify-center">
      <GlowingShadow interactive>
        <span className="pointer-events-none z-10 m-8 text-center text-9xl font-semibold leading-none tracking-tighter text-white">
          Glowing Shadow
        </span>
      </GlowingShadow>
    </div>
  );
}
