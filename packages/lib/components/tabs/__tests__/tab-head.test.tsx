/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';
import { TabHead } from '../tab-head';
import { TabHeadProps } from '../tabs-model';
import { vi } from 'vitest';

describe('TabHead', () => {
  let handleTabSelection = vi.fn();
  let onFocus = vi.fn();

  const defaultProps: Partial<TabHeadProps> = {
    disabled: false,
    focusable: true,
    icon: null,
    id: '1',
    name: 'Test Tab',
    parentHasFocus: false,
    selected: false,
    size: 'md',
    tabStyle: 'flat',
  };

  beforeEach(() => {
    handleTabSelection = vi.fn();
    onFocus = vi.fn();
  });

  afterEach(() => {
    handleTabSelection.mockReset();
    onFocus.mockReset();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <TabHead {...defaultProps} handleTabSelection={handleTabSelection} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('should have the appropriate ARIA roles and properties', () => {
    const { getByRole } = render(
      <TabHead {...defaultProps} handleTabSelection={handleTabSelection} />
    );
    const tabHead = getByRole('tab');
    expect(tabHead).toHaveAttribute(
      'aria-selected',
      `${defaultProps.selected}`
    );
    expect(tabHead).toHaveAttribute(
      'aria-controls',
      `rc-tab-panel-${defaultProps.id}`
    );
    expect(tabHead).toHaveAttribute('id', `rc-tab-${defaultProps.id}`);
  });

  it('should call handleTabSelection when clicked and not disabled', async () => {
    const { getByRole } = render(
      <TabHead {...defaultProps} handleTabSelection={handleTabSelection} />
    );
    fireEvent.click(getByRole('tab'));
    expect(handleTabSelection).toHaveBeenCalledWith('1');
  });

  it('should not call handleTabSelection when clicked and disabled', () => {
    const { getByRole } = render(
      <TabHead
        {...defaultProps}
        disabled
        handleTabSelection={handleTabSelection}
      />
    );
    fireEvent.click(getByRole('tab'));
    expect(handleTabSelection).not.toHaveBeenCalled();
  });

  it('should call onFocus when focusable, not selected, and parent does not have focus', () => {
    const { getByRole } = render(
      <TabHead
        {...defaultProps}
        handleTabSelection={handleTabSelection}
        onFocus={onFocus}
      />
    );
    fireEvent.focus(getByRole('tab'));
    expect(onFocus).toHaveBeenCalled();
  });

  it('should not call onFocus when parent has focus', () => {
    const { getByRole } = render(
      <TabHead
        {...defaultProps}
        parentHasFocus
        handleTabSelection={handleTabSelection}
        onFocus={onFocus}
      />
    );
    fireEvent.focus(getByRole('tab'));
    expect(onFocus).not.toHaveBeenCalled();
  });

  it('should render the icon if it is provided', () => {
    const icon = <svg />;
    const { getByLabelText } = render(
      <TabHead
        {...defaultProps}
        icon={icon}
        handleTabSelection={handleTabSelection}
      />
    );
    expect(getByLabelText('tab-icon')).toBeTruthy();
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<TabHead />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
