import { useCallback, useState } from 'react';
import type {
  FileItem,
  FileUploadError,
} from '../../file-upload/file-upload-model';
import { createFileItem, isDuplicateFile } from '../../file-upload/utils';
import { useFileValidation, UseFileValidationOptions } from './useFileValidation';
import { useFilePreview, UseFilePreviewOptions } from './useFilePreview';

export interface UseFileProcessingOptions
  extends UseFileValidationOptions,
    UseFilePreviewOptions {
  /**
   * Maximum number of files allowed
   * @default Infinity
   */
  maxFiles?: number;

  /**
   * Callback when files change
   */
  onChange?: (files: File[]) => void;

  /**
   * Callback when validation error occurs
   */
  onError?: (error: FileUploadError) => void;
}

/**
 * Hook for file processing orchestration
 * Manages file state and coordinates validation, duplicate detection, and preview generation
 *
 * @param options - File processing options
 * @returns File state and processing functions
 *
 * @example
 * ```tsx
 * const { files, processFiles, removeFile, clearFiles } = useFileProcessing({
 *   maxFiles: 5,
 *   accept: 'image/*',
 *   maxSize: 5 * 1024 * 1024,
 *   onChange: (files) => console.log('Files changed:', files),
 *   onError: (error) => console.error('Error:', error.message)
 * });
 *
 * // Process files from input or drop
 * await processFiles(fileArray);
 *
 * // Remove a file
 * removeFile(fileId);
 *
 * // Clear all files
 * clearFiles();
 * ```
 */
export const useFileProcessing = (options: UseFileProcessingOptions) => {
  const {
    maxFiles = Infinity,
    onChange,
    onError,
    accept,
    maxSize,
    showThumbnails,
  } = options;

  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);

  const { validateFile } = useFileValidation({ accept, maxSize });
  const { generatePreview } = useFilePreview({ showThumbnails });

  /**
   * Process and add files with validation and duplicate detection
   */
  const processFiles = useCallback(
    async (files: File[]) => {
      const errors: FileUploadError[] = [];
      let addedFileIds: string[] = [];
      let validFilesForPreviews: FileItem[] = [];

      // Add files to state synchronously first
      setSelectedFiles((prevFiles) => {
        // Reset for this render (important for React Strict Mode)
        const validFiles: FileItem[] = [];

        // Check max files limit
        const remainingSlots = maxFiles - prevFiles.length;
        const filesToProcess = files.slice(0, remainingSlots);

        if (files.length > remainingSlots) {
          errors.push({
            message: `Maximum ${maxFiles} files allowed. ${files.length - remainingSlots} file(s) were not added.`,
            type: 'max-files',
          });
        }

        // Validate files, check for duplicates, and collect valid ones
        filesToProcess.forEach((file) => {
          // Check for duplicates first (both in prevFiles and in current batch)
          if (isDuplicateFile(file, prevFiles) || isDuplicateFile(file, validFiles)) {
            errors.push({
              file,
              message: `File "${file.name}" is already added.`,
              type: 'file-type',
            });
            return;
          }

          // Validate file
          const error = validateFile(file);
          if (error) {
            errors.push(error);
          } else {
            // Create file item without preview first
            const fileItem = createFileItem(file);
            validFiles.push(fileItem);
          }
        });

        // Report errors
        if (errors.length > 0 && onError) {
          errors.forEach((error) => onError(error));
        }

        // If no valid files, return early
        if (validFiles.length === 0) {
          return prevFiles;
        }

        const newFiles = [...prevFiles, ...validFiles];

        // Call onChange with new file list
        onChange?.(newFiles.map((item) => item.file));

        // Store for preview generation (outside setState)
        addedFileIds = validFiles.map((f) => f.id);
        validFilesForPreviews = validFiles;

        return newFiles;
      });

      // If no files were added or thumbnails disabled, return early
      if (addedFileIds.length === 0 || !showThumbnails) return;

      // Generate previews for all image files in parallel
      const imagesToPreview = validFilesForPreviews.filter((f) => f.isImage);
      if (imagesToPreview.length === 0) return;

      const previewPromises = imagesToPreview.map(async (fileItem) => {
        const previewUrl = await generatePreview(fileItem.file);
        return { id: fileItem.id, previewUrl };
      });

      const previews = await Promise.all(previewPromises);

      // Single batch update for all previews at once
      setSelectedFiles((current) =>
        current.map((item) => {
          const preview = previews.find((p) => p.id === item.id);
          return preview?.previewUrl
            ? { ...item, previewUrl: preview.previewUrl }
            : item;
        })
      );
    },
    [maxFiles, validateFile, generatePreview, onChange, onError, showThumbnails]
  );

  /**
   * Remove a file by ID
   */
  const removeFile = useCallback(
    (fileId: string) => {
      setSelectedFiles((prev) => {
        const newFiles = prev.filter((item) => item.id !== fileId);

        // Revoke blob URLs to free memory
        const removedFile = prev.find((item) => item.id === fileId);
        if (removedFile?.previewUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(removedFile.previewUrl);
        }

        // Call onChange with updated files
        onChange?.(newFiles.map((item) => item.file));

        return newFiles;
      });
    },
    [onChange]
  );

  /**
   * Clear all files
   */
  const clearFiles = useCallback(() => {
    setSelectedFiles((prev) => {
      // Revoke all blob URLs
      prev.forEach((item) => {
        if (item.previewUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      onChange?.([]);
      return [];
    });
  }, [onChange]);

  /**
   * Get current files as File array
   */
  const getFiles = useCallback(() => {
    return selectedFiles.map((item) => item.file);
  }, [selectedFiles]);

  return {
    clearFiles,
    files: selectedFiles,
    getFiles,
    processFiles,
    removeFile,
  };
};
