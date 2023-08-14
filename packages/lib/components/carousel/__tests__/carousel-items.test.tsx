/**
 * @file This file defines the unit tests for the CarouselItems component.
 * @module CarouselItemsTest
 */

import { render, waitFor } from '@testing-library/react';
import { CarouselItems } from '../carousel-items';

describe('CarouselItems', () => {
  const carouselItems = [
    { height: 100, id: '1', left: '0', top: '0', width: 100 },
    { height: 100, id: '2', left: '100', top: '0', width: 100 },
    { height: 100, id: '3', left: '200', top: '0', width: 100 },
  ];

  // Test the activePage prop.
  it('should display the correct active page', async () => {
    const activePage = 1;
    const { container } = render(
      <CarouselItems
        activePage={activePage}
        carouselItems={carouselItems}
        totalItems={3}
        width={100}
        height={100}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselItems>
    );

    const items = container.querySelectorAll('[role="listitem"]');

    await waitFor(() => {
      expect(items[activePage]).toHaveAttribute('data-visible', 'true');
    });
  });

  // Test the direction prop.
  it('should apply the correct transform style based on direction', () => {
    const { container } = render(
      <CarouselItems
        activePage={0}
        carouselItems={carouselItems}
        direction="horizontal"
        totalItems={3}
        width={100}
        height={100}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselItems>
    );

    const items = container.querySelectorAll('li');

    expect(items[1]).toHaveStyle({
      left: '100px',
    });
  });

  // Test the children prop.
  it('should render the correct children', () => {
    const { getByText } = render(
      <CarouselItems
        activePage={0}
        carouselItems={carouselItems}
        totalItems={3}
        width={100}
        height={100}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselItems>
    );

    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Item 3')).toBeInTheDocument();
  });

  // Test the carouselItems prop.
  it('should apply the correct styles to each item', () => {
    const { container } = render(
      <CarouselItems
        activePage={0}
        carouselItems={carouselItems}
        totalItems={3}
        width={100}
        height={100}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </CarouselItems>
    );

    const items = container.querySelectorAll('li');

    console.log(items.length);

    expect(items[0]).toHaveStyle({
      left: '0px',
      visibility: 'visible',
      width: '100px',
    });
    expect(items[1]).toHaveStyle({
      left: '100px',
      visibility: 'hidden',
      width: '100px',
    });
    expect(items[2]).toHaveStyle({
      left: '200px',
      visibility: 'hidden',
      width: '100px',
    });
  });
});
