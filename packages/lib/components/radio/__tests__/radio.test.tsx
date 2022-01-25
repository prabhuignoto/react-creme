import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { Radio } from '../radio';

const onChange = vi.fn();

describe('Radio', () => {
  it('should render the radio component', () => {
    const { getByRole, getByText } = render(<Radio label="my-label" />);

    expect(getByRole('radio')).toBeInTheDocument();
    expect(getByText('my-label')).toBeInTheDocument();
  });

  it('should call the handler on selection', () => {
    const { getByRole } = render(
      <Radio label="my-label" onChange={onChange} id="123" />
    );

    fireEvent.click(getByRole('radio'));

    expect(onChange).toBeCalledWith({ id: '123', selected: true });
  });
});
