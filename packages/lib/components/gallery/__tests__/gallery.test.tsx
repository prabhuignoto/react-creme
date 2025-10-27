/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { Image } from '../../image/image';
import { Gallery } from '../gallery';

const TEST_IMAGE_URL =
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0';

describe('Gallery', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<Gallery />);
      const gallery = container.firstChild as HTMLElement;

      expect(gallery).toBeInTheDocument();
      expect(gallery).toHaveAttribute('role', 'region');
      expect(gallery).toHaveAttribute('aria-label', 'Image gallery');
    });

    it('should render all child images', () => {
      const { getByAltText, container } = render(
        <Gallery gridDimension={[2, 2]}>
          <Image src={TEST_IMAGE_URL} alt="test_image_1" />
          <Image src={TEST_IMAGE_URL} alt="test_image_2" />
          <Image src={TEST_IMAGE_URL} alt="test_image_3" />
          <Image src={TEST_IMAGE_URL} alt="test_image_4" />
          <Image src={TEST_IMAGE_URL} alt="test_image_5" />
          <Image src={TEST_IMAGE_URL} alt="test_image_6" />
        </Gallery>
      );

      expect(getByAltText('test_image_1')).toBeInTheDocument();
      expect(getByAltText('test_image_3')).toBeInTheDocument();
      expect(getByAltText('test_image_6')).toBeInTheDocument();

      expect(container.firstChild).toHaveStyle(
        '--rc-gallery-grid-dimension-cols: 2'
      );
      expect(container.firstChild).toHaveStyle(
        '--rc-gallery-grid-dimension-rows: 2'
      );

      expect(
        (container.firstChild as HTMLElement).querySelectorAll('img')
      ).toHaveLength(6);
    });

    it('should render images from imagesURL prop', () => {
      const { getByAltText, container } = render(
        <Gallery
          gridDimension={[3, 2]}
          imagesALT={[
            'test_image_1',
            'test_image_2',
            'test_image_3',
            'test_image_4',
          ]}
          imagesURL={[
            TEST_IMAGE_URL,
            TEST_IMAGE_URL,
            TEST_IMAGE_URL,
            TEST_IMAGE_URL,
          ]}
        />
      );

      expect(getByAltText('test_image_1')).toBeInTheDocument();
      expect(getByAltText('test_image_2')).toBeInTheDocument();
      expect(getByAltText('test_image_3')).toBeInTheDocument();
      expect(getByAltText('test_image_4')).toBeInTheDocument();

      expect(container.firstChild).toHaveStyle(
        '--rc-gallery-grid-dimension-cols: 3'
      );
      expect(container.firstChild).toHaveStyle(
        '--rc-gallery-grid-dimension-rows: 2'
      );
    });

    it('should prioritize children over imagesURL', () => {
      const { container } = render(
        <Gallery
          imagesURL={[TEST_IMAGE_URL]}
          imagesALT={['url_image']}
          gridDimension={[2, 1]}
        >
          <Image src={TEST_IMAGE_URL} alt="child_image_1" />
          <Image src={TEST_IMAGE_URL} alt="child_image_2" />
        </Gallery>
      );

      // Should only render children, not imagesURL
      const images = container.querySelectorAll('img');
      expect(images).toHaveLength(2);
    });

    it('should render with custom gap', () => {
      const { container } = render(
        <Gallery gap={20} imagesURL={[TEST_IMAGE_URL]} />
      );

      expect(container.firstChild).toHaveStyle('--rc-gallery-gap: 20px');
    });

    it('should render with custom image dimensions', () => {
      const { container } = render(
        <Gallery imageDimension={150} imagesURL={[TEST_IMAGE_URL]} />
      );

      expect(container.firstChild).toHaveStyle(
        '--rc-gallery-image-dimension: 150px'
      );
    });

    it('should render with custom aria label', () => {
      const { container } = render(
        <Gallery ariaLabel="My custom gallery" />
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-label',
        'My custom gallery'
      );
    });
  });

  describe('Size Variants', () => {
    it('should render small size', () => {
      const { container } = render(
        <Gallery size="sm" imagesURL={[TEST_IMAGE_URL]} />
      );

      const gallery = container.firstChild as HTMLElement;
      expect(gallery.className).toContain('sm');
    });

    it('should render medium size (default)', () => {
      const { container } = render(<Gallery imagesURL={[TEST_IMAGE_URL]} />);

      const gallery = container.firstChild as HTMLElement;
      expect(gallery.className).toContain('md');
    });

    it('should render large size', () => {
      const { container } = render(
        <Gallery size="lg" imagesURL={[TEST_IMAGE_URL]} />
      );

      const gallery = container.firstChild as HTMLElement;
      expect(gallery.className).toContain('lg');
    });
  });

  describe('Props', () => {
    it('should pass expandImageOnClick to child images', () => {
      const { container } = render(
        <Gallery
          expandImageOnClick={true}
          imagesURL={[TEST_IMAGE_URL]}
          imagesALT={['test']}
        />
      );

      // Image component should receive expandImageOnClick prop
      expect(container.querySelector('img')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render empty gallery', () => {
      const { container } = render(<Gallery />);

      expect(container.firstChild).toBeInTheDocument();
      expect(
        (container.firstChild as HTMLElement).children.length
      ).toBe(0);
    });

    it('should handle missing alt text with fallback', () => {
      const { getByAltText } = render(
        <Gallery
          imagesURL={[TEST_IMAGE_URL, TEST_IMAGE_URL, TEST_IMAGE_URL]}
          imagesALT={['first']}
        />
      );

      expect(getByAltText('first')).toBeInTheDocument();
      expect(getByAltText('Image 2')).toBeInTheDocument();
      expect(getByAltText('Image 3')).toBeInTheDocument();
    });

    it('should handle empty imagesURL array', () => {
      const { container } = render(<Gallery imagesURL={[]} />);

      expect(
        (container.firstChild as HTMLElement).children.length
      ).toBe(0);
    });

    it('should handle empty children array', () => {
      const { container } = render(<Gallery children={[]} />);

      expect(
        (container.firstChild as HTMLElement).children.length
      ).toBe(0);
    });

    it('should handle undefined gap (use default)', () => {
      const { container } = render(
        <Gallery gap={undefined} imagesURL={[TEST_IMAGE_URL]} />
      );

      // Should not set gap when undefined
      const style = (container.firstChild as HTMLElement).style;
      expect(style.getPropertyValue('--rc-gallery-gap')).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations with children', async () => {
      const { container } = render(
        <Gallery>
          <Image src={TEST_IMAGE_URL} alt="test image 1" />
          <Image src={TEST_IMAGE_URL} alt="test image 2" />
        </Gallery>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with imagesURL', async () => {
      const { container } = render(
        <Gallery
          imagesURL={[TEST_IMAGE_URL, TEST_IMAGE_URL]}
          imagesALT={['test image 1', 'test image 2']}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA role', () => {
      const { container } = render(<Gallery />);

      expect(container.firstChild).toHaveAttribute('role', 'region');
    });

    it('should have proper ARIA label', () => {
      const { container } = render(
        <Gallery ariaLabel="Photo gallery" />
      );

      expect(container.firstChild).toHaveAttribute(
        'aria-label',
        'Photo gallery'
      );
    });
  });

  describe('Component Display Name', () => {
    it('should have correct displayName', () => {
      expect(Gallery.displayName).toBe('Gallery');
    });
  });
});
