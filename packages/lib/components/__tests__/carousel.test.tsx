import { render, waitFor } from '@testing-library/react';
import { Carousel } from '../core/carousel/carousel';

describe('Carousel', () => {
  it.concurrent('should render carousel', async () => {
    const { getByText } = render(
      <Carousel direction="horizontal">
        <span>one</span>
        <span>two</span>
      </Carousel>
    );

    await waitFor(() => {
      expect(getByText('one')).toBeInTheDocument();
      expect(getByText('two')).toBeInTheDocument();
    });
  });

  it('should render carousel snapshot', async () => {
    const { container } = render(
      <Carousel direction="horizontal">
        <span>one</span>
        <span>two</span>
      </Carousel>
    );

    await waitFor(
      () => {
        expect(container.firstChild).toMatchSnapshot();
      },
      { timeout: 1000 }
    );
  });

  it.concurrent('should render vertical carousel', async () => {
    const { getByText } = render(
      <Carousel direction="vertical">
        <span>one</span>
        <span>two</span>
      </Carousel>
    );

    await waitFor(
      () => {
        expect(getByText('one')).toBeInTheDocument();
        expect(getByText('two')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
