import { nanoid } from 'nanoid';
import type { FileItem } from './file-upload-model';

/**
 * Check if a file matches the accept pattern
 * @param file - File to check
 * @param accept - Accept pattern (e.g., "image/*", ".pdf,.doc", "image/png,image/jpeg")
 * @returns true if file matches accept pattern
 */
export const isFileTypeAccepted = (file: File, accept?: string): boolean => {
  if (!accept) return true;

  const acceptTypes = accept.split(',').map(type => type.trim());

  return acceptTypes.some(acceptType => {
    // Handle wildcards like "image/*"
    if (acceptType.includes('*')) {
      const baseType = acceptType.split('/')[0];
      if (!baseType) return false;
      return file.type.startsWith(baseType);
    }

    // Handle file extensions like ".pdf"
    if (acceptType.startsWith('.')) {
      return file.name.toLowerCase().endsWith(acceptType.toLowerCase());
    }

    // Handle exact MIME type match
    return file.type === acceptType;
  });
};

/**
 * Format file size in bytes to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Check if file is an image
 * @param file - File to check
 * @returns true if file is an image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Create a FileItem from a File object
 * @param file - Native File object
 * @returns FileItem with metadata
 */
export const createFileItem = (file: File): FileItem => {
  return {
    file,
    id: nanoid(),
    isImage: isImageFile(file),
    previewUrl: undefined,
    progress: 0,
  };
};

/**
 * Check if a file is a duplicate of an existing file
 * Compares by name, size, and lastModified timestamp
 * @param file - File to check
 * @param existingFiles - Array of existing FileItem objects
 * @returns true if file is a duplicate
 */
export const isDuplicateFile = (
  file: File,
  existingFiles: FileItem[]
): boolean => {
  return existingFiles.some(
    item =>
      item.file.name === file.name &&
      item.file.size === file.size &&
      item.file.lastModified === file.lastModified
  );
};
