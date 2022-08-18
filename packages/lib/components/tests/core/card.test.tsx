import { render } from '@testing-library/react';

import { Card } from '../../core/card/card';

describe('Card', () => {
  it.concurrent('should render a basic card', async () => {
    const { container } = render(<Card />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it.concurrent('should render header and footer', async () => {
    const { container, getByText } = render(
      <Card header={<span>header</span>} footer={<span>footer</span>} />
    );

    expect(container.firstChild).toBeInTheDocument();

    expect(getByText('header')).toBeInTheDocument();
    expect(getByText('footer')).toBeInTheDocument();
  });
});
