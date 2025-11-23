import { ReactNode, ReactElement } from 'react';
import jsxToString from 'react-element-to-jsx-string';

/**
 * Code Extractor Utilities - Extract code from React elements
 *
 * Provides utilities to convert React components and JSX to formatted code strings
 */

/**
 * Options for JSX to string conversion
 */
export interface JsxToStringOptions {
  /** Maximum line length before wrapping attributes */
  maxInlineAttributesLineLength?: number;
  /** Show default props */
  showDefaultProps?: boolean;
  /** Show function bodies */
  showFunctions?: boolean;
  /** Sort props alphabetically */
  sortProps?: boolean;
  /** Tab size for indentation */
  tabStop?: number;
  /** Use fragments for single children */
  useFragmentWithSingleChildren?: boolean;
  /** Filter props (return false to hide prop) */
  filterProps?: (prop: string, value: any) => boolean;
}

/**
 * Default options for code extraction
 * Matches legacy behavior from syntax.tsx for compatibility
 */
const DEFAULT_OPTIONS: JsxToStringOptions = {
  maxInlineAttributesLineLength: 250, // Increased from 80 to prevent truncation of complex props
  showDefaultProps: true, // Show default props for better code examples
  showFunctions: true,
  sortProps: true,
  tabStop: 4, // Match legacy tabStop from syntax.tsx
  useFragmentWithSingleChildren: true,
  filterProps: (prop: string) => {
    // Filter out internal props
    const internalProps = ['key', 'ref', '__source', '__self'];
    return !internalProps.includes(prop);
  },
};

/**
 * Extract code from React element
 *
 * @param element - React element to extract code from
 * @param options - Conversion options
 * @returns Formatted code string
 *
 * @example
 * ```tsx
 * const code = extractCodeFromElement(<Button variant="primary">Click</Button>);
 * // => '<Button variant="primary">Click</Button>'
 * ```
 */
export const extractCodeFromElement = (
  element: ReactNode,
  options?: JsxToStringOptions
): string => {
  if (!element) return '';

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  try {
    return jsxToString(element, mergedOptions);
  } catch (error) {
    console.error('Failed to extract code from element:', error);
    return String(element);
  }
};

/**
 * Wrap code with import statement
 *
 * @param code - Code to wrap
 * @param componentName - Name of the component to import
 * @param packageName - Package name to import from
 * @returns Code with import statement
 *
 * @example
 * ```ts
 * const code = wrapWithImport('<Button>Click</Button>', 'Button');
 * // => 'import { Button } from "react-creme";\n\n<Button>Click</Button>'
 * ```
 */
export const wrapWithImport = (
  code: string,
  componentName: string,
  packageName: string = 'react-creme'
): string => {
  return `import { ${componentName} } from "${packageName}";\n\n${code}`;
};

/**
 * Format code with proper indentation
 *
 * @param code - Code to format
 * @param indentSize - Number of spaces for indentation
 * @returns Formatted code
 */
export const formatCode = (code: string, indentSize: number = 2): string => {
  const lines = code.split('\n');
  let indentLevel = 0;
  const indent = ' '.repeat(indentSize);

  return lines
    .map((line) => {
      const trimmed = line.trim();

      // Decrease indent for closing tags
      if (trimmed.startsWith('</') || trimmed.startsWith('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const formattedLine = indent.repeat(indentLevel) + trimmed;

      // Increase indent for opening tags
      if (
        (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) ||
        trimmed.endsWith('{')
      ) {
        indentLevel++;
      }

      return formattedLine;
    })
    .join('\n');
};

/**
 * Add line numbers to code
 *
 * @param code - Code to add line numbers to
 * @param startLine - Starting line number
 * @returns Code with line numbers
 *
 * @example
 * ```ts
 * const code = addLineNumbers('const x = 10;\nconst y = 20;');
 * // => '1 | const x = 10;\n2 | const y = 20;'
 * ```
 */
export const addLineNumbers = (code: string, startLine: number = 1): string => {
  const lines = code.split('\n');
  const maxLineNumberWidth = String(startLine + lines.length - 1).length;

  return lines
    .map((line, index) => {
      const lineNumber = (startLine + index).toString().padStart(maxLineNumberWidth, ' ');
      return `${lineNumber} | ${line}`;
    })
    .join('\n');
};

/**
 * Highlight specific lines in code
 *
 * @param code - Code to highlight
 * @param linesToHighlight - Array of line numbers (1-indexed)
 * @param marker - Marker to prepend to highlighted lines
 * @returns Code with highlighted lines
 *
 * @example
 * ```ts
 * const code = highlightLines('line1\nline2\nline3', [2]);
 * // => 'line1\n> line2\nline3'
 * ```
 */
export const highlightLines = (
  code: string,
  linesToHighlight: number[],
  marker: string = '> '
): string => {
  const lines = code.split('\n');

  return lines
    .map((line, index) => {
      const lineNumber = index + 1;
      return linesToHighlight.includes(lineNumber) ? marker + line : line;
    })
    .join('\n');
};

/**
 * Extract imports from code
 *
 * @param code - Code to extract imports from
 * @returns Array of import statements
 *
 * @example
 * ```ts
 * const imports = extractImports('import { Button } from "react-creme";\nconst x = 10;');
 * // => ['import { Button } from "react-creme";']
 * ```
 */
export const extractImports = (code: string): string[] => {
  const importRegex = /^import\s+.*?;$/gm;
  return code.match(importRegex) || [];
};

/**
 * Remove imports from code
 *
 * @param code - Code to remove imports from
 * @returns Code without imports
 */
export const removeImports = (code: string): string => {
  return code.replace(/^import\s+.*?;$\n*/gm, '').trim();
};

/**
 * Minify code (remove extra whitespace)
 *
 * @param code - Code to minify
 * @returns Minified code
 */
export const minifyCode = (code: string): string => {
  return code
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/>\s+</g, '><') // Remove space between tags
    .trim();
};

/**
 * Get code language from file extension
 *
 * @param fileName - File name with extension
 * @returns Language identifier
 */
export const getLanguageFromFileName = (
  fileName: string
): 'tsx' | 'jsx' | 'typescript' | 'javascript' | 'css' | 'scss' | 'json' | 'html' => {
  const ext = fileName.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'tsx':
      return 'tsx';
    case 'ts':
      return 'typescript';
    case 'jsx':
      return 'jsx';
    case 'js':
      return 'javascript';
    case 'css':
      return 'css';
    case 'scss':
    case 'sass':
      return 'scss';
    case 'json':
      return 'json';
    case 'html':
    case 'htm':
      return 'html';
    default:
      return 'tsx';
  }
};

/**
 * Convert variant object to code snippet
 *
 * @param variant - Component variant with demo element
 * @param componentName - Name of the component
 * @returns Code snippet object
 *
 * @example
 * ```tsx
 * const snippet = variantToCodeSnippet(
 *   { id: 'default', title: 'Default', demo: <Button>Click</Button> },
 *   'Button'
 * );
 * ```
 */
export const variantToCodeSnippet = (
  variant: { id: string; title: string; demo: ReactNode },
  componentName: string
) => {
  const code = extractCodeFromElement(variant.demo);
  const codeWithImport = wrapWithImport(code, componentName);

  return {
    code: codeWithImport,
    language: 'tsx' as const,
    fileName: `${componentName}-${variant.id}.tsx`,
    label: variant.title,
  };
};
