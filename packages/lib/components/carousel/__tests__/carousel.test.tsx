/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, waitFor } from '@testing-library/react';
import { Carousel } from '../carousel';

describe('Carousel', () => {
  it('should render carousel', async () => {
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

  it('should render vertical carousel', async () => {
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

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Carousel />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
