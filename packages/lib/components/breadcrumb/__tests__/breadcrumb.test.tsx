import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { BreadCrumb } from '../breadcrumb';

describe('Breadcrumb', () => {
  it('should render', async () => {
    const { getByRole, getAllByRole, getByText } = render(
      <BreadCrumb links={['google', 'yahoo', 'amazon']}></BreadCrumb>
    );
    await waitFor(() => {
      expect(getByRole('navigation')).toBeInTheDocument();
      // expect(getAllByRole('button')).toHaveLength(3);

      expect(getByText('google')).toBeInTheDocument();
      expect(getByText('yahoo')).toBeInTheDocument();
    });
  });

  it('should handler is called', () => {
    const handler = vi.fn();
    const { getByText } = render(
      <BreadCrumb
        onSelected={handler}
        links={['google', 'yahoo', 'amazon']}
      ></BreadCrumb>
    );

    expect(getByText('google')).toBeInTheDocument();
    fireEvent.click(getByText('google'));

    expect(handler).toBeCalledWith('google');
  });

  it('should render snapshot', () => {
    const { getByRole } = render(
      <BreadCrumb links={['google', 'yahoo', 'amazon']}></BreadCrumb>
    );

    expect(getByRole('navigation')).toMatchSnapshot();
  });
});
