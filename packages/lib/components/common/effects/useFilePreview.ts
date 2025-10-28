import { useCallback } from 'react';
import { isImageFile } from '../../file-upload/utils';

export interface UseFilePreviewOptions {
  /**
   * Whether to show thumbnails for image files
   * @default true
   */
  showThumbnails?: boolean;
}

/**
 * Hook for generating file previews
 * Generates data URLs for image files using FileReader
 *
 * @param options - Preview generation options
 * @returns generatePreview function that returns a Promise<string | undefined>
 *
 * @example
 * ```tsx
 * const { generatePreview } = useFilePreview({ showThumbnails: true });
 *
 * const previewUrl = await generatePreview(file);
 * if (previewUrl) {
 *   setPreview(previewUrl);
 * }
 * ```
 */
export const useFilePreview = (options: UseFilePreviewOptions = {}) => {
  const { showThumbnails = true } = options;

  const generatePreview = useCallback(
    (file: File): Promise<string | undefined> => {
      return new Promise((resolve) => {
        if (!showThumbnails || !isImageFile(file)) {
          resolve(undefined);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.onerror = () => {
          resolve(undefined);
        };
        reader.readAsDataURL(file);
      });
    },
    [showThumbnails]
  );

  return { generatePreview };
};
