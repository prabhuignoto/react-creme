import { render } from '@testing-library/react';
import { CarouselItems } from '../carousel-items';
import { CarouselItemProps } from './../carousel-model';

const items: CarouselItemProps[] = [
  {
    height: 300,
    id: '234',
    left: '0px',
    top: '0px',
    visible: true,
    width: 300,
  },
  {
    height: 300,
    id: '235',
    left: '300px',
    top: '0px',
    visible: true,
    width: 300,
  },
];

describe('Carousel items', () => {
  it('Should render carousel items', async () => {
    const { getByRole, getAllByRole } = render(
      <CarouselItems
        carouselItems={items}
        height={300}
        width={300}
        direction="horizontal"
        totalItems={2}
        activePage={1}
      >
        <span>one</span>
        <span>two</span>
      </CarouselItems>,
      {
        container: document.body,
      }
    );
    expect(getByRole('list')).toBeInTheDocument();
    expect(getAllByRole('listitem')).toHaveLength(1);
  });

  it('Should render carousel items snapshot', async () => {
    const { getByRole } = render(
      <CarouselItems
        carouselItems={items}
        height={300}
        width={300}
        direction="horizontal"
        totalItems={2}
        activePage={1}
      >
        <span>one</span>
        <span>two</span>
      </CarouselItems>,
      {
        container: document.body,
      }
    );
    expect(getByRole('list')).toMatchSnapshot();
  });
});
