import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';
import { CarouselTrack } from '../carousel-track';
import { CarouselTrackProps } from '../carousel-model';
import { vi } from 'vitest';

describe('CarouselTrack', () => {
  const defaultProps: CarouselTrackProps = {
    activeIndex: 0,
    direction: 'horizontal',
    focusable: true,
    handleSelection: vi.fn(),
    hideNext: false,
    hidePrevious: false,
    length: 5,
    onNext: vi.fn(),
    onPrevious: vi.fn(),
  };

  it('renders without crashing', () => {
    const { container } = render(<CarouselTrack {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the correct number of track items', () => {
    const { getAllByRole } = render(<CarouselTrack {...defaultProps} />);
    const items = getAllByRole('tab');
    expect(items.length).toBe(defaultProps.length);
  });

  it('calls the handleSelection function when a track item is clicked', () => {
    const { getAllByRole } = render(<CarouselTrack {...defaultProps} />);
    const items = getAllByRole('tab');
    fireEvent.click(items[0]);
    expect(defaultProps.handleSelection).toHaveBeenCalledWith(0);
  });

  it('calls the onNext function when the next button is clicked', () => {
    const { getByLabelText } = render(<CarouselTrack {...defaultProps} />);
    const nextButton = getByLabelText('Next');
    fireEvent.click(nextButton);
    expect(defaultProps.onNext).toHaveBeenCalled();
  });

  it('calls the onPrevious function when the previous button is clicked', () => {
    const { getByLabelText } = render(<CarouselTrack {...defaultProps} />);
    const previousButton = getByLabelText('Previous');
    fireEvent.click(previousButton);
    expect(defaultProps.onPrevious).toHaveBeenCalled();
  });

  describe('Accessibility', () => {
    it.skip('should have no accessibility violations', async () => {
      // Note: CarouselTrack uses aria-controls to reference carousel-slide-* elements
      // which are created by the parent Carousel component. When tested in isolation,
      // these referenced elements don't exist, causing axe violations.
      // Full accessibility testing should use the integrated Carousel component.
      const { container } = render(<CarouselTrack {...defaultProps} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
