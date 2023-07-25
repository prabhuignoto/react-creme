import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import { Button } from '../button';
import styles from '../button.module.scss';

const handler = vi.fn();

describe('Button', () => {
  it('should render default', async () => {
    const { container } = render(<Button />);

    const button = container.firstChild;

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.default);
  });

  it('should render label', async () => {
    const { getByText } = render(<Button label="My Button" />);
    expect(getByText('My Button')).toBeInTheDocument();
  });

  it('should render size', async () => {
    const { getByRole } = render(<Button label="My Button" size="lg" />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveClass(styles.lg);
  });

  it('should render button snapshot', async () => {
    const { getByRole } = render(<Button label="My Button" />);
    expect(getByRole('button')).toMatchSnapshot();
  });

  it('should render disabled button', async () => {
    const handler = vi.fn();

    const { getByRole } = render(
      <Button label="My Button" disabled onClick={handler} />
    );

    expect(getByRole('button')).toHaveClass(styles.disabled);

    fireEvent.click(getByRole('button'));

    expect(handler).not.toBeCalled();
  });

  it('should call handler', async () => {
    const { getByText } = render(
      <Button label="My Button" onClick={handler} />,
      {
        container: document.body,
      }
    );

    fireEvent.click(getByText('My Button'));

    expect(handler).toBeCalled();
  });

  it('should call handler via keyboard action', async () => {
    const { getByText } = render(
      <Button label="My Button" onClick={handler} />,
      {
        container: document.body,
      }
    );

    fireEvent.keyDown(getByText('My Button'), { key: 'Enter' });

    await waitFor(async () => {
      expect(handler).toBeCalled();
    });
  });

  it('should have focus', async () => {
    const { getByRole } = render(
      <Button label="My Button" onClick={handler} focusable />,
      {
        container: document.body,
      }
    );

    fireEvent.focus(getByRole('button'));

    expect(getByRole('button')).toHaveAttribute('tabIndex', '0');
  });

  it('should render button in busy state', () => {
    const { getByRole } = render(<Button label="My Button" isBusy />);
    expect(getByRole('button')).toHaveClass(styles.disabled);
    expect(getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('should render button without border', () => {
    const { getByRole } = render(<Button label="My Button" border={false} />);
    expect(getByRole('button')).toHaveClass(styles.no_border);
  });

  it('should render button with correct accent', () => {
    const { getByRole } = render(<Button label="My Button" accent="flat" />);
    expect(getByRole('button')).toHaveClass(styles.flat);
  });

  it('should render children correctly', () => {
    const { getByText } = render(
      <Button>
        <div>Child Node</div>
      </Button>
    );
    expect(getByText('Child Node')).toBeInTheDocument();
  });

  it('should render progress button correctly', () => {
    const { getByRole } = render(<Button type="progress" />);
    expect(getByRole('button')).toHaveClass(styles.progress);
  });
});
