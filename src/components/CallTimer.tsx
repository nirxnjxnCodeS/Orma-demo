"use client";

import { useEffect, useState } from "react";

function format(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

/** Always ticking once connected. The main "the line is still open" signal. */
export function CallTimer({ connectedAt }: { connectedAt: number | null }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (connectedAt === null) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [connectedAt]);

  const text = connectedAt === null ? "00:00" : format(now - connectedAt);

  return (
    <p
      className={`text-call-timer text-call-dim transition-opacity duration-300 ${
        connectedAt === null ? "opacity-0" : "opacity-100"
      }`}
      aria-label={connectedAt === null ? undefined : `Call time ${text}`}
      aria-hidden={connectedAt === null}
    >
      {text.split("").map((ch, i) => (
        <span key={i} className={ch === ":" ? "" : "timer-digit"}>
          {ch}
        </span>
      ))}
    </p>
  );
}
