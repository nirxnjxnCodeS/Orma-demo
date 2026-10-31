# Orma

An elderly patient in Kerala leaves the clinic and speaks aloud what her doctor told her. Orma turns that into a medicine record and reads each item back to confirm it by voice. Later it can call her at dose time, and again the day before her next visit.

This repo is a **browser demo** that simulates the phone call. The real product runs over ordinary telephony on a keypad phone.

> **Status:** Stage 1 of 6 is built (the call shell). See [Build stages](#build-stages).

## Run it

Requires Node 22+.

```bash
npm install
npm run dev
```

Open http://localhost:3000, ideally on a phone or in your browser's mobile view. Tap **Call Orma**.

State lives in memory only. Refreshing the page resets everything.

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript check, no output files |

No API keys are needed yet. Speech and extraction come in later stages, and each has a stub so the flow works without keys.

## How it works

A call goes through these states. A debug readout in the top-right corner shows the current one.

```
IDLE → RINGING → LISTENING → PROCESSING → CONFIRMING → SUMMARY → ENDED
```

1. **Listening.** She describes the visit in her own words. Her turn ends after 4 seconds of silence, or when she says അത്രേയുള്ളൂ ("that's all").
2. **Processing.** Her speech is transcribed, then turned into a structured record.
3. **Confirming.** Orma reads the record back one medicine at a time. Each question needs a specific answer, never a yes or no, so a polite "yes" can't slip a wrong entry into the record.
4. **Summary.** The record shows which items she confirmed, which are still unconfirmed, and any missed doses.

Two presenter buttons replay a **dose call** (she answers "taken" or "later") and a **pre-visit call** (Orma reads only what changed since last time).

## Rules the code must keep

- **Medicine names are stored exactly as she said them.** "White tablet" stays "white tablet". The app never turns what she said into a drug name, generic or translation. If the record shows a drug name she didn't say, that's a bug.
- **All Malayalam comes from [`src/strings.ts`](src/strings.ts).** Nothing generates or translates Malayalam, whether at build time or at runtime. If a string is missing, ask for it rather than writing one.
- **Orma never states facts or gives advice.** Everything she says is framed as "you told me the doctor said…". She never suggests a dose.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS v4. No component library.
- Fonts: Atkinson Hyperlegible (Latin), Noto Sans Malayalam.
- Planned: Sarvam (Saarika for speech-to-text, Bulbul for text-to-speech) behind one interface, with Google Cloud as the fallback. Claude handles extraction and checks her answers against the record.

## Project layout

```
src/
  app/            Next.js routes, global styles and design tokens
  components/     Call surface: Orma, Halo, CallTimer, DebugReadout
  lib/machine.ts  Call state machine
  strings.ts      All UI and spoken copy (English + Malayalam)
docs/
  design-spec.md  Visual direction: type, palette, row states, motion
  build-notes.md  Decisions and stage tracker
```

## Build stages

| Stage | What it adds | Status |
|---|---|---|
| 1 | Call shell: dark call surface, ringing, timer, state readout | Done |
| 2 | Mic capture, silence detection, end phrase, transcription stub | Next |
| 3 | Extraction into a structured record | — |
| 4 | Voice confirmation loop, record sheet | — |
| 5 | Summary, simulated dose and pre-visit calls | — |
| 6 | Presenter gloss: press **G** for English under the Malayalam | — |

## Design

See [`docs/design-spec.md`](docs/design-spec.md). In short, there are two surfaces that should never feel like the same screen:

- **The call:** dark, nearly empty, with nothing to read.
- **The record:** light paper that rises out of the call.

Every status is shown with a word and a glyph, never by colour alone. An unconfirmed row looks deliberately unfinished: dashed edge, hatching, an empty circle.
