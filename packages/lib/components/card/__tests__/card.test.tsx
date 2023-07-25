import { render } from '@testing-library/react';
import { Card } from '../card';
import styles from '../card.module.scss';

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

  it('should render with custom height', () => {
    const { container } = render(<Card height={300} />);
    const card = container.firstChild;
    expect(card).toHaveStyle('--height: 300px');
  });

  it('should render without border', () => {
    const { container } = render(<Card border={false} />);
    const card = container.firstChild;
    expect(card).toHaveClass(styles.border_less);
  });

  it('should render with shadow', () => {
    const { container } = render(<Card shadow />);
    const card = container.firstChild;
    expect(card).toHaveClass(styles.shadow);
  });

  it('should align header and footer correctly', () => {
    const { container } = render(
      <Card
        alignHeader="right"
        alignFooter="center"
        header={<span>header</span>}
        footer={<span>footer</span>}
      />
    );
    const card = container.firstChild as HTMLElement;
    if (card) {
      const header = card.querySelector(`.${styles.header}`);
      const footer = card.querySelector(`.${styles.footer}`);

      expect(header).toHaveClass(styles.align_right);
      expect(footer).toHaveClass(styles.align_center);
    }
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <Card>
        <div>Child Node</div>
      </Card>
    );
    expect(getByText('Child Node')).toBeInTheDocument();
  });
});
