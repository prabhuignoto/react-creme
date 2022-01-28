import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { BreadCrumb } from '../breadcrumb';


describe('Breadcrumb', () => {
  it('should render', () => {
    const { getByRole, getAllByRole, getByText } = render(
      <BreadCrumb>
        <span>google</span>
        <span>yahoo</span>
        <span>amazon</span>
      </BreadCrumb>
    );
    
    expect(getByRole('navigation')).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(3);
    
    expect(getByText('google')).toBeInTheDocument();
    expect(getByText('yahoo')).toBeInTheDocument();
  });
  
  it('should onClick is called', () => {
    const handler = vi.fn();
    const { getByText } = render(
      <BreadCrumb onSelected={handler}>
        <span>google</span>
        <span>yahoo</span>
        <span>amazon</span>
      </BreadCrumb>
    );

    expect(getByText('google')).toBeInTheDocument();
    fireEvent.click(getByText('google'));

    expect(handler).toBeCalledWith(0);
  });

  it('should render snapshot', () => {
    const { getByRole } = render(
      <BreadCrumb>
        <span>google</span>
        <span>yahoo</span>
        <span>amazon</span>
      </BreadCrumb>
    );

    expect(getByRole('navigation')).toMatchSnapshot();
  });
});
