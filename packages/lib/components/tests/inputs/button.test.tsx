import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, vi } from 'vitest';
import { Button } from '../../inputs/button/button';
import styles from '../../inputs/button/button.module.scss';

const handler = vi.fn();

describe('Button', () => {
  it.concurrent('should render default', async () => {
    const { container } = render(<Button />);

    const button = container.firstChild;

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.default);
  });

  it.concurrent('should render label', async () => {
    const { getByText } = render(<Button label="My Button" />);
    expect(getByText('My Button')).toBeInTheDocument();
  });

  it.concurrent('should render size', async () => {
    const { getByRole } = render(<Button label="My Button" size="lg" />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveClass(styles.lg);
  });

  it('should render button snapshot', async () => {
    const { getByRole } = render(<Button label="My Button" />);
    expect(getByRole('button')).toMatchSnapshot();
  });

  it.concurrent('should render disabled button', async () => {
    const handler = vi.fn();

    const { getByRole } = render(
      <Button label="My Button" disabled onClick={handler} />
    );

    expect(getByRole('button')).toHaveClass(styles.disabled);

    fireEvent.click(getByRole('button'));

    expect(handler).not.toBeCalled();
  });

  it.concurrent('should call handler', async () => {
    const { getByText } = render(
      <Button label="My Button" onClick={handler} />,
      {
        container: document.body,
      }
    );

    fireEvent.click(getByText('My Button'));

    expect(handler).toBeCalled();
  });

  it.concurrent('should call handler via keyboard action', async () => {
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

  it.concurrent('should have focus', async () => {
    const { getByRole } = render(
      <Button label="My Button" onClick={handler} focusable />,
      {
        container: document.body,
      }
    );

    fireEvent.focus(getByRole('button'));

    expect(getByRole('button')).toHaveAttribute('tabIndex', '0');
  });
});
