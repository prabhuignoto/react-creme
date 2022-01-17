import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { CarouselTrack } from '../carousel-track';

const handler = jest.fn();

describe('Carousel Track', () => {
  it('Should render the track', () => {
    const { getByRole, getAllByRole } = render(
      <CarouselTrack
        length={3}
        direction="horizontal"
        activeIndex={1}
        handleSelection={handler}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    expect(getByRole('list')).toHaveClass('rc-carousel-track-horizontal');
    expect(getAllByRole('listitem')).toHaveLength(3);
  });

  it('Should render the track snapshot', () => {
    const { getByRole } = render(
      <CarouselTrack
        length={3}
        direction="horizontal"
        activeIndex={1}
        handleSelection={handler}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    expect(getByRole('list')).toMatchSnapshot();
  });

  it('Should call the handler', () => {
    const { getAllByRole } = render(
      <CarouselTrack
        length={3}
        direction="horizontal"
        activeIndex={1}
        handleSelection={handler}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    fireEvent.click(getAllByRole('listitem')[2]);

    expect(handler).toBeCalledWith(2);
  });

  it('Should the active selection is selected', () => {
    const { getAllByRole } = render(
      <CarouselTrack
        length={3}
        direction="horizontal"
        activeIndex={1}
        handleSelection={handler}
        onNext={() => {}}
        onPrevious={() => {}}
      />
    );

    expect(getAllByRole('listitem')[1]).toHaveClass(
      'rc-carousel-track-item-selected'
    );
  });
});
