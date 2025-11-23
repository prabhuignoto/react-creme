#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const componentsDir = './packages/documentation/components';

// Components that already have footer props
const skipComponents = ['buttons', 'switch', 'accordion'];

/**
 * Extract variant name from DemoWidget children
 * Example: <DemoWidget>{Default}</DemoWidget> => "Default"
 */
function extractVariantFromSection(sectionCode) {
  // Look for {VariantName} pattern in DemoWidget children
  const match = sectionCode.match(/>\s*\{(\w+)\}\s*</);
  return match ? match[1] : null;
}

/**
 * Get component name from the widget file - look at imports
 */
function getComponentName(content, dirName) {
  // Try to find import from lib/components
  const importMatch = content.match(/from ['"]\.\.\/\.\.\/\.\.\/lib\/components\/(\w+)['"]/);
  if (importMatch) {
    // Capitalize first letter
    const componentName = importMatch[1];
    return componentName.charAt(0).toUpperCase() + componentName.slice(1);
  }

  // Fallback to directory name
  return dirName.charAt(0).toUpperCase() + dirName.slice(1);
}

/**
 * Add footer prop to a Section component
 */
function addFooterToSection(sectionCode, variantName, componentName) {
  // Check if already has footer
  if (sectionCode.includes('footer=')) {
    return sectionCode;
  }

  // Find the opening Section tag
  const sectionMatch = sectionCode.match(/^(\s*<Section[^>]*)(>)/);
  if (!sectionMatch) {
    return sectionCode;
  }

  const [fullMatch, openingTag, closingBracket] = sectionMatch;

  // Add footer prop before the closing >
  const footer = `\n        footer={\n          <InlineCodeViewer\n            code={jsxToString(${variantName}, jsxToStringOptions)}\n            componentName="${componentName}"\n          />\n        }`;

  return sectionCode.replace(
    fullMatch,
    `${openingTag}${footer}\n      ${closingBracket}`
  );
}

/**
 * Process a widgets file to add footer props to all Sections
 */
function addFooterProps(filePath, componentName) {
  let content = readFileSync(filePath, 'utf8');

  // Check if already has jsxToStringOptions (should have been added by previous script)
  if (!content.includes('jsxToStringOptions')) {
    console.log(`⚠️  ${componentName} - No jsxToStringOptions found, skipping`);
    return;
  }

  // Get actual component name from imports
  const actualComponentName = getComponentName(content, componentName);

  // Split content to find each Section
  const sections = content.split(/<Section/);

  if (sections.length <= 1) {
    console.log(`⚠️  ${componentName} - No Section components found`);
    return;
  }

  let modified = false;
  let newContent = sections[0]; // Keep the part before first Section

  // Process each Section
  for (let i = 1; i < sections.length; i++) {
    const sectionStart = sections[i];

    // Find the closing </Section> for this section
    const sectionEndIndex = sectionStart.indexOf('</Section>');
    if (sectionEndIndex === -1) {
      newContent += '<Section' + sectionStart;
      continue;
    }

    const sectionCode = '<Section' + sectionStart.substring(0, sectionEndIndex + '</Section>'.length);
    const afterSection = sectionStart.substring(sectionEndIndex + '</Section>'.length);

    // Check if this section already has a footer
    if (sectionCode.includes('footer=')) {
      newContent += sectionCode.substring('<Section'.length) + afterSection;
      continue;
    }

    // Extract variant name from this section
    const variantName = extractVariantFromSection(sectionCode);

    if (!variantName) {
      console.log(`  ⚠️  Could not find variant for a Section in ${componentName}`);
      newContent += sectionCode.substring('<Section'.length) + afterSection;
      continue;
    }

    // Add footer to this section
    const updatedSection = addFooterToSection(sectionCode, variantName, actualComponentName);

    if (updatedSection !== sectionCode) {
      modified = true;
    }

    newContent += updatedSection.substring('<Section'.length) + afterSection;
  }

  if (modified) {
    writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ ${componentName} - Added footer props to Sections`);
  } else {
    console.log(`  ℹ️  ${componentName} - No changes needed (all Sections already have footers)`);
  }
}

// Find all component directories
const componentDirs = readdirSync(componentsDir).filter(name => {
  const fullPath = join(componentsDir, name);
  return statSync(fullPath).isDirectory() && !skipComponents.includes(name);
});

console.log(`\nAdding footer props to ${componentDirs.length} components...\n`);

let successCount = 0;
let skipCount = 0;
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
console.log(`   ⚠️  ${skipCount} components skipped`);
console.log(`   ❌ ${errorCount} components failed`);
console.log(`\n✅ Done!`);
