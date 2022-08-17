import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { CarouselTrack } from '../../core/carousel/carousel-track';
import styles from '../../core/carousel/carousel-track.module.scss';

const handler = vi.fn();

describe('Carousel Track', () => {
  it.concurrent('Should render the track', async () => {
    const { getByRole, getAllByRole } = render(
      <CarouselTrack
        length={3}
        direction="horizontal"
        activeIndex={1}
        handleSelection={handler}
        onNext={() => console.log('next')}
        onPrevious={() => console.log('previous')}
      />
    );

    expect(getByRole('list')).toHaveClass(styles.track_horizontal);
    expect(getAllByRole('listitem')).toHaveLength(3);
  });

  it('Should render the track snapshot', async () => {
    const { getByRole } = render(
      <CarouselTrack
        length={3}
        direction="horizontal"
        activeIndex={1}
        handleSelection={handler}
        onNext={() => console.log('next')}
        onPrevious={() => console.log('previous')}
      />
    );

    expect(getByRole('list')).toMatchSnapshot();
  });

  it.concurrent('Should call the handler', async () => {
    const { getAllByRole } = render(
      <CarouselTrack
        length={3}
        direction="horizontal"
        activeIndex={1}
        handleSelection={handler}
        onNext={() => console.log('next')}
        onPrevious={() => console.log('previous')}
      />
    );

    fireEvent.click(getAllByRole('listitem')[2]);

    expect(handler).toBeCalledWith(2);
  });

  it.concurrent('Should the active selection is selected', async () => {
    const { getAllByRole } = render(
      <CarouselTrack
        length={3}
        direction="horizontal"
        activeIndex={1}
        handleSelection={handler}
        onNext={() => console.log('next')}
        onPrevious={() => console.log('previous')}
      />
    );

    expect(getAllByRole('listitem')[1]).toHaveClass(styles.track_item_selected);
  });
});
