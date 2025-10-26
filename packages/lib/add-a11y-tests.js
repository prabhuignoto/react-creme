#!/usr/bin/env node

/**
 * Batch script to add accessibility tests to component test files
 * that don't already have them.
 *
 * This script will:
 * 1. Find all test files in components/*__tests__/*.test.tsx
 * 2. Check if they already have axe accessibility tests
 * 3. If not, append a basic accessibility test section
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ACCESSIBILITY_TEST_TEMPLATE = `
  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<COMPONENT_NAME />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });`;

// Function to recursively find test files
function findTestFiles(dir) {
  const testFiles = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      testFiles.push(...findTestFiles(filePath));
    } else if (file.endsWith('.test.tsx')) {
      testFiles.push(filePath);
    }
  });

  return testFiles;
}

// Find all test files
const componentsDir = path.join(__dirname, 'components');
const testFiles = findTestFiles(componentsDir);

console.log(`Found ${testFiles.length} test files`);

let filesModified = 0;
let filesSkipped = 0;

testFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if file already has accessibility tests
  if (
    content.includes('toHaveNoViolations') ||
    content.includes('axe(container)')
  ) {
    console.log(`✓ Skipping ${path.basename(filePath)} - already has a11y tests`);
    filesSkipped++;
    return;
  }

  // Extract component name from file path
  const componentName = path.basename(filePath, '.test.tsx')
    .split('-')
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');

  // Check if component is imported
  const importMatch = content.match(/import\s+{\s*(\w+)\s*}\s+from\s+['"]\.\.\//);
  const actualComponentName = importMatch ? importMatch[1] : componentName;

  // Create the accessibility test with the correct component name
  const accessibilityTest = ACCESSIBILITY_TEST_TEMPLATE.replace(
    'COMPONENT_NAME',
    actualComponentName
  );

  // Find the last closing brace of the main describe block
  const lines = content.split('\n');
  let lastDescribeClosingIndex = -1;

  // Find the last "}); that closes a describe or it block"
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '});' && i > 0) {
      lastDescribeClosingIndex = i;
      break;
    }
  }

  if (lastDescribeClosingIndex !== -1) {
    // Insert the accessibility test before the last closing brace
    lines.splice(lastDescribeClosingIndex, 0, accessibilityTest);

    const newContent = lines.join('\n');

    // Write the modified content back
    fs.writeFileSync(filePath, newContent, 'utf8');

    console.log(`✓ Added a11y tests to ${path.basename(filePath)}`);
    filesModified++;
  } else {
    console.log(`✗ Could not find insertion point in ${path.basename(filePath)}`);
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Summary:`);
console.log(`  Files modified: ${filesModified}`);
console.log(`  Files skipped: ${filesSkipped}`);
console.log(`  Total files: ${testFiles.length}`);
console.log(`${'='.repeat(50)}\n`);
