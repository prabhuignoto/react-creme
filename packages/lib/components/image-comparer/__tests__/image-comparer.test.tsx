import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ImageComparer } from '../image-comparer';

// Note: The ImageComparer uses 'slider' role (ARIA pattern for sliders) rather than 'separator'
// This is semantically more correct for an interactive comparison handle

const mockImageSrc1 = 'https://example.com/image1.jpg';
const mockImageSrc2 = 'https://example.com/image2.jpg';

describe('ImageComparer', () => {
  describe('Rendering', () => {
    it('should render image comparer component', () => {
      const { container } = render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with horizontal direction by default', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toBeInTheDocument();
    });

    it('should render with vertical direction', () => {
      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          direction="vertical"
        />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toBeInTheDocument();
    });

    it('should show loading indicator initially', () => {
      const { container } = render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      // CircularProgress component should be rendered
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should make separator focusable', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toHaveAttribute('tabIndex', '0');
    });

    it('should support keyboard interaction', async () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      // Test that separator can receive focus
      expect(separator).toHaveFocus();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle Arrow Right key in horizontal mode', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          direction="horizontal"
        />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      const initialValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );

      await user.keyboard('{ArrowRight}');

      const newValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );
      expect(newValue).toBeGreaterThan(initialValue);
    });

    it('should handle Arrow Left key in horizontal mode', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          direction="horizontal"
        />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      const initialValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );

      await user.keyboard('{ArrowLeft}');

      const newValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );
      expect(newValue).toBeLessThan(initialValue);
    });

    it('should handle Arrow Down key in vertical mode', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          direction="vertical"
        />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      const initialValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );

      await user.keyboard('{ArrowDown}');

      const newValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );
      expect(newValue).toBeGreaterThan(initialValue);
    });

    it('should handle Arrow Up key in vertical mode', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          direction="vertical"
        />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      const initialValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );

      await user.keyboard('{ArrowUp}');

      const newValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );
      expect(newValue).toBeLessThan(initialValue);
    });

    it('should handle Home key to jump to 0%', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      await user.keyboard('{Home}');

      const value = parseInt(separator.getAttribute('aria-valuenow') || '50');
      expect(value).toBe(0);
    });

    it('should handle End key to jump to 100%', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      await user.keyboard('{End}');

      const value = parseInt(separator.getAttribute('aria-valuenow') || '50');
      expect(value).toBe(100);
    });

    it('should handle PageUp key for large increment', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          largeStep={20}
        />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      const initialValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );

      await user.keyboard('{PageUp}');

      const newValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );
      // Should increase by approximately 20% (largeStep)
      expect(newValue).toBeGreaterThanOrEqual(initialValue + 15);
    });

    it('should handle PageDown key for large decrement', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          largeStep={20}
        />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      const initialValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );

      await user.keyboard('{PageDown}');

      const newValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );
      // Should decrease by approximately 20% (largeStep)
      expect(newValue).toBeLessThanOrEqual(initialValue - 15);
    });

    it('should move by 1% increment with arrow keys', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      const initialValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );

      await user.keyboard('{ArrowRight}');

      const newValue = parseInt(
        separator.getAttribute('aria-valuenow') || '50'
      );
      // Arrow keys move by 1% per press
      expect(newValue).toBe(initialValue + 1);
    });

    it('should not exceed 100% with keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      // Jump to end
      await user.keyboard('{End}');

      // Try to go further
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{ArrowRight}');

      const value = parseInt(separator.getAttribute('aria-valuenow') || '50');
      expect(value).toBeLessThanOrEqual(100);
    });

    it('should not go below 0% with keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      separator.focus();

      // Jump to start
      await user.keyboard('{Home}');

      // Try to go further
      await user.keyboard('{ArrowLeft}');
      await user.keyboard('{ArrowLeft}');

      const value = parseInt(separator.getAttribute('aria-valuenow') || '50');
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Image Loading', () => {
    it('should handle image load events', async () => {
      const { container } = render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const images = container.querySelectorAll('img');
      expect(images.length).toBe(2);
    });

    it('should render both image panels', () => {
      const { container } = render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const images = container.querySelectorAll('img');
      expect(images[0]).toHaveAttribute('src', mockImageSrc1);
      expect(images[1]).toHaveAttribute('src', mockImageSrc2);
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA role for slider', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toHaveAttribute('tabIndex', '0');
    });

    it('should have complete ARIA attributes', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toHaveAttribute('aria-label');
      expect(separator).toHaveAttribute('aria-valuenow');
      expect(separator).toHaveAttribute('aria-valuemin', '0');
      expect(separator).toHaveAttribute('aria-valuemax', '100');
      expect(separator).toHaveAttribute('aria-valuetext');
      expect(separator).toHaveAttribute('aria-orientation');
    });

    it('should have horizontal orientation by default', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have vertical orientation when specified', () => {
      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          direction="vertical"
        />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should use custom aria-label when provided', () => {
      const customLabel = 'Custom image comparison';
      render(
        <ImageComparer
          sourceOne={mockImageSrc1}
          sourceTwo={mockImageSrc2}
          ariaLabel={customLabel}
        />
      );

      const separator = screen.getByRole('slider');
      expect(separator).toHaveAttribute('aria-label', customLabel);
    });

    it('should update aria-valuetext to reflect current position', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('slider');
      const valueText = separator.getAttribute('aria-valuetext');
      expect(valueText).toMatch(/\d+% comparison/);
    });
  });
});
