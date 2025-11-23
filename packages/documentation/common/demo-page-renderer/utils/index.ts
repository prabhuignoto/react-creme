/**
 * Utility Functions for Demo Page Renderer
 */

// URL builders
export {
  getSourceUrl,
  getEditUrl,
  getStackBlitzUrl,
  getStackBlitzEmbedUrl,
  getNpmUrl,
  getIssuesUrl,
  getNewIssueUrl,
  isValidUrl,
  extractStackBlitzId,
} from './url-builder';
export type { UrlConfig } from './url-builder';

// Code extractors
export {
  extractCodeFromElement,
  wrapWithImport,
  formatCode,
  addLineNumbers,
  highlightLines,
  extractImports,
  removeImports,
  minifyCode,
  getLanguageFromFileName,
  variantToCodeSnippet,
} from './code-extractor';
export type { JsxToStringOptions } from './code-extractor';
