export const PHASES = [
  "IDLE",
  "RINGING",
  "LISTENING",
  "PROCESSING",
  "CONFIRMING",
  "SUMMARY",
  "ENDED",
] as const;

export type Phase = (typeof PHASES)[number];

export type CallState = {
  phase: Phase;
  /** ms timestamp when the call connected; null before connect. Drives the timer. */
  connectedAt: number | null;
};

export type CallEvent =
  | { type: "DIAL" }
  | { type: "CONNECTED"; at: number };

export const initialCallState: CallState = { phase: "IDLE", connectedAt: null };

/** Allowed transitions. Anything not listed is ignored, so stray events can't skip phases. */
export function callReducer(state: CallState, event: CallEvent): CallState {
  switch (event.type) {
    case "DIAL":
      return state.phase === "IDLE" ? { ...state, phase: "RINGING" } : state;
    case "CONNECTED":
      return state.phase === "RINGING"
        ? { phase: "LISTENING", connectedAt: event.at }
        : state;
  }
}
