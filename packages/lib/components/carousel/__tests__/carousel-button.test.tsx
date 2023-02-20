import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { CarouselButton } from '../carousel-button';
import styles from '../carousel.module.scss';

const handler = vi.fn();

describe('Carousel Button', () => {
  it('should render with position', async () => {
    const { container } = render(
      <CarouselButton
        position="left"
        onClick={handler}
        direction="horizontal"
        label="Previous"
      />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(styles.btn_left);
  });

  it('should render carousel button snapshot', async () => {
    const { getByRole } = render(
      <CarouselButton
        position="left"
        onClick={handler}
        direction="vertical"
        label="previous"
      />
    );

    expect(getByRole('button')).toMatchSnapshot();
  });

  it('should call the onClick handler', async () => {
    const { getByRole } = render(
      <CarouselButton
        position="left"
        onClick={handler}
        direction="horizontal"
        label="Previous"
      />
    );

    fireEvent.click(getByRole('button'));

    expect(handler).toBeCalled();
  });
});
