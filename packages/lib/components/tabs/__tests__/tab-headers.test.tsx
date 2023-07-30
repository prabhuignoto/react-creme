import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabHeaders } from '../tab-headers';
import { vi, describe, expect, it } from 'vitest';

describe('TabHeaders', () => {
  let handleTabSelection = vi.fn();

  const defaultProps = {
    items: [
      { id: '1', name: 'Tab 1', disabled: false },
      { id: '2', name: 'Tab 2', disabled: false },
    ],
    activeTabId: '1',
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
});
