import { render } from '@testing-library/react';
import { Image } from 'react-creme';

import { Gallery } from '../gallery';

describe('Gallery', () => {
  it('Should render all the images', () => {
    const { getByAltText, container } = render(
      <Gallery gridDimension={[2, 2]}>
        <Image
          src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
          alt="test_image_1"
        />
        <Image
          src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
          alt="test_image_2"
        />
        <Image
          src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
          alt="test_image_3"
        />
        <Image
          src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
          alt="test_image_4"
        />
      </Gallery>
    );
    expect(getByAltText('test_image_1')).toBeInTheDocument();
    expect(getByAltText('test_image_3')).toBeInTheDocument();
    expect(getByAltText('test_image_4')).toBeInTheDocument();

    expect(container.firstChild).toHaveStyle(
      `--rc-gallery-grid-dimension-cols: 2; --rc-gallery-grid-dimension-rows: 2;`
    );
  });

  it("should render all the imageURL's", () => {
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
          'https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg',
          'https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg',
          'https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg',
          'https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg',
        ]}
      />
    );
    expect(getByAltText('test_image_1')).toBeInTheDocument();
    expect(getByAltText('test_image_3')).toBeInTheDocument();

    expect(container.firstChild).toHaveStyle(
      `--rc-gallery-grid-dimension-cols: 3; --rc-gallery-grid-dimension-rows: 2;`
    );
  });
});
