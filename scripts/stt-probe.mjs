// Throwaway: send recorded phrases to Sarvam saarika:v2.5 and print the raw transcripts.
// Usage: node --env-file=.env.local scripts/stt-probe.mjs <audio files…>
// Accepts .wav / .mp3 directly. Other formats (e.g. QuickTime .m4a) are converted
// to 16 kHz mono WAV with macOS afconvert first.

import { readFile, mkdtemp } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { basename, extname, join } from "node:path";

const KEY = process.env.SARVAM_API_KEY;
if (!KEY) {
  console.error("SARVAM_API_KEY is not set (put it in .env.local).");
  process.exit(1);
}
const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Pass one or more audio files.");
  process.exit(1);
}

const tmp = await mkdtemp(join(tmpdir(), "stt-probe-"));

async function toSupported(path) {
  const ext = extname(path).toLowerCase();
  if (ext === ".wav") return { path, type: "audio/wav" };
  if (ext === ".mp3") return { path, type: "audio/mpeg" };
  const out = join(tmp, basename(path, ext) + ".wav");
  execFileSync("afconvert", ["-f", "WAVE", "-d", "LEI16@16000", "-c", "1", path, out]);
  return { path: out, type: "audio/wav" };
}

for (const f of files) {
  const { path, type } = await toSupported(f);
  const form = new FormData();
  form.append("file", new Blob([await readFile(path)], { type }), basename(path));
  form.append("model", "saarika:v2.5");
  form.append("language_code", "ml-IN");

  const t0 = Date.now();
  const res = await fetch("https://api.sarvam.ai/speech-to-text", {
    method: "POST",
    headers: { "api-subscription-key": KEY },
    body: form,
  });
  const ms = Date.now() - t0;
  const body = await res.text();

  console.log(`\n=== ${f}  (HTTP ${res.status}, ${ms} ms)`);
  console.log(body);
  try {
    const t = JSON.parse(body).transcript;
    if (typeof t === "string") {
      // Show code points so script vs. transliteration is unambiguous.
      console.log("transcript:", t);
      console.log("codepoints:", [...t].map((c) => c.codePointAt(0).toString(16)).join(" "));
    }
  } catch {}
}
