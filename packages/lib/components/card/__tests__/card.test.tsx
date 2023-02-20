import { render } from '@testing-library/react';
import { Card } from '../card';

describe('Card', () => {
  it('should render a basic card', async () => {
    const { container } = render(<Card />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render header and footer', async () => {
    const { container, getByText } = render(
      <Card header={<span>header</span>} footer={<span>footer</span>} />
    );

    expect(container.firstChild).toBeInTheDocument();

    expect(getByText('header')).toBeInTheDocument();
    expect(getByText('footer')).toBeInTheDocument();
  });
});
