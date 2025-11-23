/**
 * URL Builder Utilities - Generate type-safe URLs for documentation
 *
 * Centralizes URL generation logic to eliminate hardcoded URLs
 * throughout the codebase.
 */

/**
 * Configuration for URL generation
 */
export interface UrlConfig {
  /** GitHub repository owner */
  owner?: string;
  /** GitHub repository name */
  repo?: string;
  /** Default branch */
  branch?: string;
  /** Base path for lib components */
  libPath?: string;
  /** Base path for documentation components */
  docPath?: string;
}

const DEFAULT_CONFIG: Required<UrlConfig> = {
  owner: 'prabhuignoto',
  repo: 'react-creme',
  branch: 'master',
  libPath: 'packages/lib/components',
  docPath: 'packages/documentation/components',
};

/**
 * Get the full URL configuration with defaults
 */
const getConfig = (config?: UrlConfig): Required<UrlConfig> => ({
  ...DEFAULT_CONFIG,
  ...config,
});

/**
 * Generate GitHub source code URL
 *
 * @param componentId - Component identifier (e.g., 'button', 'input')
 * @param config - Optional URL configuration overrides
 * @returns Full GitHub URL to component source
 *
 * @example
 * ```ts
 * const url = getSourceUrl('button');
 * // => https://github.com/prabhuignoto/react-creme/tree/master/packages/lib/components/button
 * ```
 */
export const getSourceUrl = (componentId: string, config?: UrlConfig): string => {
  const { owner, repo, branch, libPath } = getConfig(config);

  return `https://github.com/${owner}/${repo}/tree/${branch}/${libPath}/${componentId}`;
};

/**
 * Generate GitHub edit page URL
 *
 * @param pageId - Documentation page identifier
 * @param config - Optional URL configuration overrides
 * @returns Full GitHub URL to edit documentation page
 *
 * @example
 * ```ts
 * const url = getEditUrl('button');
 * // => https://github.com/prabhuignoto/react-creme/tree/master/packages/documentation/components/button/index.tsx
 * ```
 */
export const getEditUrl = (pageId: string, config?: UrlConfig): string => {
  const { owner, repo, branch, docPath } = getConfig(config);

  return `https://github.com/${owner}/${repo}/tree/${branch}/${docPath}/${pageId}/index.tsx`;
};

/**
 * Generate StackBlitz editor URL
 *
 * @param projectId - StackBlitz project ID
 * @returns Full StackBlitz editor URL
 *
 * @example
 * ```ts
 * const url = getStackBlitzUrl('react-creme-button-abc123');
 * // => https://stackblitz.com/edit/react-creme-button-abc123
 * ```
 */
export const getStackBlitzUrl = (projectId: string): string => {
  return `https://stackblitz.com/edit/${projectId}`;
};

/**
 * Generate StackBlitz embed URL
 *
 * @param projectId - StackBlitz project ID
 * @param options - Embed options
 * @returns Full StackBlitz embed URL with query parameters
 *
 * @example
 * ```ts
 * const url = getStackBlitzEmbedUrl('react-creme-button-abc123', {
 *   view: 'preview',
 *   hideNavigation: true
 * });
 * ```
 */
export const getStackBlitzEmbedUrl = (
  projectId: string,
  options?: {
    view?: 'editor' | 'preview' | 'both';
    hideNavigation?: boolean;
    hideExplorer?: boolean;
    theme?: 'light' | 'dark';
  }
): string => {
  const baseUrl = `https://stackblitz.com/edit/${projectId}`;
  const params = new URLSearchParams();

  if (options?.view) params.append('view', options.view);
  if (options?.hideNavigation) params.append('hideNavigation', '1');
  if (options?.hideExplorer) params.append('hideExplorer', '1');
  if (options?.theme) params.append('theme', options.theme);

  const query = params.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
};

/**
 * Generate NPM package URL
 *
 * @param packageName - NPM package name
 * @returns Full NPM package URL
 *
 * @example
 * ```ts
 * const url = getNpmUrl('react-creme');
 * // => https://www.npmjs.com/package/react-creme
 * ```
 */
export const getNpmUrl = (packageName: string = 'react-creme'): string => {
  return `https://www.npmjs.com/package/${packageName}`;
};

/**
 * Generate GitHub issues URL
 *
 * @param config - Optional URL configuration overrides
 * @returns Full GitHub issues URL
 *
 * @example
 * ```ts
 * const url = getIssuesUrl();
 * // => https://github.com/prabhuignoto/react-creme/issues
 * ```
 */
export const getIssuesUrl = (config?: UrlConfig): string => {
  const { owner, repo } = getConfig(config);
  return `https://github.com/${owner}/${repo}/issues`;
};

/**
 * Generate GitHub new issue URL with template
 *
 * @param title - Issue title
 * @param body - Issue body
 * @param labels - Issue labels
 * @param config - Optional URL configuration overrides
 * @returns Full GitHub new issue URL with query parameters
 *
 * @example
 * ```ts
 * const url = getNewIssueUrl('Bug in Button', 'Description...', ['bug']);
 * ```
 */
export const getNewIssueUrl = (
  title?: string,
  body?: string,
  labels?: string[],
  config?: UrlConfig
): string => {
  const { owner, repo } = getConfig(config);
  const baseUrl = `https://github.com/${owner}/${repo}/issues/new`;
  const params = new URLSearchParams();

  if (title) params.append('title', title);
  if (body) params.append('body', body);
  if (labels?.length) params.append('labels', labels.join(','));

  const query = params.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
};

/**
 * Validate if a string is a valid URL
 *
 * @param url - URL string to validate
 * @returns True if valid URL, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Extract project ID from StackBlitz URL
 *
 * @param url - StackBlitz URL
 * @returns Project ID or null if invalid
 *
 * @example
 * ```ts
 * const id = extractStackBlitzId('https://stackblitz.com/edit/abc-123');
 * // => 'abc-123'
 * ```
 */
export const extractStackBlitzId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const match = urlObj.pathname.match(/^\/edit\/(.+?)(?:\/|$)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};
