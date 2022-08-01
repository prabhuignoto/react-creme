import { render } from '@testing-library/react';
import { Image } from '../image';

describe('Image', () => {
  it.concurrent('should render image', async () => {
    const { getByAltText, container } = render(
      <Image
        src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
        alt="test_image"
      />
    );

    expect(getByAltText('test_image')).toBeInTheDocument();

    if (container.firstChild) {
      expect(container.firstChild as HTMLElement).toHaveStyle('--width: 100%');
    }
  });
});
