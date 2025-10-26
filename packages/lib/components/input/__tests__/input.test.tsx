import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';
import styles from '../input.module.scss';

describe('Input', () => {
  describe('Rendering', () => {
    it('should render default input', () => {
      render(<Input />);
      const input = screen.getAllByRole('textbox')[0];

      expect(input).toBeInTheDocument();
      expect(input).toHaveClass(styles.default);
    });

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter name" />);
      expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    });

    it('should render the spinner when showSpinner is true', () => {
      render(<Input showSpinner />);
      expect(screen.getByTestId('rc-input-spinner')).toBeInTheDocument();
    });

    it('should render as autocomplete with combobox role', () => {
      const { container } = render(<Input isAutoComplete />);
      expect(container.firstChild).toHaveAttribute('role', 'combobox');
    });
  });

  describe('States', () => {
    it('should be disabled', () => {
      render(<Input disabled placeholder="Enter value" />);
      const input = screen.getByPlaceholderText('Enter value');

      expect(input).toBeDisabled();
    });

    it('should be in success state', () => {
      const { container } = render(<Input state="success" />);
      expect(container.firstChild).toHaveClass(styles.success);
    });

    it('should be in error state', () => {
      const { container } = render(<Input state="error" />);
      expect(container.firstChild).toHaveClass(styles.error);
    });

    it('should have aria-label from placeholder in error state', () => {
      const { container } = render(<Input state="error" placeholder="error" />);
      expect(container.firstChild).toHaveAttribute('aria-label', 'error');
    });
  });

  describe('User Interactions', () => {
    it('should call onChange handler when typing', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Input onChange={handler} placeholder="Type here" />);
      const input = screen.getByPlaceholderText('Type here');

      await user.type(input, 'test');

      expect(handler).toHaveBeenCalled();
    });

    it('should call onFocus handler when focused', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(<Input onFocus={handler} placeholder="Focus test" />);
      const input = screen.getByPlaceholderText('Focus test');

      await user.click(input);

      expect(handler).toHaveBeenCalled();
    });

    it('should clear input when clear button is clicked', async () => {
      const user = userEvent.setup();
      const handler = vi.fn();

      render(
        <Input
          onChange={handler}
          enableClear
          placeholder="enter"
          showSpinner={false}
        />
      );

      const input = screen.getByPlaceholderText('enter');
      await user.type(input, 'text');

      const clearButton = screen.getByTestId('rc-clear-input');
      expect(clearButton).toBeInTheDocument();

      await user.click(clearButton);

      expect(handler).toHaveBeenCalledWith('');
    });

    it('should honour maxLength property', async () => {
      const user = userEvent.setup();

      render(<Input maxLength={3} placeholder="Max 3 chars" />);
      const input = screen.getByPlaceholderText('Max 3 chars') as HTMLInputElement;

      await user.type(input, 'test');

      expect(input.value).toBe('tes');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<Input placeholder="Enter text" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations in error state', async () => {
      const { container } = render(
        <Input state="error" placeholder="Error input" />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations in success state', async () => {
      const { container } = render(
        <Input state="success" placeholder="Success input" />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<Input disabled placeholder="Disabled" />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
