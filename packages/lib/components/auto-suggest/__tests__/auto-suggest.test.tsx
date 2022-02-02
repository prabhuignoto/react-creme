import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';
import { AutoSuggest } from '../auto-suggest';

const suggestions = ['one', 'two', 'three', 'four', 'five'].map(item => ({
  name: item,
  value: item,
}));

describe('AutoSuggest', () => {
  it('should render Auto Suggest', () => {
    const { getByTestId } = render(<AutoSuggest suggestions={suggestions} />);
    expect(getByTestId('rc-auto-suggest')).toBeInTheDocument();
  });

  it('should render Auto Suggest with placeholder', () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <AutoSuggest suggestions={suggestions} placeholder="placeholder" />
    );
    expect(getByTestId('rc-auto-suggest')).toBeInTheDocument();
    expect(getByPlaceholderText('placeholder')).toBeInTheDocument();
  });

  it('should render suggestions', async () => {
    const { queryByRole, getByPlaceholderText, getAllByRole, getByTestId } =
      render(
        <AutoSuggest suggestions={suggestions} placeholder="enter input" />
      );

    expect(getByPlaceholderText('enter input')).toBeInTheDocument();

    userEvent.type(getByPlaceholderText('enter input'), 'one');

    await waitFor(
      () => {
        expect(getByTestId('rc-overlay')).toBeInTheDocument();
        expect(getByTestId('rc-overlay').querySelectorAll('li')).toHaveLength(
          1
        );
      },
      {
        timeout: 1000,
      }
    );
  });

  it('should show the selected item', async () => {
    const { getByRole, getByPlaceholderText, getByText, getByTestId } = render(
      <AutoSuggest suggestions={suggestions} placeholder="enter input" />
    );

    userEvent.type(getByPlaceholderText('enter input'), 'o');

    await waitFor(() => {
      expect(getByTestId('rc-overlay')).toBeInTheDocument();
    });

    userEvent.click(getByTestId('rc-overlay').querySelectorAll('li')[0]);

    await waitFor(() => {
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
});
