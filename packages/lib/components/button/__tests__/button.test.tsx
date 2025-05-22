import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { it, vi } from 'vitest';
import { Button } from '../button';
import styles from '../button.module.scss';
import userEvent from '@testing-library/user-event';

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
    const handler = vi.fn();
    render(
      <Button aria-label="My Button" onClick={handler}>
        My Button
      </Button>
    );

    const button = screen.getByRole('button', { name: 'My Button' });

    // Focus the element firstackag
    await userEvent.click(button); // This ensures the element gets focus

    // Use the following methods to trigger the keyboard action
    await userEvent.keyboard('{Enter}');
    // For Space key as fallback
    await userEvent.keyboard(' ');

    // If using fireEvent directly is needed:
    // fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    // Wait for any async handlers to complete
    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
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
