#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const componentsDir = './packages/documentation/components';

// Components that already have footer props
const skipComponents = ['buttons', 'switch'];

/**
 * Get component name from directory name
 */
function getComponentName(dirName) {
  // Capitalize first letter and handle multi-word names
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Add footer props to all Section components in a file
 */
function addFooterProps(filePath, dirName) {
  let content = readFileSync(filePath, 'utf8');

  // Check if already has jsxToStringOptions
  if (!content.includes('jsxToStringOptions')) {
    console.log(`⚠️  ${dirName} - No jsxToStringOptions found, skipping`);
    return;
  }

  const componentName = getComponentName(dirName);
  let modified = false;
  let addedCount = 0;

  // Find all Section components that don't already have footer prop
  // Pattern: <Section ... > where "..." doesn't contain "footer="
  const sectionPattern = /<Section\s+([^>]*?)>/g;

  content = content.replace(sectionPattern, (match, attributes) => {
    // Skip if already has footer
    if (attributes.includes('footer=')) {
      return match;
    }

    // Look ahead to find the variant name in the first DemoWidget child
    // This is a simple heuristic - may need adjustment for complex cases
    const sectionStart = content.indexOf(match);
    const nextSectionOrEnd = content.indexOf('</Section>', sectionStart);
    if (nextSectionOrEnd === -1) return match;

    const sectionContent = content.substring(sectionStart, nextSectionOrEnd);

    // Try to find variant name in {VariantName} pattern
    const variantMatch = sectionContent.match(/\{(\w+)\}/);
    if (!variantMatch) {
      // No variant found, skip this Section
      return match;
    }

    const variantName = variantMatch[1];

    // Add footer prop
    const footerProp = `\n        footer={\n          <InlineCodeViewer\n            code={jsxToString(${variantName}, jsxToStringOptions)}\n            componentName="${componentName}"\n          />\n        }`;

    modified = true;
    addedCount++;

    // Insert footer prop before the closing >
    return match.replace('>', `${footerProp}\n      >`);
  });

  if (modified) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${dirName} - Added ${addedCount} footer prop(s)`);
  } else {
    console.log(
      `  ℹ️  ${dirName} - No Sections found or all already have footers`
    );
  }
}

// Find all component directories
const componentDirs = readdirSync(componentsDir).filter(name => {
  const fullPath = join(componentsDir, name);
  return statSync(fullPath).isDirectory() && !skipComponents.includes(name);
});

console.log(`\nAdding footer props to ${componentDirs.length} components...\n`);

let successCount = 0;
let errorCount = 0;

for (const dir of componentDirs) {
  const widgetsPath = join(componentsDir, dir, 'widgets.tsx');
  try {
    addFooterProps(widgetsPath, dir);
    successCount++;
  } catch (err) {
    console.log(`❌ ${dir} - Error: ${err.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ ${successCount} components processed`);
console.log(`   ❌ ${errorCount} components failed`);
console.log(`\n✅ Done!`);
