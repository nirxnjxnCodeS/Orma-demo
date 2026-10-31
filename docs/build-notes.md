# Orma — build notes (approved 2026-11-16)

## Rules
- All Malayalam comes from `src/strings.ts`. Never generate or translate Malayalam. Missing string → stop and ask.
- Visuals follow `docs/design-spec.md`.
- Orma frames everything as "you told me the doctor said". Never fact, advice or dosage suggestion.

## Decisions
- **Speech:** Sarvam. Saarika for STT, Bulbul for TTS. Google Cloud is the fallback if latency is bad in the room. Verify current Malayalam coverage on both before wiring. Provider sits behind one interface; swapping is a config change.
- **Extraction / answer interpretation:** Claude Opus 5.5 via the Anthropic SDK, structured output, low effort, server-side refusal fallback on.
- **Routes:** `/api/transcribe`, `/api/extract`, `/api/interpret` (answer vs draft → match/mismatch/unclear), `/api/speak`.
- **Pre-visit call:** called the day before the next visit. Reads only what changed since last call: new → changed → stopped, then unconfirmed items, then the date. Nothing about unchanged medicines.
- **Non-Malayalam transcript:** say `STRINGS.unsupportedLanguage.en` aloud, show the record, stop. Demo-only limitation.
- **Dose call yes/no** is deliberate (see strings comment). Read-back questions must stay discriminating.
- Status `continued` displays `STRINGS.status.same`.

## Stages
1. Call shell — done
2. Capture
3. Extraction
4. Confirmation loop
5. Summary + simulated calls
6. Demo gloss (G key)
