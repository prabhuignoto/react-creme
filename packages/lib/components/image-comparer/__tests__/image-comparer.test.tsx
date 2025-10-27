/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ImageComparer } from '../image-comparer';

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

      const separator = screen.getByRole('separator');
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

      const separator = screen.getByRole('separator');
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

      const separator = screen.getByRole('separator');
      expect(separator).toHaveAttribute('tabIndex', '0');
    });

    it('should support keyboard interaction', async () => {
      const user = userEvent.setup();

      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('separator');
      separator.focus();

      // Test that separator can receive focus
      expect(separator).toHaveFocus();
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

    it('should have proper ARIA role for separator', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('separator');
      expect(separator).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(
        <ImageComparer sourceOne={mockImageSrc1} sourceTwo={mockImageSrc2} />
      );

      const separator = screen.getByRole('separator');
      expect(separator).toHaveAttribute('tabIndex', '0');
    });
  });
});
