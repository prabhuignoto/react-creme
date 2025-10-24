import { ReactNode } from 'react';
import { SandpackFiles } from '@codesandbox/sandpack-react';
import { extractCodeFromElement } from './code-extractor';

/**
 * Convert demo widget to Sandpack files format
 *
 * Takes a React element (demo widget) and converts it to Sandpack's file structure
 * for use in interactive playgrounds.
 */

/**
 * Generate Sandpack files from custom playground code
 *
 * @param playgroundCode - Pre-written playground code string
 * @returns Sandpack files object
 */
export const customCodeToSandpackFiles = (playgroundCode: string): SandpackFiles => {
  return {
    '/App.tsx': {
      code: playgroundCode,
      active: true,
    },
  };
};

/**
 * Generate Sandpack files from demo widget (fallback)
 *
 * @param demoWidget - React element to convert
 * @param componentName - Name of the component being demonstrated
 * @returns Sandpack files object
 */
export const demoWidgetToSandpackFiles = (
  demoWidget: ReactNode,
  componentName: string
): SandpackFiles => {
  // Extract JSX code from demo widget
  const jsxCode = extractCodeFromElement(demoWidget, {
    maxInlineAttributesLineLength: 80,
    showDefaultProps: false,
    showFunctions: true,
    sortProps: true,
  });

  // Create App.tsx with the demo code
  const appTsx = `import React from 'react';
import { ${componentName} } from 'react-creme';
import './styles.css';

export default function App() {
  return (
    <div className="demo-container">
      ${jsxCode}
    </div>
  );
}`;

  // Create styles.css for demo container
  const stylesCss = `.demo-container {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}`;

  // Return Sandpack files structure
  return {
    '/App.tsx': {
      code: appTsx,
      active: true,
    },
    '/styles.css': {
      code: stylesCss,
      hidden: true,
    },
  };
};

/**
 * Get package.json dependencies for Sandpack
 *
 * @param additionalDeps - Additional dependencies beyond react-creme
 * @returns Dependencies object
 */
export const getSandpackDependencies = (
  additionalDeps: Record<string, string> = {}
): Record<string, string> => {
  return {
    'react-creme': '1.0.10',
    ...additionalDeps,
  };
};
