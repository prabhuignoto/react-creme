import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  error: Error | null;
  reset: () => void;
}

export interface UseCopyToClipboardOptions {
  /**
   * Duration in milliseconds before resetting the copied state
   * @default 2000
   */
  resetDelay?: number;
}

/**
 * Custom hook for copying text to clipboard with error handling and visual feedback
 *
 * Features:
 * - Handles clipboard API with proper error handling
 * - Fallback for older browsers using execCommand
 * - Automatic reset of copied state after delay
 * - Returns error state for user feedback
 *
 * @example
 * ```tsx
 * const { copied, copy, error } = useCopyToClipboard({ resetDelay: 3000 });
 *
 * const handleCopy = async () => {
 *   const success = await copy('npm install react-creme');
 *   if (success) {
 *     // Show success message
 *   }
 * };
 * ```
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { resetDelay = 2000 } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Fallback method for browsers that don't support Clipboard API
   */
  const fallbackCopy = useCallback((text: string): boolean => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (!successful) {
        throw new Error('execCommand copy failed');
      }

      return true;
    } catch (err) {
      console.error('Fallback copy failed:', err);
      return false;
    }
  }, []);

  /**
   * Copy text to clipboard
   */
  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      // Reset previous error
      setError(null);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      try {
        // Try modern Clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          return true;
        }

        // Fallback to execCommand for older browsers
        const success = fallbackCopy(text);
        if (success) {
          setCopied(true);
          return true;
        }

        throw new Error('Copy operation failed');
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error('Failed to copy text to clipboard');
        setError(error);
        setCopied(false);
        return false;
      }
    },
    [fallbackCopy]
  );

  /**
   * Reset the copied state manually
   */
  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Auto-reset copied state after delay
  useEffect(() => {
    if (copied && resetDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, resetDelay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [copied, resetDelay]);

  return { copied, copy, error, reset };
}
