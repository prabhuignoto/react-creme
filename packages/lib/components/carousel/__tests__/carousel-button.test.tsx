import React from 'react';
import { axe } from 'jest-axe';
/**
 * @file This file defines the unit tests for the CarouselButton component.
 * @module CarouselButtonTest
 */

import { render, fireEvent } from '@testing-library/react';
import { CarouselButton } from '../carousel-button';
import { vi } from 'vitest';
// @ts-expect-error - SCSS module type declaration is available but not picked up by linter
import styles from '../carousel.module.scss';

describe('CarouselButton', () => {
  // Test the onClick prop.
  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <CarouselButton onClick={handleClick} label="Next" />
    );

    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  // Test the label prop.
  it('should display the correct label', () => {
    const label = 'Next';
    const { getByLabelText } = render(
      <CarouselButton onClick={() => {}} label={label} />
    );

    expect(getByLabelText(label)).toBeInTheDocument();
  });

  // Test the hide prop.
  it('should hide the button when hide is true', () => {
    const { container } = render(
      <CarouselButton onClick={() => {}} label="Next" hide={true} />
    );

    expect(container.firstChild).toHaveClass(styles.btn_hide);
  });

  // Test the position prop.
  it('should have the correct position class', () => {
    const { container } = render(
      <CarouselButton onClick={() => {}} label="Next" position="left" />
    );

    expect(container.firstChild).toHaveClass(styles.btn_left);
  });

  // Test the direction prop.
  it('should have the correct direction class', () => {
    const { container } = render(
      <CarouselButton onClick={() => {}} label="Next" direction="horizontal" />
    );

    expect(container.firstChild).toHaveClass(styles.btn_horizontal);
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<CarouselButton label="Next" onClick={() => {}} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
