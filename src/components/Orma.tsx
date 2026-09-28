"use client";

import { useEffect, useReducer, useRef } from "react";
import { STRINGS } from "@/strings";
import { callReducer, initialCallState } from "@/lib/machine";
import { Halo } from "./Halo";
import { CallTimer } from "./CallTimer";
import { DebugReadout } from "./DebugReadout";

const RING_MS = 1500;

export function Orma() {
  const [state, dispatch] = useReducer(callReducer, initialCallState);
  const ringRef = useRef<HTMLDivElement>(null);
  const { phase, connectedAt } = state;

  useEffect(() => {
    if (phase !== "RINGING") return;
    const id = setTimeout(() => dispatch({ type: "CONNECTED", at: Date.now() }), RING_MS);
    return () => clearTimeout(id);
  }, [phase]);

  const haloMode = phase === "IDLE" ? "idle" : phase === "RINGING" ? "ringing" : "live";

  return (
    <main
      className="flex min-h-dvh flex-col items-center bg-call-bg px-4 text-call-fg"
      style={{
        paddingTop: "max(18vh, env(safe-area-inset-top))",
        paddingBottom: "max(3rem, calc(env(safe-area-inset-bottom) + 3rem))",
      }}
    >
      <DebugReadout phase={phase} />

      <CallTimer connectedAt={connectedAt} />

      <h1 className="mt-4 text-call-name font-bold">Orma</h1>

      <div className="mt-12">
        <Halo mode={haloMode} ringRef={ringRef} />
      </div>

      {/* State line: reserved height so nothing shifts between phases. */}
      <div className="mt-10 flex min-h-[4.5rem] items-start justify-center text-center">
        {phase === "RINGING" && (
          <p lang="ml" className="text-call-state text-call-fg" role="status">
            {STRINGS.call.incoming.ml}
          </p>
        )}
      </div>

      <div className="flex-1" />

      {phase === "IDLE" && (
        <button
          type="button"
          onClick={() => dispatch({ type: "DIAL" })}
          className="flex h-target w-full max-w-xs items-center justify-center gap-3 rounded-full bg-halo text-[1.5rem] font-bold text-call-bg transition-transform active:scale-[0.97] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-call-fg"
        >
          <PhoneIcon />
          Call Orma
        </button>
      )}
    </main>
  );
}

function PhoneIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
    </svg>
  );
}
