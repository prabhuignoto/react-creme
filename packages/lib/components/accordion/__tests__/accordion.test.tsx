import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Accordion } from '../accordion';

describe('Accordion', () => {
  it('should render accordion', () => {
    const { container } = render(
      <Accordion>
        <p>this is a test</p>
      </Accordion>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('rc-accordion');
  });

  it('should render snapshot', () => {
    const { container } = render(
      <Accordion>
        <p>this is a test</p>
      </Accordion>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should toggle content', async () => {
    const { getByRole, container } = render(
      <Accordion>
        <p>this is a test</p>
      </Accordion>
    );

    await act(async () => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(async () => {
      expect(container.firstChild).toHaveClass('rc-accordion-open');
    });
  });

  it('should call onExpanded', () => {
    const onExpanded = jest.fn();

    const { getByRole } = render(
      <Accordion onExpanded={onExpanded}>
        <p>this is a test</p>
      </Accordion>
    );

    fireEvent.click(getByRole('button'));

    expect(onExpanded).toHaveBeenCalled();
  });
});
