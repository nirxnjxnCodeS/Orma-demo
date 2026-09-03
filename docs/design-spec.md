# Orma — design direction (v2)

Own design reasoning; not Mobbin-backed. Contrast ratios are computed (WCAG 2.x formula).
All UI copy comes from `src/strings.ts`. Never generate or translate Malayalam.

## 1. Two surfaces

| | Call | Record |
|---|---|---|
| Ground | Dark `call-bg`, full-bleed | Warm paper `paper`, a sheet that rises from the bottom |
| Layout | Centred, mostly empty | Left-aligned rows separated by hairlines |
| Content | Halo + name, timer, one End button | Header (`record.header` · date) + medicine rows |
| Reading | At most one state line | Everything |

When the record opens, the call compresses to a 72px dark strip at the top (timer + small halo). The call is still live; the paper came out of it.

Call layout, top to bottom: ~18vh empty → timer (`call-dim`, tabular, always ticking) → name "Orma" (`call-name`) → 160px halo with initial → empty → 76px round red End button ~48px above the safe area.

**Simulated calls.** "Simulate dose call" and "Simulate pre-visit call" are new calls, not panels on the record. When one fires, the paper sheet slides back down (reverse of its entry) and the dark call surface returns full-screen, timer reset to 00:00, opening on `call.incoming`. When the simulated call ends, the record slides back up. The surface switch is what makes "this is a new call" legible. The two simulate buttons are presenter controls: English only, on the record sheet, below the rows, `ink-2` text with a `rule` outline, ≥56px tall.

## 2. Type

Fonts: **Atkinson Hyperlegible** (original, Google Fonts) for Latin; **Noto Sans Malayalam** for Malayalam.
Timer uses `tabular-nums`; verify the font exposes `tnum`, otherwise render each digit in a fixed-width span.

| Token | Latin | Malayalam (`:lang(ml)`) | Use |
|---|---|---|---|
| `call-name` | 48 / 1.1, 700 | 44 / 1.35 | Caller name |
| `call-state` | 28 / 1.25 | 26 / 1.6 | Listening / One moment |
| `call-timer` | 22 / 1, tabular | — | Timer |
| `rec-drug` | 26 / 1.2, 700 | 24 / 1.45 | Medicine name (verbatim) |
| `rec-body` | 21 / 1.4 | 20 / 1.7 | Dose, timing, food, question |
| `rec-label` | 18 / 1.2, 700 | 18 / 1.55 | Status / confirmation labels |

Minimums: 28px on the call surface (timer 22px is the one exception); 18px anywhere in the record.
Atkinson Hyperlegible ships 400 and 700 only, so weights are 400/700 (no 600).

## 3. Palette

| Token | Hex | Against | Ratio |
|---|---|---|---|
| call-fg | #F5F0E6 | call-bg #0F1412 | 16.4:1 |
| call-dim | #B4BDB7 | call-bg | 9.7:1 |
| halo | #E8B04A | call-bg | 9.5:1 |
| end | #C8321F | call-bg | 3.5:1 (non-text); white glyph on it 5.3:1 |
| ink | #1B1A17 | paper #FAF6EE | 16.1:1 |
| ink-2 | #4A463E | paper | 8.7:1 |
| st-new | #1D4ED8 | paper | 6.2:1 |
| st-same | #3F4A44 | paper | 8.6:1 |
| st-changed | #7A4A00 | paper | 6.9:1 |
| st-stopped | #9F1D14 | paper | 7.3:1 |
| ok | #14532D | paper | 8.5:1 |
| open-bg | #FFF1D6 | ink on it | 15.6:1 |
| open-fg | #7A2E00 | open-bg | 8.5:1 |
| open-edge | #C2410C | paper | 4.8:1 |
| rule | #D9D2C3 | paper | 1.4:1 (decorative only) |

Colour never carries meaning alone; every state survives greyscale.

## 4. Rows

Medicine names are stored and shown **verbatim as she said them**, never resolved to a drug name. A row reading വെള്ള ഗുളിക is the product visibly refusing to guess; the design shows that off. The name gets the largest type in the row.

**Status** = glyph + word, top-left of the row, in the status colour.
`＋ പുതിയത്` · `= പഴയതുപോലെ` · `→ മാറ്റി` (old value struck, new beside it) · `✕ നിർത്തി` (name also struck, body to `ink-2`).

**Confirmation** = the row's frame. Three states, in order of resolution:

| State | Background | Left rule (6px) | Outline | Label | Extra |
|---|---|---|---|---|---|
| Unconfirmed | `open-bg` | Hatched `open-edge`/paper stripes | 2px **dashed** `open-edge` | `◌ ഉറപ്പിച്ചിട്ടില്ല`, `open-fg` | — |
| Being asked | `paper` | **Solid** `open-edge` (hatch gone) | 3px **solid** `ink` focus outline | `◐` glyph only | Question text inside the row, under the dose line; row scrolled into view |
| Confirmed | `paper` | Solid `ok` | none | `✓ ഉറപ്പിച്ചു`, `ok` | — |

Being-asked is visibly more settled than unconfirmed (stripes and dashes gone, paper ground) but not closed (no green, half-filled glyph, outlined). The question sits below a `rule` hairline in `rec-body` 700 `ink`, led by an 8px `halo` dot that pulses with Orma's speech envelope while she is speaking the question. Only one row is ever in this state.

```
┃╱╱ ＋ പുതിയത്                      ◌ ഉറപ്പിച്ചിട്ടില്ല ┆
┃╱╱ വെള്ള ഗുളിക                                       ┆
┃╱╱ പകുതി ഗുളിക · രണ്ടുനേരം · ഭക്ഷണം കഴിഞ്ഞ്          ┆
 ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃█ ＋ പുതിയത്                                       ◐ ┃
┃█ ‹name as she said it›                              ┃
┃█ രണ്ട് · രാവിലെ · രാത്രി                             ┃
┃█ ───────────────────────────────────────────────── ┃
┃█ ● രണ്ട് ഗുളികയാണോ, അതോ രണ്ടുനേരമാണോ?              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
┃   → മാറ്റി                                  ✓ ഉറപ്പിച്ചു
┃   ‹name as she said it›
┃   ~~ഒരു നേരം~~ → രണ്ടുനേരം · ഭക്ഷണത്തിനു മുൻപ്
```

On "yes" (അതെ or ഉവ്വ്) the row goes being-asked → confirmed: outline fades, rule turns `ok`, ◐ fills to ✓ (240ms).

## 5. Motion

Halo is the only moving thing on the call surface.

| State | Default | Reduced motion |
|---|---|---|
| Listening | Scale follows mic amplitude (~80ms smoothing) | **Opacity** follows mic amplitude (0.35 → 1.0, same smoothing). Responsive, no movement. |
| One moment | Bright arc orbits the ring every 2.4s; ring breathes 0.5↔0.8 opacity; timer ticks; after 4s Orma says `call.stillHere` | Static ring stepping through 3 opacity levels; timer ticks |
| Speaking | Pulses with TTS envelope | Opacity follows TTS envelope |

State changes: 300ms crossfade of halo treatment.

Record entry: call compresses to the strip (0–350ms) → sheet rises `translateY(100%)→0`, `ease-arrive` (150–600ms) → rows fade in and rise 12px, 90ms apart, from 450ms, all unconfirmed. Read-back moves the being-asked state row by row.
Record exit (simulated call): the reverse; sheet falls, strip expands to full-screen call.
Reduced motion: all surface/row transitions become opacity fades.

## 6. Tailwind tokens (v4)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Atkinson Hyperlegible", system-ui, sans-serif;
  --font-ml: "Noto Sans Malayalam", "Atkinson Hyperlegible", sans-serif;

  --color-call-bg: #0F1412;   --color-call-fg: #F5F0E6;
  --color-call-dim: #B4BDB7;  --color-halo: #E8B04A;
  --color-end: #C8321F;
  --color-paper: #FAF6EE;     --color-ink: #1B1A17;
  --color-ink-2: #4A463E;     --color-rule: #D9D2C3;
  --color-st-new: #1D4ED8;    --color-st-same: #3F4A44;
  --color-st-changed: #7A4A00; --color-st-stopped: #9F1D14;
  --color-ok: #14532D;
  --color-open-bg: #FFF1D6;   --color-open-fg: #7A2E00;
  --color-open-edge: #C2410C;

  --text-call-name: 3rem;      --text-call-name--line-height: 1.1;
  --text-call-state: 1.75rem;  --text-call-state--line-height: 1.25;
  --text-call-timer: 1.375rem; --text-call-timer--line-height: 1;
  --text-rec-drug: 1.625rem;   --text-rec-drug--line-height: 1.2;
  --text-rec-body: 1.3125rem;  --text-rec-body--line-height: 1.4;
  --text-rec-label: 1.125rem;  --text-rec-label--line-height: 1.2;

  --spacing-target: 4.75rem;
  --spacing-target-min: 3.5rem;
  --spacing-halo: 10rem;
  --spacing-callbar: 4.5rem;

  --ease-arrive: cubic-bezier(.2,.8,.2,1);
  --animate-orbit: orbit 2.4s linear infinite;
  --animate-breathe: breathe 2.4s ease-in-out infinite;
  --animate-row-in: row-in 360ms var(--ease-arrive) both;

  @keyframes orbit   { to { transform: rotate(360deg); } }
  @keyframes breathe { 0%,100% { opacity:.5 } 50% { opacity:.8 } }
  @keyframes row-in  { from { opacity:0; transform:translateY(12px) } }
}

:lang(ml) { font-family: var(--font-ml); }
.text-call-name:lang(ml)  { font-size: 2.75rem;  line-height: 1.35; }
.text-call-state:lang(ml) { font-size: 1.625rem; line-height: 1.6; }
.text-rec-drug:lang(ml)   { font-size: 1.5rem;   line-height: 1.45; }
.text-rec-body:lang(ml)   { font-size: 1.25rem;  line-height: 1.7; }
.text-rec-label:lang(ml)  { line-height: 1.55; }

.hatch { background: repeating-linear-gradient(135deg,
  var(--color-open-edge) 0 6px, var(--color-paper) 6px 12px); }

/* Halo drives one CSS var from JS (0–1 amplitude); motion preference picks the mapping. */
.halo { --amp: 0; transform: scale(calc(1 + var(--amp) * .18)); }
@media (prefers-reduced-motion: reduce) {
  .halo { transform: none; opacity: calc(.35 + var(--amp) * .65); }
}
```
