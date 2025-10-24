#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const componentsDir = './packages/documentation/components';

// Components that already have InlineCodeViewer
const skipComponents = ['buttons', 'switch'];

const jsxToStringOptions = `const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};`;

function addInlineCodeViewer(filePath, componentName) {
  let content = readFileSync(filePath, 'utf8');
  let modified = false;

  // Add imports
  if (!content.includes('jsxToString')) {
    const importMatch = content.match(/(import.*from ['"]\.\.\/\.\.\/\.\.\/lib\/components['"];?\n)/);
    if (importMatch) {
      const newImport = `import jsxToString from 'react-element-to-jsx-string';\n${importMatch[0]}import { InlineCodeViewer } from '../../common/inline-code-viewer';\n`;
      content = content.replace(importMatch[0], newImport);
      modified = true;
    }
  }

  // Add jsxToStringOptions if not present
  if (!content.includes('jsxToStringOptions')) {
    // Match both lowercase and uppercase function names
    const functionMatch = content.match(/function (widgets|Widgets)\(\)/);
    if (functionMatch) {
      const functionName = functionMatch[0];
      content = content.replace(functionName, `${jsxToStringOptions}\n\nfunction ${functionMatch[1]}()`);
      modified = true;
    }
  }

  if (modified) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${componentName} - Added InlineCodeViewer setup`);
  } else {
    console.log(`✓ ${componentName} - Already configured`);
  }
}

// Find all component directories
const componentDirs = readdirSync(componentsDir).filter(name => {
  const fullPath = join(componentsDir, name);
  return statSync(fullPath).isDirectory() && !skipComponents.includes(name);
});

console.log(`\nAdding InlineCodeViewer to ${componentDirs.length} components...\n`);

for (const dir of componentDirs) {
  const widgetsPath = join(componentsDir, dir, 'widgets.tsx');
  try {
    addInlineCodeViewer(widgetsPath, dir);
  } catch (err) {
    console.log(`✗ ${dir} - No widgets.tsx or error: ${err.message}`);
  }
}

console.log(`\n✅ Done! Added imports to all components.`);
console.log(`\n⚠️  Note: You'll need to manually add the footer prop to each Section.`);
console.log(`   Use this pattern:`);
console.log(`   footer={<InlineCodeViewer code={jsxToString(YourComponent, jsxToStringOptions)} componentName="ComponentName" />}`);
