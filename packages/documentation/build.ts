// Documentation build using Vite
// Note: Bun's build API doesn't fully support HTML entry points, SVGR, and complex CSS processing
// For now, we use Vite via bunx for the documentation site
// The library build uses Bun's native bundler (see packages/lib/build.ts)

import { $ } from 'bun';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { rm } from 'fs/promises';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const outDir = resolve(__dirname, 'expo_dist');

console.log('🔨 Building documentation site...');

// Clean output directory
try {
  await rm(outDir, { force: true, recursive: true });
  console.log('🧹 Cleaned output directory');
} catch {
  // Directory might not exist
}

// Use Vite for documentation build (better support for HTML entry points, SVGR, PostCSS)
console.log(
  '📦 Using Vite for documentation build (HTML entry points, SVGR, CSS processing)'
);
const result = await $`bunx vite build`.cwd(__dirname).quiet();

if (result.exitCode !== 0) {
  console.error('❌ Documentation build failed');
  process.exit(1);
}

console.log('✅ Documentation build complete');
