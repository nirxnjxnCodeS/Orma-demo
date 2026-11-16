# Orma — build notes (approved 2026-11-16)

## Rules
- All Malayalam comes from `src/strings.ts`. Never generate or translate Malayalam. Missing string → stop and ask.
- Visuals follow `docs/design-spec.md`.
- Orma frames everything as "you told me the doctor said". Never fact, advice or dosage suggestion.

## Decisions
- **Speech:** Sarvam. Saarika for STT, Bulbul for TTS. Google Cloud is the fallback if latency is bad in the room. Verify current Malayalam coverage on both before wiring. Provider sits behind one interface; swapping is a config change.
- **Sarvam config** (verified against Sarvam docs by product owner):
  - Auth: `api-subscription-key` header (not Bearer). Base `https://api.sarvam.ai`.
  - **STT: `saarika:v2.5`.** `saarika:v1`, `v2` and `flash` are all deprecated; most docs online still show v2, don't copy them.
    - `language_code: "ml-IN"` explicitly, never `"unknown"`: detection drifts to English on clinical-noun-heavy speech.
    - Saarika, **not Saaras**. Saaras translates to English and breaks the verbatim `spokenName` rule.
    - No streaming STT. Record a blob, then POST.
    - Input audio: mp3 or wav only. Chrome's MediaRecorder defaults to webm/opus, so force a supported type or transcode.
  - **TTS: `bulbul:v3`.** Do **not** use `bulbul:v4-flash` (the "latest, recommended" one): it has no Malayalam and fails silently. v3 supports `ml-IN` and is the API default when model is omitted.
    - Response is JSON with base64 audio in `audios[]`, not raw binary.
    - Codec: mp3 (`opus` is in the schema but errors).
    - `pace: 0.85` for an elderly listener. `pitch` / `loudness` are v2-only, unavailable here.
    - Max 2500 characters per request.
  - Both sit behind one `SpeechProvider` interface; switching to Google Cloud is a config change.
- **Turn ending:** 4s of silence, or അത്രേയുള്ളൂ followed by ≥800ms of silence (she may use it as a filler mid-sentence). Silence threshold calibrated from ambient level in the first 500ms; the product assumes hospital-corridor noise.
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
