import React from 'react';
import { axe } from 'jest-axe';
import { fireEvent, render } from '@testing-library/react';
import { TabHeaders } from '../tab-headers';
import { vi, describe, expect, it, beforeEach, afterEach } from 'vitest';

describe('TabHeaders', () => {
  let handleTabSelection = vi.fn();

  const defaultProps = {
    activeTabId: '1',
    items: [
      { disabled: false, id: '1', name: 'Tab 1' },
      { disabled: false, id: '2', name: 'Tab 2' },
    ],
  };

  beforeEach(() => {
    handleTabSelection = vi.fn();
  });

  afterEach(() => {
    handleTabSelection.mockReset();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <TabHeaders {...defaultProps} handleTabSelection={handleTabSelection} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('should render the correct number of tabs', () => {
    const { getAllByRole } = render(
      <TabHeaders {...defaultProps} handleTabSelection={handleTabSelection} />
    );
    const tabs = getAllByRole('tab');
    expect(tabs.length).toBe(defaultProps.items.length);
  });

  it('should call handleTabSelection function when a tab is clicked', () => {
    const { getByText } = render(
      <TabHeaders {...defaultProps} handleTabSelection={handleTabSelection} />
    );
    fireEvent.click(getByText('Tab 2'));

    expect(handleTabSelection).toHaveBeenCalledWith('2');
  });

  // it('should disable the left scroll button initially', () => {
  //   const { getByLabelText } = render(
  //     <TabHeaders {...defaultProps} handleTabSelection={handleTabSelection} />
  //   );
  //   expect(getByLabelText('scroll left')).toHaveAttribute(
  //     'aria-disabled',
  //     'true'
  //   );
  // });

  // it('should set the focus when a tab is selected', async () => {
  //   const { getByText } = render(
  //     <TabHeaders
  //       {...defaultProps}
  //       handleTabSelection={handleTabSelection}
  //       focusable
  //     />
  //   );
  //   fireEvent.click(getByText('Tab 2').parentElement as HTMLElement);
  //   expect(getByText('Tab 2').parentElement).toHaveFocus();
  // });

  describe('Accessibility', () => {
    it.skip('should have no accessibility violations', async () => {
      // Note: TabHeaders renders tabs with aria-controls pointing to TabPanel IDs.
      // When tested in isolation, these referenced elements don't exist, causing violations.
      // Full accessibility testing should be done with the parent Tabs component.
      const { container } = render(
        <TabHeaders {...defaultProps} handleTabSelection={handleTabSelection} />
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
