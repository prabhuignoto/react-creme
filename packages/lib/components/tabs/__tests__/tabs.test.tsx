import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Tabs } from '../tabs';

describe('Tabs', () => {
  it('should render tabs', () => {
    const { getByRole } = render(
      <Tabs labels={['one', 'two', 'three']}>
        <span>one content</span>
        <span>two content</span>
        <span>three content</span>
      </Tabs>
    );

    expect(getByRole('tablist')).toBeInTheDocument();
  });

  it('should render tab content on selection', async () => {
    const { getByText } = render(
      <Tabs labels={['one', 'two', 'three']}>
        <span>one content</span>
        <span>two content</span>
        <span>three content</span>
      </Tabs>
    );

    expect(getByText('one content')).toBeInTheDocument();

    fireEvent.click(getByText('two'));

    await waitFor(async () => {
      expect(getByText('two')).toBeInTheDocument();
    });
  });

  it('should render snapshot', () => {
    const { getByRole } = render(
      <Tabs labels={['one', 'two', 'three']}>
        <span>one content</span>
        <span>two content</span>
        <span>three content</span>
      </Tabs>
    );

    expect(getByRole('tablist')).toMatchSnapshot();
  });

  it('should render a specific tab on load', () => {
    const { getByText, queryByText } = render(
      <Tabs labels={['one', 'two', 'three']} activeTab="two">
        <span>one content</span>
        <span>two content</span>
        <span>three content</span>
      </Tabs>
    );

    expect(getByText('two content')).toBeInTheDocument();
    expect(queryByText('three content')).not.toBeInTheDocument();
  });
});
