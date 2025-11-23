import type { CSSProperties, ReactNode } from 'react';

/**
 * Error types that can occur during file upload validation
 */
export type FileUploadErrorType =
  | 'file-type'
  | 'file-size'
  | 'max-files'
  | 'read-error'
  | 'unknown';

/**
 * File upload validation error
 */
export interface FileUploadError {
  /**
   * Type of validation error
   */
  type: FileUploadErrorType;

  /**
   * Human-readable error message
   */
  message: string;

  /**
   * File that caused the error (if applicable)
   */
  file?: File;
}

/**
 * Internal representation of a file with metadata
 */
export interface FileItem {
  /**
   * Unique identifier for the file
   */
  id: string;

  /**
   * Native File object
   */
  file: File;

  /**
   * Preview URL for images (data URL or blob URL)
   */
  previewUrl?: string;

  /**
   * Upload progress (0-100)
   */
  progress?: number;

  /**
   * Whether this is an image file
   */
  isImage: boolean;
}

/**
 * Props for the FileUpload component
 */
export interface FileUploadProps {
  /**
   * 🔴 Accepted file types (e.g., "image/*", ".pdf,.doc", "image/png,image/jpeg")
   * Follows the HTML input accept attribute format
   */
  accept?: string;

  /**
   * 🔴 Maximum file size in bytes
   * Files larger than this will be rejected
   */
  maxSize?: number;

  /**
   * 🔴 Maximum number of files that can be selected
   * @default Infinity
   */
  maxFiles?: number;

  /**
   * 🔴 Callback executed when files are selected or changed
   * Receives an array of valid File objects
   */
  onChange?: (files: File[]) => void;

  /**
   * 🔴 Callback executed when a validation error occurs
   * Receives error details
   */
  onError?: (error: FileUploadError) => void;

  /**
   * Callback executed when files are dropped
   * Called before onChange
   */
  onDrop?: (files: File[]) => void;

  /**
   * Callback executed when files are pasted
   * Called before onChange
   */
  onPaste?: (files: File[]) => void;

  /**
   * Whether to show upload progress bars
   * @default true
   */
  showProgress?: boolean;

  /**
   * Whether to show image thumbnails for image files
   * @default true
   */
  showThumbnails?: boolean;

  /**
   * Whether to enable drag and drop
   * @default true
   */
  enableDragDrop?: boolean;

  /**
   * Whether to enable paste from clipboard
   * @default true
   */
  enablePaste?: boolean;

  /**
   * Disables the file upload component
   */
  disabled?: boolean;

  /**
   * Component size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Custom content to display in the drop zone
   * If not provided, default drop zone UI will be shown
   */
  children?: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: CSSProperties;

  /**
   * Right-to-left text direction support
   */
  RTL?: boolean;

  /**
   * Accessible label for the file input
   * @default 'Upload files'
   */
  ariaLabel?: string;

  /**
   * ID for the component
   */
  id?: string;

  /**
   * Text to display in the drop zone
   * @default 'Drag and drop files here, or click to browse'
   */
  dropZoneText?: string;

  /**
   * Text to display for the browse button
   * @default 'Browse files'
   */
  browseButtonText?: string;
}

/**
 * Ref methods exposed by FileUpload component
 */
export interface FileUploadRef {
  /**
   * Focus the file upload component
   */
  focus: () => void;

  /**
   * Clear all selected files
   */
  clear: () => void;

  /**
   * Get currently selected files
   */
  getFiles: () => File[];

  /**
   * Programmatically open the file browser
   */
  browse: () => void;
}
