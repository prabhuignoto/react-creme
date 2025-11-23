import { useCallback, useState } from 'react';
import React from 'react';

export interface UseFileDragDropOptions {
  /**
   * Whether drag and drop is enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback when files are dropped
   */
  onDrop?: (files: File[]) => void;
}

/**
 * Hook for managing drag and drop state and handlers
 * Provides drag state and event handlers for file drag and drop
 *
 * @param options - Drag and drop options
 * @returns Drag state and event handlers
 *
 * @example
 * ```tsx
 * const { isDragging, handlers } = useFileDragDrop({
 *   enabled: true,
 *   onDrop: (files) => processFiles(files)
 * });
 *
 * <div
 *   onDragOver={handlers.onDragOver}
 *   onDragEnter={handlers.onDragEnter}
 *   onDragLeave={handlers.onDragLeave}
 *   onDrop={handlers.onDrop}
 * >
 *   {isDragging ? 'Drop files here' : 'Drag files here'}
 * </div>
 * ```
 */
export const useFileDragDrop = (options: UseFileDragDropOptions) => {
  const { enabled = true, disabled = false, onDrop } = options;

  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = React.useRef(0);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (!enabled || disabled) return;

      event.preventDefault();
      event.stopPropagation();
    },
    [enabled, disabled]
  );

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (!enabled || disabled) return;

      event.preventDefault();
      event.stopPropagation();

      dragCounterRef.current += 1;
      setIsDragging(true);
    },
    [enabled, disabled]
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (!enabled || disabled) return;

      event.preventDefault();
      event.stopPropagation();

      dragCounterRef.current -= 1;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    },
    [enabled, disabled]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (!enabled || disabled) return;

      event.preventDefault();
      event.stopPropagation();

      setIsDragging(false);
      dragCounterRef.current = 0;

      const files = Array.from(event.dataTransfer.files);
      if (files.length > 0) {
        onDrop?.(files);
      }
    },
    [enabled, disabled, onDrop]
  );

  return {
    handlers: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
    isDragging,
  };
};
