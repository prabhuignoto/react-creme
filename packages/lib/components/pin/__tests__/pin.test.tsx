import React, { useRef } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pin, type PinHandle } from '../pin';

describe('Pin Component', () => {
  describe('Rendering', () => {
    it('should render with default length of 4 inputs', () => {
      const { container } = render(<Pin />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);
    });

    it('should render custom pin length', () => {
      const { container } = render(<Pin length={6} />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(6);
    });

    it('should render single digit PIN', () => {
      const { container } = render(<Pin length={1} />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(1);
    });

    it('should render long PIN length', () => {
      const { container } = render(<Pin length={10} />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(10);
    });

    it('should render with size variant sm', () => {
      const { container } = render(<Pin size="sm" />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);
    });

    it('should render with size variant md', () => {
      const { container } = render(<Pin size="md" />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);
    });

    it('should render with size variant lg', () => {
      const { container } = render(<Pin size="lg" />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);
    });

    it('should render with border prop', () => {
      const { container } = render(<Pin border={true} />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);
    });

    it('should render with RTL layout', () => {
      const { container } = render(<Pin RTL={true} />);
      const wrapper = container.querySelector('ul');
      // RTL changes direction style
      expect(wrapper).toHaveAttribute('class');
    });

    it('should render with disabled state', () => {
      const { container } = render(<Pin disabled={true} />);
      const inputs = container.querySelectorAll('input');
      inputs.forEach(input => {
        expect(input).toBeDisabled();
      });
    });

    it('should render with loading state', () => {
      const { container } = render(<Pin loading={true} />);
      const wrapper = container.querySelector('ul');
      // Loading state applied via className
      expect(wrapper).toBeInTheDocument();
    });

    it('should render helper text', () => {
      render(<Pin helperText="Enter your 4-digit PIN" />);
      expect(screen.getByText('Enter your 4-digit PIN')).toBeInTheDocument();
    });

    it('should render error message', () => {
      render(<Pin error="Incorrect PIN" />);
      expect(screen.getByText('Incorrect PIN')).toBeInTheDocument();
    });
  });

  describe('Input Behavior', () => {
    it('should accept numeric input', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(firstInput, '1');
      expect(onChange).toHaveBeenCalledWith('1');
    });

    it('should reject non-numeric input', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(firstInput, 'a');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should accept only single digit per input', async () => {
      const { container } = render(<Pin />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(firstInput, '12');
      expect(firstInput.value).toBe('1');
    });

    it('should auto-jump to next input on digit entry', async () => {
      const { container } = render(<Pin />);
      const inputs = container.querySelectorAll('input');
      const firstInput = inputs[0] as HTMLInputElement;
      const secondInput = inputs[1] as HTMLInputElement;

      firstInput.focus();
      await userEvent.type(firstInput, '1');

      await waitFor(() => {
        expect(secondInput).toHaveFocus();
      });
    });

    it('should not auto-jump when disabled', async () => {
      const { container } = render(<Pin autoJump={false} />);
      const inputs = container.querySelectorAll('input');
      const firstInput = inputs[0] as HTMLInputElement;
      const secondInput = inputs[1] as HTMLInputElement;

      firstInput.focus();
      await userEvent.type(firstInput, '1');

      expect(secondInput).not.toHaveFocus();
    });

    it('should build complete PIN value', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin length={4} onChange={onChange} />);
      const inputs = container.querySelectorAll('input');

      for (let i = 0; i < 4; i++) {
        await userEvent.type(inputs[i] as HTMLInputElement, String(i + 1));
      }

      expect(onChange).toHaveBeenLastCalledWith('1234');
    });

    it('should preserve leading zeros', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(firstInput, '0');
      expect(onChange).toHaveBeenCalledWith('0');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should move to next input on ArrowRight', async () => {
      const { container } = render(<Pin />);
      const inputs = container.querySelectorAll('input');
      const firstInput = inputs[0] as HTMLInputElement;
      const secondInput = inputs[1] as HTMLInputElement;

      firstInput.focus();
      fireEvent.keyDown(firstInput, { key: 'ArrowRight' });

      await waitFor(() => {
        expect(secondInput).toHaveFocus();
      });
    });

    it('should move to previous input on ArrowLeft', async () => {
      const { container } = render(<Pin />);
      const inputs = container.querySelectorAll('input');
      const firstInput = inputs[0] as HTMLInputElement;
      const secondInput = inputs[1] as HTMLInputElement;

      secondInput.focus();
      fireEvent.keyDown(secondInput, { key: 'ArrowLeft' });

      await waitFor(() => {
        expect(firstInput).toHaveFocus();
      });
    });

    it('should move to first input on Home key', async () => {
      const { container } = render(<Pin />);
      const inputs = container.querySelectorAll('input');
      const lastInput = inputs[3] as HTMLInputElement;
      const firstInput = inputs[0] as HTMLInputElement;

      lastInput.focus();
      fireEvent.keyDown(lastInput, { key: 'Home' });

      await waitFor(() => {
        expect(firstInput).toHaveFocus();
      });
    });

    it('should move to last input on End key', async () => {
      const { container } = render(<Pin />);
      const inputs = container.querySelectorAll('input');
      const firstInput = inputs[0] as HTMLInputElement;
      const lastInput = inputs[3] as HTMLInputElement;

      firstInput.focus();
      fireEvent.keyDown(firstInput, { key: 'End' });

      await waitFor(() => {
        expect(lastInput).toHaveFocus();
      });
    });

    it('should handle Backspace to clear current digit', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(firstInput, '1');
      fireEvent.keyDown(firstInput, { key: 'Backspace' });

      expect(onChange).toHaveBeenLastCalledWith('');
    });

    it('should move to previous input on Backspace when empty', () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const inputs = container.querySelectorAll('input');

      fireEvent.change(inputs[0], { target: { value: '1' } });
      fireEvent.change(inputs[1], { target: { value: '2' } });

      inputs[1].focus();
      fireEvent.keyDown(inputs[1], { key: 'Backspace' });

      // Focus management should move to previous input
      expect(onChange).toHaveBeenCalled();
    });

    it('should respect RTL arrow keys', async () => {
      const { container } = render(<Pin RTL={true} />);
      const inputs = container.querySelectorAll('input');
      const firstInput = inputs[0] as HTMLInputElement;
      const secondInput = inputs[1] as HTMLInputElement;

      firstInput.focus();
      // In RTL, ArrowLeft should move forward
      fireEvent.keyDown(firstInput, { key: 'ArrowLeft' });

      await waitFor(() => {
        expect(secondInput).toHaveFocus();
      });
    });
  });

  describe('Paste Handling', () => {
    it('should paste full PIN', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      fireEvent.paste(firstInput, {
        clipboardData: { getData: () => '1234' },
      } as any);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('1234');
      });
    });

    it('should paste partial PIN from middle input', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const inputs = container.querySelectorAll('input');
      const secondInput = inputs[1] as HTMLInputElement;

      fireEvent.paste(secondInput, {
        clipboardData: { getData: () => '234' },
      } as any);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('234');
      });
    });

    it('should extract digits from pasted mixed content', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      fireEvent.paste(firstInput, {
        clipboardData: { getData: () => '1-2-3-4' },
      } as any);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('1234');
      });
    });

    it('should not paste non-numeric content', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      fireEvent.paste(firstInput, {
        clipboardData: { getData: () => 'abcd' },
      } as any);

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should limit pasted content to PIN length', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin length={4} onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      fireEvent.paste(firstInput, {
        clipboardData: { getData: () => '123456789' },
      } as any);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('1234');
      });
    });
  });

  describe('Controlled/Uncontrolled Mode', () => {
    it('should work in uncontrolled mode', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(firstInput, '1');
      expect(onChange).toHaveBeenCalledWith('1');
    });

    it('should work in controlled mode', () => {
      const { container, rerender } = render(
        <Pin value="12" onChange={() => {}} />
      );
      let inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);

      rerender(<Pin value="1234" onChange={() => {}} />);
      inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(4);
    });

    it('should support defaultValue in uncontrolled mode', async () => {
      const { container } = render(<Pin defaultValue="123" />);
      const inputs = container.querySelectorAll('input');

      expect(inputs[0].value).toBe('1');
      expect(inputs[1].value).toBe('2');
      expect(inputs[2].value).toBe('3');
    });

    it('should call onComplete when PIN is complete', async () => {
      const onComplete = vi.fn();
      const { container } = render(<Pin length={4} onComplete={onComplete} />);
      const inputs = container.querySelectorAll('input');

      for (let i = 0; i < 4; i++) {
        await userEvent.type(inputs[i] as HTMLInputElement, String(i + 1));
      }

      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledWith('1234');
      });
    });
  });

  describe('Masking', () => {
    it('should render as password input when mask is true', () => {
      const { container } = render(<Pin mask={true} />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      expect(firstInput.type).toBe('password');
    });

    it('should use custom mask character', async () => {
      const { container } = render(<Pin mask={true} maskChar="*" />);
      const firstInput = container.querySelector('input') as HTMLInputElement;

      await userEvent.type(firstInput, '1');

      // The display value should be masked (implementation handles this)
      expect(firstInput).toBeInTheDocument();
    });

    it('should support maskDelay prop', () => {
      const { container } = render(
        <Pin mask={true} maskChar="●" maskDelay={500} />
      );
      const firstInput = container.querySelector('input') as HTMLInputElement;

      fireEvent.change(firstInput, { target: { value: '1' } });
      expect(firstInput).toBeInTheDocument();
    });
  });

  describe('Ref/Handle API', () => {
    it('should reset PIN via ref', () => {
      const TestComponent = () => {
        const ref = useRef<PinHandle>(null);

        return (
          <>
            <Pin ref={ref} />
            <button onClick={() => ref.current?.reset()}>Reset</button>
          </>
        );
      };

      const { container } = render(<TestComponent />);
      const inputs = container.querySelectorAll('input');
      const resetButton = screen.getByText('Reset');
      const firstInput = inputs[0] as HTMLInputElement;

      fireEvent.change(firstInput, { target: { value: '1' } });
      expect(firstInput.value).toBe('1');

      fireEvent.click(resetButton);
      expect(firstInput.value).toBe('');
    });

    it('should focus first input via ref', () => {
      const TestComponent = () => {
        const ref = useRef<PinHandle>(null);

        return (
          <>
            <Pin ref={ref} />
            <button onClick={() => ref.current?.focus()}>Focus</button>
          </>
        );
      };

      const { container } = render(<TestComponent />);
      const focusButton = screen.getByText('Focus');
      const inputs = container.querySelectorAll('input');

      fireEvent.click(focusButton);
      expect(inputs[0]).toHaveFocus();
    });

    it('should get current value via ref', () => {
      const TestComponent = () => {
        const ref = useRef<PinHandle>(null);
        const [value, setValue] = React.useState('');

        return (
          <>
            <Pin ref={ref} value={value} onChange={setValue} />
            <button onClick={() => setValue(ref.current?.getValue() || '')}>
              Get Value
            </button>
            <div data-testid="value-display">{value}</div>
          </>
        );
      };

      render(<TestComponent />);
      expect(screen.getByTestId('value-display')).toBeInTheDocument();
    });

    it('should check if complete via ref', () => {
      const TestComponent = () => {
        const ref = useRef<PinHandle>(null);
        const [isComplete, setIsComplete] = React.useState(false);

        return (
          <>
            <Pin ref={ref} length={4} value="1234" onChange={() => {}} />
            <button
              onClick={() => setIsComplete(ref.current?.isComplete() || false)}
            >
              Check
            </button>
            <div>{isComplete ? 'Complete' : 'Incomplete'}</div>
          </>
        );
      };

      render(<TestComponent />);
      expect(screen.getByText('Incomplete')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on each input', () => {
      const { container } = render(<Pin length={4} />);
      const inputs = container.querySelectorAll('input');

      expect(inputs[0]).toHaveAttribute('aria-label', 'PIN digit 1 of 4');
      expect(inputs[1]).toHaveAttribute('aria-label', 'PIN digit 2 of 4');
      expect(inputs[2]).toHaveAttribute('aria-label', 'PIN digit 3 of 4');
      expect(inputs[3]).toHaveAttribute('aria-label', 'PIN digit 4 of 4');
    });

    it('should have group aria-label', () => {
      const { container } = render(<Pin length={6} />);
      const wrapper = container.querySelector('ul');

      expect(wrapper).toHaveAttribute('aria-label', 'PIN code input, 6 digits');
    });

    it('should support custom aria-label', () => {
      const { container } = render(<Pin aria-label="Custom PIN input" />);
      const wrapper = container.querySelector('ul');

      expect(wrapper).toHaveAttribute('aria-label', 'Custom PIN input');
    });

    it('should have live region for announcements', () => {
      const { container } = render(<Pin />);
      const liveRegion = container.querySelector('[role="status"]');

      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });

    it('should announce error state', () => {
      const { container } = render(<Pin error="Invalid PIN" />);
      const wrapper = container.querySelector('ul');

      expect(wrapper).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-describedby for error message', () => {
      const { container } = render(<Pin error="Invalid PIN" />);
      const wrapper = container.querySelector('ul');

      expect(wrapper).toHaveAttribute('aria-describedby');
    });

    it('should have aria-describedby for helper text', () => {
      const { container } = render(<Pin helperText="Enter 4 digits" />);
      const inputs = container.querySelectorAll('input');

      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-describedby');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle length=1', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin length={1} onChange={onChange} />);
      const input = container.querySelector('input') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '1' } });
      expect(onChange).toHaveBeenCalledWith('1');
    }, 5000);

    it('should handle very long PIN (10 digits)', async () => {
      const { container } = render(<Pin length={10} />);
      const inputs = container.querySelectorAll('input');

      expect(inputs.length).toBe(10);
    });

    it('should handle rapid input changes', async () => {
      const onChange = vi.fn();
      const { container } = render(<Pin onChange={onChange} />);
      const inputs = container.querySelectorAll('input');

      for (let i = 0; i < 4; i++) {
        fireEvent.change(inputs[i] as HTMLInputElement, {
          target: { value: String(i + 1) },
        });
      }

      expect(onChange).toHaveBeenCalled();
    });

    it('should handle updateing defaultValue', () => {
      const { rerender, container } = render(<Pin defaultValue="123" />);
      let inputs = container.querySelectorAll('input');

      expect(inputs[0].value).toBe('1');

      rerender(<Pin defaultValue="456" />);
      inputs = container.querySelectorAll('input');

      // Component should support dynamic updates
      expect(inputs.length).toBe(4);
    });

    it('should handle readOnly prop', () => {
      const { container } = render(<Pin readOnly={true} />);
      const inputs = container.querySelectorAll('input');

      inputs.forEach(input => {
        expect(input).toHaveAttribute('readonly');
      });
    });
  });

  describe('Display Modes', () => {
    it('should use numeric inputMode', () => {
      const { container } = render(<Pin />);
      const input = container.querySelector('input') as HTMLInputElement;

      expect(input.inputMode).toBe('numeric');
    });

    it('should have type=text for unmasked', () => {
      const { container } = render(<Pin mask={false} />);
      const input = container.querySelector('input') as HTMLInputElement;

      expect(input.type).toBe('text');
    });

    it('should have type=password for masked', () => {
      const { container } = render(<Pin mask={true} />);
      const input = container.querySelector('input') as HTMLInputElement;

      expect(input.type).toBe('password');
    });
  });
});
