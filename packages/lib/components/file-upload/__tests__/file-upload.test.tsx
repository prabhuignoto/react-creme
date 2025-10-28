import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { FileUpload } from '../file-upload';
import type { FileUploadRef } from '../file-upload-model';
import React from 'react';

// Mock FileReader
class MockFileReader {
  result: string | ArrayBuffer | null = null;
  onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
  onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;

  readAsDataURL(file: File) {
    setTimeout(() => {
      this.result = `data:image/png;base64,mock-${file.name}`;
      if (this.onload) {
        this.onload({ target: this } as ProgressEvent<FileReader>);
      }
    }, 0);
  }
}

global.FileReader = MockFileReader as unknown as typeof FileReader;

// Helper function to create mock files
const createMockFile = (
  name: string,
  size: number,
  type: string
): File => {
  const file = new File(['a'.repeat(size)], name, { type });
  return file;
};

// Helper function to create DataTransfer for drag and drop
const createDataTransfer = (files: File[]): DataTransfer => {
  return {
    files: files as unknown as FileList,
    items: files.map((file) => ({
      kind: 'file' as const,
      type: file.type,
      getAsFile: () => file,
    })) as unknown as DataTransferItemList,
    types: ['Files'],
    dropEffect: 'copy',
    effectAllowed: 'all',
    clearData: vi.fn(),
    getData: vi.fn(),
    setData: vi.fn(),
    setDragImage: vi.fn(),
  } as DataTransfer;
};

describe('FileUpload', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<FileUpload />);

      expect(screen.getByRole('button', { name: /upload files/i })).toBeInTheDocument();
      expect(screen.getByText(/drag and drop files here/i)).toBeInTheDocument();
    });

    it('should render custom children', () => {
      render(
        <FileUpload>
          <div>Custom drop zone content</div>
        </FileUpload>
      );

      expect(screen.getByText('Custom drop zone content')).toBeInTheDocument();
    });

    it('should render with custom text', () => {
      render(
        <FileUpload
          dropZoneText="Drop your files here"
          browseButtonText="Select files"
        />
      );

      expect(screen.getByText('Drop your files here')).toBeInTheDocument();
      expect(screen.getByText('Select files')).toBeInTheDocument();
    });

    it('should render with all size variants', () => {
      const { rerender } = render(<FileUpload size="sm" />);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<FileUpload size="md" />);
      expect(screen.getByRole('button')).toBeInTheDocument();

      rerender(<FileUpload size="lg" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<FileUpload className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should apply custom id', () => {
      render(<FileUpload id="test-upload" />);
      expect(screen.getByRole('button')).toHaveAttribute('id', 'test-upload-dropzone');
    });
  });

  describe('File Selection', () => {
    it('should handle file selection via input', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<FileUpload onChange={handleChange} />);

      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith([file]);
      });
    });

    it('should handle multiple file selection', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<FileUpload onChange={handleChange} />);

      const files = [
        createMockFile('file1.pdf', 1024, 'application/pdf'),
        createMockFile('file2.pdf', 2048, 'application/pdf'),
      ];

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, files);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(files);
      });
    });

    it('should display selected files', async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const file = createMockFile('document.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('document.pdf')).toBeInTheDocument();
        expect(screen.getByText('1 KB')).toBeInTheDocument();
      });
    });

    it('should show image thumbnails for image files', async () => {
      const user = userEvent.setup();

      render(<FileUpload showThumbnails />);

      const file = createMockFile('image.png', 2048, 'image/png');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        const img = screen.getByAltText('image.png');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', expect.stringContaining('data:image'));
      });
    });
  });

  describe('Validation', () => {
    it('should validate file type', async () => {
      const handleError = vi.fn();

      render(
        <FileUpload
          accept="image/*"
          onError={handleError}
        />
      );

      // Directly test the validation logic by simulating file selection
      const file = createMockFile('document.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      // Manually set files and trigger change
      Object.defineProperty(input, 'files', {
        value: [file],
        writable: false,
      });

      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(changeEvent);

      // Validation should reject the PDF file when only images are accepted
      await waitFor(
        () => {
          expect(handleError).toHaveBeenCalled();
        },
        { timeout: 3000 }
      );
    });

    it('should validate file size', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const handleError = vi.fn();

      render(
        <FileUpload
          maxSize={1000}
          onChange={handleChange}
          onError={handleError}
        />
      );

      const file = createMockFile('large.pdf', 2000, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'file-size',
            file,
          })
        );
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    it('should validate max files', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const handleError = vi.fn();

      render(
        <FileUpload
          maxFiles={2}
          onChange={handleChange}
          onError={handleError}
        />
      );

      const files = [
        createMockFile('file1.pdf', 1024, 'application/pdf'),
        createMockFile('file2.pdf', 1024, 'application/pdf'),
        createMockFile('file3.pdf', 1024, 'application/pdf'),
      ];

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      await user.upload(input, files);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'max-files',
          })
        );
        // Should still accept the first 2 files
        expect(handleChange).toHaveBeenCalledWith([files[0], files[1]]);
      });
    });

    it('should accept valid files', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const handleError = vi.fn();

      render(
        <FileUpload
          accept="image/*"
          maxSize={10000}
          onChange={handleChange}
          onError={handleError}
        />
      );

      const file = createMockFile('image.png', 2048, 'image/png');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith([file]);
        expect(handleError).not.toHaveBeenCalled();
      });
    });
  });

  describe('Drag and Drop', () => {
    it('should handle drag over', async () => {
      render(<FileUpload />);

      const dropZone = screen.getByRole('button', { name: /upload files/i });

      // Trigger dragenter with event
      const dataTransfer = createDataTransfer([]);
      const dragEnterEvent = Object.assign(
        new Event('dragenter', { bubbles: true, cancelable: true }),
        { dataTransfer }
      );

      dropZone.dispatchEvent(dragEnterEvent);

      // Should add dragging class (visual feedback) after state update
      await waitFor(() => {
        expect(dropZone.className).toContain('dragging');
      });
    });

    it('should handle file drop', async () => {
      const handleChange = vi.fn();
      const handleDrop = vi.fn();

      render(<FileUpload onChange={handleChange} onDrop={handleDrop} />);

      const dropZone = screen.getByRole('button', { name: /upload files/i });
      const file = createMockFile('dropped.pdf', 1024, 'application/pdf');

      // Simulate drop
      const dataTransfer = createDataTransfer([file]);
      const dropEvent = Object.assign(
        new Event('drop', { bubbles: true, cancelable: true }),
        { dataTransfer }
      );

      dropZone.dispatchEvent(dropEvent);

      await waitFor(() => {
        expect(handleDrop).toHaveBeenCalledWith([file]);
        expect(handleChange).toHaveBeenCalledWith([file]);
      });
    });

    it('should not handle drop when disabled', () => {
      const handleChange = vi.fn();

      render(<FileUpload disabled onChange={handleChange} />);

      const dropZone = screen.getByRole('button', { name: /upload files/i });
      const file = createMockFile('file.pdf', 1024, 'application/pdf');

      const dataTransfer = createDataTransfer([file]);
      const dropEvent = Object.assign(
        new Event('drop', { bubbles: true, cancelable: true }),
        { dataTransfer }
      );

      dropZone.dispatchEvent(dropEvent);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should not handle drop when drag and drop is disabled', () => {
      const handleChange = vi.fn();

      render(<FileUpload enableDragDrop={false} onChange={handleChange} />);

      const dropZone = screen.getByRole('button', { name: /upload files/i });
      const file = createMockFile('file.pdf', 1024, 'application/pdf');

      const dataTransfer = createDataTransfer([file]);
      const dropEvent = Object.assign(
        new Event('drop', { bubbles: true, cancelable: true }),
        { dataTransfer }
      );

      dropZone.dispatchEvent(dropEvent);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('should remove file when remove button is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<FileUpload onChange={handleChange} />);

      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });

      const removeButton = screen.getByRole('button', { name: /remove test\.pdf/i });
      await user.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
        expect(handleChange).toHaveBeenLastCalledWith([]);
      });
    });

    it('should open file browser on drop zone click', async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      const dropZone = screen.getByRole('button', { name: /upload files/i });
      await user.click(dropZone);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should open file browser on Enter key', async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      const dropZone = screen.getByRole('button', { name: /upload files/i });
      dropZone.focus();
      await user.keyboard('{Enter}');

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should open file browser on Space key', async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      const dropZone = screen.getByRole('button', { name: /upload files/i });
      dropZone.focus();
      await user.keyboard(' ');

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('Ref Methods', () => {
    it('should expose focus method', () => {
      const ref = React.createRef<FileUploadRef>();

      render(<FileUpload ref={ref} />);

      expect(ref.current?.focus).toBeDefined();
      ref.current?.focus();

      expect(document.activeElement).toBe(screen.getByRole('button', { name: /upload files/i }));
    });

    it('should expose clear method', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<FileUploadRef>();
      const handleChange = vi.fn();

      render(<FileUpload ref={ref} onChange={handleChange} />);

      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });

      ref.current?.clear();

      await waitFor(() => {
        expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
        expect(handleChange).toHaveBeenLastCalledWith([]);
      });
    });

    it('should expose getFiles method', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<FileUploadRef>();

      render(<FileUpload ref={ref} />);

      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        const files = ref.current?.getFiles();
        expect(files).toHaveLength(1);
        expect(files?.[0]).toBe(file);
      });
    });

    it('should expose browse method', () => {
      const ref = React.createRef<FileUploadRef>();

      render(<FileUpload ref={ref} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');

      ref.current?.browse();

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('should render disabled state', () => {
      render(<FileUpload disabled />);

      const dropZone = screen.getByRole('button', { name: /upload files/i });
      expect(dropZone).toHaveAttribute('aria-disabled', 'true');
      expect(dropZone).toHaveAttribute('tabIndex', '-1');
    });

    it('should not accept files when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<FileUpload disabled onChange={handleChange} />);

      const dropZone = screen.getByRole('button', { name: /upload files/i });
      await user.click(dropZone);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<FileUpload />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
      render(<FileUpload ariaLabel="Upload documents" />);

      const dropZone = screen.getByRole('button', { name: /upload documents/i });
      expect(dropZone).toHaveAttribute('aria-label', 'Upload documents');
      expect(dropZone).toHaveAttribute('aria-describedby');
    });

    it('should have accessible file list', async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        const fileList = screen.getByRole('list');
        expect(fileList).toBeInTheDocument();

        const fileItem = screen.getByRole('listitem');
        expect(fileItem).toHaveAttribute('aria-label', expect.stringContaining('test.pdf'));
      });
    });

    it('should have keyboard accessible remove buttons', async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        const removeButton = screen.getByRole('button', { name: /remove test\.pdf/i });
        expect(removeButton).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty file list', () => {
      render(<FileUpload />);

      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('should format large file sizes correctly', async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const file = createMockFile('large.pdf', 1024 * 1024 * 2.5, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('2.5 MB')).toBeInTheDocument();
      });
    });

    it('should handle RTL mode', () => {
      const { container } = render(<FileUpload RTL />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('rtl');
    });

    it('should not show thumbnails when disabled', async () => {
      const user = userEvent.setup();

      render(<FileUpload showThumbnails={false} />);

      const file = createMockFile('image.png', 2048, 'image/png');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(screen.queryByAltText('image.png')).not.toBeInTheDocument();
      });
    });

    it('should not show progress when disabled', async () => {
      const user = userEvent.setup();

      render(<FileUpload showProgress={false} />);

      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      await user.upload(input, file);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });
    });
  });
});
