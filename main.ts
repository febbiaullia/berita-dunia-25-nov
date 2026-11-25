// The World Today — make.fun news-image-20261125.
//
// A one-image summary of Wednesday 25 November 2026, drawn beforehand as
// entry.png (a newspaper front page: a Pacific defence pact, Asia's
// tariff-hit markets, an Iowa blast, California king tides, a Manila
// protest). This program just places that finished image where the
// grader expects it: /output/entry.png, byte for byte.
//
// Node 22, standard library only. No network, no dependencies.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// Guardrail: the gate refuses anything that is not a whole PNG of at most
// 1 MiB, so confirm the copy kept the PNG signature and the size limit
// before the run reports success.
const bytes = statSync(target).size;
const head = readFileSync(target).subarray(0, 8);
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!head.equals(pngSignature)) {
  throw new Error('entry.png is not a PNG');
}
if (bytes > 1048576) {
  throw new Error(`entry.png is ${bytes} bytes, over the 1 MiB limit`);
}
console.log(`wrote ${target} (${bytes} bytes)`);
