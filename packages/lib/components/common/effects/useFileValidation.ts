import { useCallback } from 'react';
import type { FileUploadError } from '../../file-upload/file-upload-model';
import {
  isFileTypeAccepted,
  formatFileSize,
} from '../../file-upload/utils';

export interface UseFileValidationOptions {
  /**
   * Accepted file types (e.g., "image/*", ".pdf,.doc")
   */
  accept?: string;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
}

/**
 * Hook for file validation
 * Provides a function to validate files against accept pattern and size limits
 *
 * @param options - Validation options (accept pattern, max size)
 * @returns validateFile function that returns error or null
 *
 * @example
 * ```tsx
 * const { validateFile } = useFileValidation({
 *   accept: 'image/*',
 *   maxSize: 5 * 1024 * 1024 // 5MB
 * });
 *
 * const error = validateFile(file);
 * if (error) {
 *   console.error(error.message);
 * }
 * ```
 */
export const useFileValidation = (options: UseFileValidationOptions) => {
  const { accept, maxSize } = options;

  const validateFile = useCallback(
    (file: File): FileUploadError | null => {
      // Check file type
      if (accept && !isFileTypeAccepted(file, accept)) {
        return {
          file,
          message: `File type "${file.type || 'unknown'}" is not accepted. Accepted types: ${accept}`,
          type: 'file-type',
        };
      }

      // Check file size
      if (maxSize && file.size > maxSize) {
        return {
          file,
          message: `File "${file.name}" is too large. Maximum size: ${formatFileSize(maxSize)}`,
          type: 'file-size',
        };
      }

      return null;
    },
    [accept, maxSize]
  );

  return { validateFile };
};
