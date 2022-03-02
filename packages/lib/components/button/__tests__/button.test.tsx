import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Button } from '../button';
import styles from '../button.module.scss';

const handler = vi.fn();

describe('Button', () => {
  it('should render default', () => {
    const { container } = render(<Button />);

    const button = container.firstChild;

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(styles.default);
  });

  it('should render label', () => {
    const { getByText } = render(<Button label="My Button" />);
    expect(getByText('My Button')).toBeInTheDocument();
  });

  it('should render size', () => {
    const { getByRole } = render(<Button label="My Button" size="lg" />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveClass(styles.lg);
  });

  it('should render button snapshot', () => {
    const { getByRole } = render(<Button label="My Button" />);
    expect(getByRole('button')).toMatchSnapshot();
  });

  it('should render disabled button', () => {
    const handler = vi.fn();

    const { getByRole } = render(
      <Button label="My Button" disabled onClick={handler} />
    );

    expect(getByRole('button')).toHaveClass(styles.disabled);

    fireEvent.click(getByRole('button'));

    expect(handler).not.toBeCalled();
  });

  it('should call handler', () => {
    const { getByText } = render(
      <Button label="My Button" onClick={handler} />
    );

    fireEvent.click(getByText('My Button'));

    expect(handler).toBeCalled();
  });

  it('should call handler via keyboard action', async () => {
    const { getByText } = render(
      <Button label="My Button" onClick={handler} />
    );

    fireEvent.keyDown(getByText('My Button'), { key: 'Enter' });

    await waitFor(() => {
      expect(handler).toBeCalled();
    });
  });

  it('should have focus', () => {
    const { getByRole } = render(
      <Button label="My Button" onClick={handler} focusable />
    );

    fireEvent.focus(getByRole('button'));

    expect(getByRole('button')).toHaveAttribute('tabIndex', '0');
  });
});
