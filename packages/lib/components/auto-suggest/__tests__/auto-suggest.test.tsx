import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { AutoSuggest } from '../auto-suggest';

const suggestions = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'sixty six',
].map(item => ({
  name: item,
  value: item,
}));

describe('AutoSuggest', () => {
  it('should render Auto Suggest', async () => {
    const { getByTestId } = render(<AutoSuggest suggestions={suggestions} />);
    expect(getByTestId('rc-auto-suggest')).toBeInTheDocument();
  });

  it('should render Auto Suggest with placeholder', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <AutoSuggest suggestions={suggestions} placeholder="placeholder" />
    );
    expect(getByTestId('rc-auto-suggest')).toBeInTheDocument();
    expect(getByPlaceholderText('placeholder')).toBeInTheDocument();
  });

  it('should render suggestions', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AutoSuggest suggestions={suggestions} placeholder="enter input" />,
      {
        container: document.body,
      }
    );

    expect(getByPlaceholderText('enter input')).toBeInTheDocument();

    userEvent.type(getByPlaceholderText('enter input'), 'one');

    await waitFor(
      async () => {
        expect(getByTestId('rc-overlay')).toBeInTheDocument();
        expect(getByTestId('rc-overlay').querySelectorAll('li')).toHaveLength(
          1
        );
      },
      {
        timeout: 2000,
      }
    );
  });

  it('should show the selected item', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AutoSuggest suggestions={suggestions} placeholder="enter input" />,
      {
        container: document.body,
      }
    );

    fireEvent.change(getByPlaceholderText('enter input'), {
      target: { value: 'one' },
    });

    await waitFor(
      async () => {
        expect(getByTestId('rc-overlay')).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );

    userEvent.click(getByTestId('rc-overlay').querySelectorAll('li')[0]);

    await waitFor(async () => {
      expect(getByPlaceholderText('enter input')).toHaveValue('one');
    });
  });

  it('should call onChange with the input', async () => {
    const onChange = vi.fn();
    const { getByPlaceholderText } = render(
      <AutoSuggest
        suggestions={suggestions}
        placeholder="enter input"
        onChange={onChange}
      />
    );

    fireEvent.change(getByPlaceholderText('enter input'), {
      target: { value: 'open' },
    });

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith('open');
      },
      {
        timeout: 2000,
      }
    );
  });

  it('should keyboard navigation work as expected', async () => {
    const handler = vi.fn();
    const { getByPlaceholderText, getByText, getAllByRole, getByRole } = render(
      <AutoSuggest
        suggestions={suggestions}
        placeholder="enter input"
        onChange={handler}
      />
    );

    fireEvent.change(getByPlaceholderText('enter input'), {
      target: { value: 'six' },
    });

    await waitFor(() => {
      expect(getByText('six')).toBeInTheDocument();
      expect(getAllByRole('option')).toHaveLength(2);
    });

    fireEvent.keyUp(getByPlaceholderText('enter input'), {
      key: 'ArrowDown',
    });

    await waitFor(() => {
      expect(getAllByRole('option')[0]).toHaveFocus();
    });

    await waitFor(() => {
      expect(getByRole('listbox')).toBeInTheDocument();
    });

    fireEvent.keyDown(getByRole('listbox'), {
      key: 'ArrowDown',
    });

    await waitFor(() => {
      expect(getAllByRole('option')[1]).toHaveFocus();
    });
  });
});
