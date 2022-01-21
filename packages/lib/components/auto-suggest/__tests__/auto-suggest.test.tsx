import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { AutoSuggest } from '../auto-suggest';

const suggestions = ['one', 'two', 'three', 'four', 'five'].map((item) => ({
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
    const { getByRole, getByPlaceholderText, getAllByRole } = render(
      <AutoSuggest suggestions={suggestions} placeholder="enter input" />
    );

    userEvent.type(getByPlaceholderText('enter input'), 'o');

    await waitFor(() => {
      expect(getByRole('listbox')).toBeInTheDocument();
      expect(getAllByRole('option')).toHaveLength(1);
    });
  });

  it('should show the selected item', async () => {
    const { getByRole, getByPlaceholderText, getByText } = render(
      <AutoSuggest suggestions={suggestions} placeholder="enter input" />
    );

    userEvent.type(getByPlaceholderText('enter input'), 'o');

    await waitFor(() => {
      expect(getByRole('listbox')).toBeInTheDocument();
      expect(getByText('one')).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(getByText('one'));
    });
    expect(getByPlaceholderText('enter input')).toHaveValue('one');
  });

  it('should call onChange with the input', async () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <AutoSuggest
        suggestions={suggestions}
        placeholder="enter input"
        onChange={onChange}
      />
    );

    userEvent.type(getByPlaceholderText('enter input'), 'open');

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('open');
    });
  });
});
