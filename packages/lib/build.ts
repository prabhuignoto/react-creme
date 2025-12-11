import { build } from 'bun';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { $ } from 'bun';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(__dirname, 'dist');

const namespaces = [
  'forms',
  'feedback',
  'data-display',
  'navigation',
  'overlay',
  'layout',
  'disclosure',
  'media',
  'core',
];

console.log('🔨 Building library with Bun...');

// Build all namespaces
console.log('📦 Building namespace entry points...');
for (const namespace of namespaces) {
  console.log(`  Building react-creme/${namespace}...`);
  const entryPoint = resolve(__dirname, `${namespace}.ts`);
  
  // Build ES module
  const esmResult = await build({
    entrypoints: [entryPoint],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    format: 'esm',
    minify: true,
    outdir: distDir,
    sourcemap: 'external',
    target: 'browser',
  });

  if (!esmResult.success) {
    console.error(`❌ ES module build failed for ${namespace}`);
    if (esmResult.logs) {
      console.error(esmResult.logs);
    }
    process.exit(1);
  }

  // Write the ESM output with correct name
  if (esmResult.outputs && esmResult.outputs.length > 0) {
    const output = esmResult.outputs[0];
    const outputPath = resolve(distDir, `${namespace}.mjs`);
    await Bun.write(outputPath, output);
  }

  // Build CommonJS module
  const cjsResult = await build({
    entrypoints: [entryPoint],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    format: 'cjs',
    minify: true,
    outdir: distDir,
    sourcemap: 'external',
    target: 'browser',
  });

  if (!cjsResult.success) {
    console.error(`❌ CommonJS module build failed for ${namespace}`);
    if (cjsResult.logs) {
      console.error(cjsResult.logs);
    }
    process.exit(1);
  }

  // Write the CJS output with correct name
  if (cjsResult.outputs && cjsResult.outputs.length > 0) {
    const output = cjsResult.outputs[0];
    const outputPath = resolve(distDir, `${namespace}.cjs`);
    await Bun.write(outputPath, output);
  }
}

console.log(`  ✓ Built ${namespaces.length} namespace entry points`);

// Build main entry point (deprecated, for backward compatibility)
console.log('📦 Building main entry point (deprecated)...');
const mainEsmResult = await build({
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

if (!mainEsmResult.success) {
  console.error('❌ Main ES module build failed');
  process.exit(1);
}

const mainCjsResult = await build({
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

if (!mainCjsResult.success) {
  console.error('❌ Main CommonJS module build failed');
  process.exit(1);
}

console.log('📝 Generating TypeScript declarations...');
const tscPath = resolve(__dirname, 'tsconfig.emit.json');
const tscResult = await $`bunx tsc -p ${tscPath} --emitDeclarationOnly`;
if (tscResult.exitCode !== 0) {
  console.error('❌ TypeScript declaration generation failed');
  process.exit(1);
}

// Bundle CSS using Vite (Bun's build API doesn't handle CSS bundling yet)
// Vite will extract all CSS imports and bundle them into react-creme.css
// We configure Vite to not empty the dist directory and preserve namespace files
console.log('🎨 Bundling CSS with Vite...');
const viteResult = await $`bunx vite build`.cwd(__dirname);
if (viteResult.exitCode !== 0) {
  console.error('❌ CSS bundling failed');
  process.exit(1);
}

// Verify namespace files still exist after Vite build
console.log('🔍 Verifying namespace files...');
let missingFiles = [];
for (const namespace of namespaces) {
  const esmPath = resolve(distDir, `${namespace}.mjs`);
  const cjsPath = resolve(distDir, `${namespace}.cjs`);
  try {
    await Bun.file(esmPath).arrayBuffer();
    await Bun.file(cjsPath).arrayBuffer();
  } catch {
    missingFiles.push(namespace);
    // Rebuild missing namespace files
    console.log(`  Rebuilding ${namespace}...`);
    const entryPoint = resolve(__dirname, `${namespace}.ts`);
    
    const esmResult = await build({
      entrypoints: [entryPoint],
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      format: 'esm',
      minify: true,
      outdir: distDir,
      sourcemap: 'external',
      target: 'browser',
    });
    
    if (esmResult.outputs && esmResult.outputs.length > 0) {
      await Bun.write(esmPath, esmResult.outputs[0]);
    }
    
    const cjsResult = await build({
      entrypoints: [entryPoint],
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      format: 'cjs',
      minify: true,
      outdir: distDir,
      sourcemap: 'external',
      target: 'browser',
    });
    
    if (cjsResult.outputs && cjsResult.outputs.length > 0) {
      await Bun.write(cjsPath, cjsResult.outputs[0]);
    }
  }
}

if (missingFiles.length > 0) {
  console.log(`  ✓ Rebuilt ${missingFiles.length} namespace files`);
}

console.log('✅ Library build complete');
