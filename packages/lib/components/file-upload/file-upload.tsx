import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import type { FileUploadProps, FileUploadRef } from './file-upload-model';
import { isDark } from '../common/utils';
import { useFileProcessing } from '../common/effects/useFileProcessing';
import { useFileDragDrop } from '../common/effects/useFileDragDrop';
import { UploadIcon, CloseIcon, FileIcon } from './icons';
import { formatFileSize } from './utils';
import styles from './file-upload.module.scss';

/**
 * FileUpload component - A comprehensive file upload component with drag & drop,
 * paste support, validation, and image previews
 */
const FileUpload = React.forwardRef<FileUploadRef, FileUploadProps>(
  (props, ref) => {
    const {
      accept,
      maxSize,
      maxFiles = Infinity,
      onChange,
      onError,
      onDrop,
      onPaste,
      showProgress = true,
      showThumbnails = true,
      enableDragDrop = true,
      enablePaste = true,
      disabled = false,
      size = 'md',
      children,
      className,
      style,
      RTL = false,
      ariaLabel = 'Upload files',
      id,
      dropZoneText = 'Drag and drop files here, or click to browse',
      browseButtonText = 'Browse files',
    } = props;

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    // Dark mode detection
    const isDarkMode = useMemo(() => isDark(), []);

    // Component ID
    const componentId = useMemo(() => id || `rc-file-upload-${nanoid()}`, [id]);
    const inputId = `${componentId}-input`;
    const dropZoneId = `${componentId}-dropzone`;

    // File processing hook (handles validation, duplicate detection, previews)
    const { files, processFiles, removeFile, clearFiles, getFiles } =
      useFileProcessing({
        accept,
        maxSize,
        maxFiles,
        showThumbnails,
        onChange,
        onError,
      });

    // Drag and drop hook
    const { isDragging, handlers: dragHandlers } = useFileDragDrop({
      enabled: enableDragDrop,
      disabled,
      onDrop: (droppedFiles) => {
        onDrop?.(droppedFiles);
        processFiles(droppedFiles);
      },
    });

    /**
     * Handle file input change
     */
    const handleFileSelect = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        if (selectedFiles.length > 0) {
          processFiles(selectedFiles);
        }
        // Reset input value to allow selecting the same file again
        event.target.value = '';
      },
      [processFiles]
    );

    /**
     * Handle paste
     */
    const handlePaste = useCallback(
      (event: ClipboardEvent) => {
        if (!enablePaste || disabled) return;

        const items = event.clipboardData?.items;
        if (!items) return;

        const pastedFiles: File[] = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item && item.kind === 'file') {
            const file = item.getAsFile();
            if (file) {
              pastedFiles.push(file);
            }
          }
        }

        if (pastedFiles.length > 0) {
          event.preventDefault();
          onPaste?.(pastedFiles);
          processFiles(pastedFiles);
        }
      },
      [enablePaste, disabled, onPaste, processFiles]
    );

    /**
     * Handle browse button click
     */
    const handleBrowseClick = useCallback(() => {
      if (disabled) return;
      inputRef.current?.click();
    }, [disabled]);

    /**
     * Handle keyboard events on drop zone
     */
    const handleDropZoneKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleBrowseClick();
        }
      },
      [disabled, handleBrowseClick]
    );

    /**
     * Handle keyboard events on file items
     */
    const handleFileKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>, fileId: string) => {
        if (event.key === 'Delete' || event.key === 'Backspace') {
          event.preventDefault();
          removeFile(fileId);
        }
      },
      [removeFile]
    );

    // Setup paste event listener
    useEffect(() => {
      if (!enablePaste || disabled) return;

      const dropZone = dropZoneRef.current;
      if (!dropZone) return;

      const pasteHandler = (event: Event) => {
        handlePaste(event as ClipboardEvent);
      };

      dropZone.addEventListener('paste', pasteHandler);

      return () => {
        dropZone.removeEventListener('paste', pasteHandler);
      };
    }, [enablePaste, disabled, handlePaste]);

    // Expose ref methods
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          dropZoneRef.current?.focus();
        },
        clear: () => {
          clearFiles();
        },
        getFiles: () => {
          return getFiles();
        },
        browse: () => {
          handleBrowseClick();
        },
      }),
      [clearFiles, getFiles, handleBrowseClick]
    );

    // Memoized class names
    const wrapperClass = useMemo(
      () =>
        classNames(
          styles.wrapper,
          styles[size],
          {
            [styles.dark]: isDarkMode,
            [styles.disabled]: disabled,
            [styles.rtl]: RTL,
          },
          className
        ),
      [size, isDarkMode, disabled, RTL, className]
    );

    const dropZoneClass = useMemo(
      () =>
        classNames(styles.dropZone, {
          [styles.dragging]: isDragging,
          [styles.hasFiles]: files.length > 0,
        }),
      [isDragging, files.length]
    );

    return (
      <div className={wrapperClass} style={style} id={componentId}>
        {/* Hidden file input */}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled}
          className={styles.hiddenInput}
          aria-label={ariaLabel}
        />

        {/* Drop zone */}
        <div
          ref={dropZoneRef}
          id={dropZoneId}
          className={dropZoneClass}
          onDragOver={dragHandlers.onDragOver}
          onDragEnter={dragHandlers.onDragEnter}
          onDragLeave={dragHandlers.onDragLeave}
          onDrop={dragHandlers.onDrop}
          onClick={handleBrowseClick}
          onKeyDown={handleDropZoneKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          aria-describedby={`${componentId}-description`}
        >
          {children || (
            <div className={styles.dropZoneContent}>
              <div className={styles.uploadIcon}>
                <UploadIcon />
              </div>
              <div className={styles.dropZoneText}>{dropZoneText}</div>
              <div className={styles.browseButton}>{browseButtonText}</div>
            </div>
          )}
        </div>

        {/* Screen reader description */}
        <div id={`${componentId}-description`} className={styles.srOnly}>
          {`Upload files. ${accept ? `Accepted types: ${accept}.` : ''} ${maxSize ? `Maximum size: ${formatFileSize(maxSize)}.` : ''} ${maxFiles !== Infinity ? `Maximum ${maxFiles} files.` : ''}`}
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className={styles.fileList} role="list">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className={styles.fileItem}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => handleFileKeyDown(e, fileItem.id)}
                aria-label={`${fileItem.file.name}, ${formatFileSize(fileItem.file.size)}`}
              >
                {/* Preview or file icon */}
                <div className={styles.filePreview}>
                  {fileItem.previewUrl ? (
                    <img
                      src={fileItem.previewUrl}
                      alt={fileItem.file.name}
                      className={styles.thumbnail}
                    />
                  ) : (
                    <div className={styles.fileIconWrapper}>
                      <FileIcon />
                    </div>
                  )}
                </div>

                {/* File info */}
                <div className={styles.fileInfo}>
                  <div className={styles.fileName} title={fileItem.file.name}>
                    {fileItem.file.name}
                  </div>
                  <div className={styles.fileSize}>
                    {formatFileSize(fileItem.file.size)}
                  </div>

                  {/* Progress bar */}
                  {showProgress && fileItem.progress !== undefined && (
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${fileItem.progress}%` }}
                        role="progressbar"
                        aria-valuenow={fileItem.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  )}
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(fileItem.id);
                  }}
                  aria-label={`Remove ${fileItem.file.name}`}
                  disabled={disabled}
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };
