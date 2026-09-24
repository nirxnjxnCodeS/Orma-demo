import { PHASES, type Phase } from "@/lib/machine";

/** Presenter/debug only. Shows where the state machine is. */
export function DebugReadout({ phase }: { phase: Phase }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-2 z-50 rounded-md bg-black/50 px-2 py-1 font-mono text-[11px] leading-tight"
      style={{ top: "max(0.5rem, env(safe-area-inset-top))" }}
    >
      {PHASES.map((p) => (
        <div key={p} className={"whitespace-pre " + (p === phase ? "text-call-fg" : "text-call-dim/40")}>
          {p === phase ? "▸ " : "  "}
          {p}
        </div>
      ))}
    </div>
  );
}
