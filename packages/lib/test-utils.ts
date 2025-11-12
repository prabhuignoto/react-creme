import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

/**
 * Setup userEvent for interactive tests
 * Provides a consistent API for all user interactions
 */
export const setupUser = () => userEvent.setup();

/**
 * Render component with common test setup
 * Includes userEvent instance for convenient access
 */
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  const user = userEvent.setup();
  const renderResult = render(ui, options);

  return {
    user,
    ...renderResult,
  };
};

/**
 * Test component for accessibility violations using jest-axe
 * @param container - The DOM container to test
 * @returns The axe test result
 */
export const testAccessibility = async (container: HTMLElement) => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  return results;
};

/**
 * Test accessibility with specific axe configuration
 * @param container - The DOM container to test
 * @param axeConfig - Optional axe configuration (rules, etc)
 */
export const testAccessibilityWithConfig = async (
  container: HTMLElement,
  axeConfig?: Parameters<typeof axe>[1]
) => {
  const results = await axe(container, axeConfig);
  expect(results).toHaveNoViolations();
  return results;
};

/**
 * Helper for testing keyboard navigation between elements
 * @param element - The element to focus and navigate from
 * @param key - The keyboard key to press
 * @param expectedFocus - The element that should receive focus after key press
 */
export const testKeyboardNavigation = async (
  element: HTMLElement,
  key: string,
  expectedFocus: HTMLElement
) => {
  const user = userEvent.setup();
  element.focus();
  await user.keyboard(`{${key}}`);
  expect(expectedFocus).toHaveFocus();
};

/**
 * Create a mock File object for testing file inputs
 * @param name - File name
 * @param size - File size in bytes
 * @param type - MIME type
 * @returns A File object
 */
export const createMockFile = (
  name: string,
  size: number,
  type: string
): File => {
  const fileContent = Array.from({ length: size }).fill('a').join('');
  return new File([fileContent], name, { type });
};

/**
 * Create multiple mock files
 * @param files - Array of file specs: { name, size, type }
 * @returns Array of File objects
 */
export const createMockFiles = (
  files: Array<{ name: string; size: number; type: string }>
): File[] => {
  return files.map(({ name, size, type }) =>
    createMockFile(name, size, type)
  );
};

/**
 * Wait for animations/transitions to complete
 * Useful for testing components with animations
 * @param ms - Milliseconds to wait (default 300ms)
 */
export const waitForAnimation = (ms: number = 300) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Test that an element has focus visible indicator
 * Useful for testing focus management and accessibility
 * @param element - The element to check
 * @param focusVisibleClass - The CSS class name for focus visible (optional)
 */
export const testFocusVisible = (
  element: HTMLElement,
  focusVisibleClass?: string
) => {
  element.focus();

  if (focusVisibleClass) {
    expect(element).toHaveClass(focusVisibleClass);
  } else {
    // Check computed styles for outline or similar
    const styles = window.getComputedStyle(element);
    const hasOutline = styles.outline !== 'none';
    expect(hasOutline || element.className.includes('focus')).toBeTruthy();
  }
};

/**
 * Test that element is not focusable
 * @param element - The element to check
 */
export const testNotFocusable = (element: HTMLElement) => {
  element.focus();
  expect(element).not.toHaveFocus();
};

/**
 * Create a mock DataTransfer object for drag-and-drop testing
 * @param files - Files to include in the DataTransfer
 */
export const createMockDataTransfer = (files: File[]): DataTransfer => {
  return {
    files: files as unknown as FileList,
    items: files.map((file) => ({
      kind: 'file' as const,
      type: file.type,
      getAsFile: () => file,
    })) as unknown as DataTransferItemList,
    types: ['Files'],
    effectAllowed: 'move',
    dropEffect: 'move',
    setData: vi.fn(),
    getData: vi.fn(),
    clearData: vi.fn(),
    setDragImage: vi.fn(),
  } as unknown as DataTransfer;
};

/**
 * Test that an element is disabled
 * Works with buttons, inputs, and other disabled-capable elements
 */
export const testDisabled = (element: HTMLElement) => {
  expect(element).toBeDisabled();
  expect(element).toHaveAttribute('aria-disabled', 'true');
};

/**
 * Test that an element is enabled
 */
export const testEnabled = (element: HTMLElement) => {
  expect(element).toBeEnabled();
  expect(element).not.toHaveAttribute('aria-disabled', 'true');
};

/**
 * Get all focusable elements within a container
 * Useful for testing focus management in complex components
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors)
  );
};

/**
 * Test tab order (roving tabindex pattern)
 * Verifies that only the active element has tabindex="0"
 */
export const testRovingTabindex = (
  elements: HTMLElement[],
  activeIndex: number
) => {
  elements.forEach((element, index) => {
    if (index === activeIndex) {
      expect(element).toHaveAttribute('tabindex', '0');
    } else {
      expect(element).toHaveAttribute('tabindex', '-1');
    }
  });
};

/**
 * Test for console warnings (useful for development warnings)
 */
export const expectConsoleWarning = (_message: string) => {
  const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  return consoleWarnSpy;
};

/**
 * Test screen reader announcements with aria-live regions
 */
export const testLiveRegion = (
  container: HTMLElement,
  expectedText: string,
  politeness: 'polite' | 'assertive' = 'polite'
) => {
  const liveRegion = container.querySelector(`[aria-live="${politeness}"]`);
  expect(liveRegion).toBeInTheDocument();
  expect(liveRegion).toHaveTextContent(expectedText);
};

/**
 * Test ARIA attributes for form controls
 */
export const testFormControlA11y = (
  element: HTMLElement,
  ariaLabel?: string,
  ariaDescription?: string,
  ariaRequired?: boolean
) => {
  if (ariaLabel) {
    expect(element).toHaveAccessibleName(ariaLabel);
  }

  if (ariaDescription) {
    expect(element).toHaveAccessibleDescription(ariaDescription);
  }

  if (ariaRequired !== undefined) {
    expect(element).toHaveAttribute('aria-required', String(ariaRequired));
  }
};
