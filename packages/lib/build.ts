import { build } from 'bun';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { $ } from 'bun';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(__dirname, 'dist');

console.log('🔨 Building library with Bun...');

// Build ES module
const esmResult = await build({
  entrypoints: [resolve(__dirname, 'react-creme.ts')],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  format: 'esm',
  minify: true,
  naming: {
    entry: 'react-creme.mjs',
  },
  outdir: distDir,
  sourcemap: 'external',
  target: 'browser',
});

if (!esmResult.success) {
  console.error('❌ ES module build failed');
  process.exit(1);
}

// Build CommonJS module
const cjsResult = await build({
  entrypoints: [resolve(__dirname, 'react-creme.ts')],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  format: 'cjs',
  minify: true,
  naming: {
    entry: 'react-creme.cjs',
  },
  outdir: distDir,
  sourcemap: 'external',
  target: 'browser',
});

if (!cjsResult.success) {
  console.error('❌ CommonJS module build failed');
  process.exit(1);
}

// Generate TypeScript declarations
console.log('📝 Generating TypeScript declarations...');
const tscPath = resolve(__dirname, 'tsconfig.emit.json');
const tscResult = await $`bunx tsc -p ${tscPath} --emitDeclarationOnly`.quiet();
if (tscResult.exitCode !== 0) {
  console.error('❌ TypeScript declaration generation failed');
  process.exit(1);
}

// Bundle CSS using Vite (Bun's build API doesn't handle CSS bundling yet)
// Vite will extract all CSS imports and bundle them into react-creme.css
// Note: This runs vite build which will also rebuild JS, but it's needed for CSS extraction
// In the future, we can optimize this to only extract CSS
console.log('🎨 Bundling CSS with Vite...');
const viteResult = await $`bunx vite build`.cwd(__dirname).quiet();
if (viteResult.exitCode !== 0) {
  console.error('❌ CSS bundling failed');
  process.exit(1);
}

console.log('✅ Library build complete');
