import type { Ref } from "react";

type HaloProps = {
  /** idle: dim and still. ringing: slow breathe. live: driven by --amp on the ring. */
  mode: "idle" | "ringing" | "live";
  /** Ring element. Audio code writes `--amp` (0–1) on it directly, bypassing React. */
  ringRef?: Ref<HTMLDivElement>;
};

export function Halo({ mode, ringRef }: HaloProps) {
  return (
    <div className="relative size-halo" aria-hidden="true">
      {/* soft glow behind the ring */}
      <div
        className={`absolute -inset-6 rounded-full bg-halo/15 blur-2xl transition-opacity duration-300 ${
          mode === "idle" ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={ringRef}
        className={`halo-ring absolute inset-0 rounded-full border-[3px] border-halo ${
          mode === "ringing" ? "animate-breathe" : ""
        } ${mode === "idle" ? "opacity-30!" : ""}`}
      />
      <div className="absolute inset-5 grid place-items-center rounded-full bg-call-fg/[0.07]">
        <span className="text-[3.5rem] font-bold leading-none text-call-fg">O</span>
      </div>
    </div>
  );
}
