# Dropdown Component - Keyboard Accessibility Review

**Date**: 2025-11-13
**Component**: Dropdown (`packages/lib/components/dropdown/`)
**Review Scope**: Keyboard navigation and ARIA accessibility compliance

---

## Executive Summary

The Dropdown component has a solid foundation for keyboard accessibility with working arrow key navigation, Enter key selection, and basic ARIA attributes. However, several important accessibility issues need to be addressed to meet WCAG 2.1 Level AA standards and provide a complete keyboard-only experience.

**Overall Assessment**: 🟡 Moderate - Core functionality works but needs improvements

---

## ✅ What's Working Well

### 1. Arrow Key Navigation (list-items.tsx, useKeyNavigation.ts)
- **Implementation**: `useKeyNavigation` hook handles ArrowUp/ArrowDown keys
- **Location**: `packages/lib/components/common/effects/useKeyNavigation.ts:26-42`
- **Behavior**:
  - Arrow keys navigate through visible options
  - Wraps from last to first (and vice versa)
  - Automatically scrolls list as needed
- ✅ **Status**: Working correctly

### 2. Enter Key Selection (list-item.tsx)
- **Implementation**: List items respond to Enter key
- **Location**: `packages/lib/components/list/list-item.tsx:64-68`
- **Behavior**: Pressing Enter on focused item triggers selection
- ✅ **Status**: Working correctly

### 3. Space/Enter to Open Dropdown (dropdown-value.tsx, useFocusNew.ts)
- **Implementation**: `useFocusNew` hook handles Space and Enter keys
- **Location**: `packages/lib/components/common/effects/useFocusNew.ts:38-44`
- **Behavior**: Both Space and Enter keys toggle dropdown open/closed
- ✅ **Status**: Working correctly

### 4. Escape Key to Close (overlay.tsx)
- **Implementation**: Overlay component handles Escape key
- **Location**: `packages/lib/components/common/overlay.tsx:121-125`
- **Behavior**: Escape key closes the dropdown menu
- ✅ **Status**: Implemented

### 5. Focus Management on Open (dropdown.tsx)
- **Implementation**: Automatically focuses first non-disabled option when opening
- **Location**: `packages/lib/components/dropdown/dropdown.tsx:125-133`
- ✅ **Status**: Working correctly

### 6. Basic ARIA Attributes
- `role="listbox"` on list container (list-items.tsx:95)
- `role="option"` on list items (list-item.tsx:91)
- `aria-checked` for selection state (list-item.tsx:75)
- `aria-disabled` for disabled state (list-item.tsx:76, dropdown-value.tsx:100)
- `aria-label` on listbox (list-items.tsx:96)
- ✅ **Status**: Present

### 7. TabIndex Management
- Disabled dropdown gets `tabIndex="-1"` (dropdown-value.tsx:99)
- Enabled dropdown gets `tabIndex="0"` (dropdown-value.tsx:99)
- ✅ **Status**: Working correctly

### 8. Visual Focus Indicators
- Custom focus ring implementation via `useFocusNew` hook
- **Location**: `packages/lib/components/common/effects/useFocusNew.ts`
- ✅ **Status**: Implemented

---

## ❌ Critical Issues

### 1. Incorrect aria-label on Chevron Icon
**Priority**: 🔴 High
**Location**: `packages/lib/components/dropdown/dropdown-value.tsx:137`

**Current Code**:
```tsx
<span
  className={rcDropdownIconClass}
  role="img"
  aria-label="clear selection"  // ❌ WRONG
  data-testid="chevron-icon"
>
```

**Issue**: The chevron icon has `aria-label="clear selection"` which is incorrect and confusing for screen reader users.

**Fix**: Should be `aria-label="toggle dropdown"` or similar, or this span should not have role="img" at all since it's decorative.

---

### 2. Missing aria-expanded Attribute
**Priority**: 🔴 High
**Location**: `packages/lib/components/dropdown/dropdown-value.tsx:95-101`

**Current Code**:
```tsx
<div
  className={rcDropdownValueClass}
  ref={containerRef}
  onClick={onToggle}
  tabIndex={!disabled && focusable ? 0 : -1}
  aria-disabled={disabled}
  // ❌ MISSING: aria-expanded
>
```

**Issue**: Screen readers cannot determine whether the dropdown menu is open or closed.

**Fix**: Add `aria-expanded={showMenu}` attribute to the dropdown trigger element.

**Reference**: [ARIA: combobox role - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role)

---

### 3. Missing aria-haspopup Attribute
**Priority**: 🔴 High
**Location**: `packages/lib/components/dropdown/dropdown-value.tsx:95-101`

**Issue**: Screen readers are not informed that this element triggers a popup listbox.

**Fix**: Add `aria-haspopup="listbox"` attribute to the dropdown trigger element.

---

### 4. Clear Button Lacks Keyboard Support
**Priority**: 🔴 High
**Location**: `packages/lib/components/dropdown/dropdown-value.tsx:123-132`

**Current Code**:
```tsx
<span
  className={rcDropdownClearClass}
  role="button"
  data-testid="clear-icon"
  aria-label="clear selection"
  style={iconStyle}
  onClick={onClear}  // ❌ Only mouse support
>
```

**Issues**:
1. No keyboard event handlers (Enter/Space keys)
2. No `tabIndex` attribute (not keyboard focusable)
3. Cannot be accessed by keyboard-only users

**Fix**:
```tsx
<span
  className={rcDropdownClearClass}
  role="button"
  data-testid="clear-icon"
  aria-label="clear selection"
  style={iconStyle}
  onClick={onClear}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClear(e as any);
    }
  }}
  tabIndex={!canHideClearButton ? 0 : -1}
>
```

---

### 5. Escape Key May Not Work Reliably
**Priority**: 🟡 Medium
**Location**: `packages/lib/components/common/overlay.tsx:231`

**Current Code**:
```tsx
<div
  className={overlayWrapperClass}
  onClick={handleCloseOnClick}
  onKeyUp={handleClose}  // ⚠️ May not receive events when focus is on list items
>
```

**Issue**: The `onKeyUp` handler is on the overlay wrapper, but when focus is on list items inside, the event might not bubble properly or the overlay element might not have focus.

**Fix**: Consider adding Escape key handler directly to the listbox element or ensure the overlay wrapper can receive keyboard events.

---

## ⚠️ Important Improvements Needed

### 6. Missing Home/End Key Support
**Priority**: 🟡 Medium
**Location**: `packages/lib/components/common/effects/useKeyNavigation.ts:23-45`

**Current Implementation**: Only handles ArrowUp and ArrowDown

**Issue**: Users cannot quickly jump to the first or last item in long lists.

**Fix**: Add Home/End key handlers:
```typescript
if (e.key === 'Home') {
  e.preventDefault();
  setSelection(0);
} else if (e.key === 'End') {
  e.preventDefault();
  setSelection(collectionLength - 1);
}
```

**Reference**: [ARIA Authoring Practices Guide - Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

---

### 7. No aria-activedescendant Pattern
**Priority**: 🟡 Medium
**Location**: `packages/lib/components/dropdown/dropdown-value.tsx`

**Issue**: When using arrow keys to navigate options, the dropdown trigger should have `aria-activedescendant` pointing to the currently focused option's ID.

**Current Pattern**: Each list item receives actual focus (moving focus pattern)

**Alternative Pattern**: Keep focus on trigger and use `aria-activedescendant` (recommended for some AT)

**Note**: The current "moving focus" pattern is acceptable, but `aria-activedescendant` pattern is preferred by some screen reader users. Consider making this configurable or test with actual screen readers.

**Reference**: [Managing Focus in Composites](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_vs_selection)

---

### 8. Tab Key Behavior Not Defined
**Priority**: 🟡 Medium
**Location**: Multiple files

**Issue**: When the dropdown menu is open, Tab key behavior is not explicitly handled:
- Should Tab close the dropdown?
- Should Tab cycle through menu items?
- Should Tab move to the next focusable element outside the dropdown?

**Expected Behavior** (per ARIA APG):
- Tab should close the dropdown and move focus to the next focusable element
- Shift+Tab should close the dropdown and move focus to the previous focusable element
- Navigation within the dropdown should use arrow keys only

**Fix**: Add Tab key handlers to close the menu and allow default Tab behavior.

---

### 9. Focus Trap Missing
**Priority**: 🟡 Medium
**Location**: Dropdown menu overlay

**Issue**: When menu is open with search enabled, Tab key can move focus outside the dropdown, which can be confusing.

**Expected Behavior**: When search is enabled, Tab should move between search input and list, then wrap back to search.

**Fix**: Implement a focus trap that cycles between:
1. Search input (if enabled)
2. List items
3. Clear button (if visible)
4. Back to search input

---

### 10. Multi-Selection Tags Not Keyboard Accessible
**Priority**: 🟡 Medium
**Location**: `packages/lib/components/dropdown/dropdown-value.tsx:104-115`

**Current Code**:
```tsx
<Tags
  items={selectedValue}
  readonly
  size={size}
  tagStyle="fill"
  tagWidth={60}
  RTL={RTL}
  wrap={false}
  tagHeight={18}
/>
```

**Issue**: When multiple items are selected and displayed as tags, keyboard users cannot:
- Navigate between individual tags
- Remove specific tags using keyboard
- Understand which tags are present without opening the dropdown

**Fix**:
- Make tags keyboard focusable
- Add keyboard handlers (Delete/Backspace) to remove tags
- Add proper ARIA labels for each tag

---

## 🔍 Minor Issues

### 11. Commented Test Suggests Known Issues
**Priority**: 🟢 Low
**Location**: `packages/lib/components/dropdown/__tests__/dropdown.test.tsx:208-248`

**Issue**: There's a commented-out test for keyboard interaction:
```typescript
// it('should focus change on keyboard interaction', async () => {
```

**Recommendation**: Either fix and uncomment this test, or remove it entirely. Commented tests suggest incomplete features.

---

### 12. Search Input Focus Management
**Priority**: 🟢 Low
**Location**: `packages/lib/components/list/list.tsx:178-194`

**Issue**: When search is enabled and menu opens, focus goes to first list item, not the search input.

**Expected Behavior**: Debatable - some users expect search to be focused, others expect list to be focused.

**Recommendation**: Consider making this configurable via a prop like `autoFocusSearch`.

---

### 13. Role Attribute on Dropdown Container
**Priority**: 🟢 Low
**Location**: `packages/lib/components/dropdown/dropdown-value.tsx:95`

**Issue**: The dropdown trigger div doesn't have a role attribute.

**Recommendation**: Consider adding `role="combobox"` or `role="button"` depending on whether search is enabled.

**Note**: The dropdown with search enabled should use `role="combobox"`, without search can use `role="button"`.

---

## 📋 Testing Recommendations

### Manual Testing Checklist

Test with keyboard only (no mouse):

- [ ] Tab to dropdown trigger, verify visible focus indicator
- [ ] Press Enter/Space, verify menu opens
- [ ] Verify focus moves to first enabled option
- [ ] Use ArrowDown to move through options
- [ ] Use ArrowUp to move back through options
- [ ] Verify wrapping from last to first item
- [ ] Press Home key (after implementing), verify focus moves to first item
- [ ] Press End key (after implementing), verify focus moves to last item
- [ ] Press Enter on an option, verify selection and menu closes
- [ ] Press Escape, verify menu closes
- [ ] Tab to clear button, press Enter/Space (after implementing fix)
- [ ] Test with search enabled, verify focus management
- [ ] Test multi-selection mode, verify tag keyboard access (after implementing)

### Screen Reader Testing

Test with popular screen readers:

- [ ] **NVDA + Firefox** (Windows)
  - Verify dropdown role announced correctly
  - Verify expanded/collapsed state announced
  - Verify selected options announced
  - Verify option count announced

- [ ] **JAWS + Chrome** (Windows)
  - Same tests as NVDA

- [ ] **VoiceOver + Safari** (macOS)
  - Same tests as NVDA

- [ ] **TalkBack + Chrome** (Android)
  - Test touch and keyboard navigation

### Automated Testing

Add tests for:

```typescript
// Test keyboard navigation
it('should navigate options with arrow keys', async () => {
  // Test ArrowDown moves focus to next item
  // Test ArrowUp moves focus to previous item
  // Test wrapping behavior
});

it('should support Home/End keys', async () => {
  // Test Home key moves to first item
  // Test End key moves to last item
});

it('should handle Tab key appropriately', async () => {
  // Test Tab closes menu and moves focus outside
});

it('should make clear button keyboard accessible', async () => {
  // Test Enter key activates clear button
  // Test Space key activates clear button
});

it('should announce state changes to screen readers', async () => {
  // Test aria-expanded changes
  // Test aria-activedescendant updates
});
```

---

## 📚 References

1. [ARIA Authoring Practices Guide - Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
2. [ARIA Authoring Practices Guide - Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
3. [WCAG 2.1 - Guideline 2.1 Keyboard Accessible](https://www.w3.org/WAI/WCAG21/Understanding/keyboard-accessible)
4. [WebAIM - Keyboard Accessibility](https://webaim.org/techniques/keyboard/)

---

## 📊 Priority Summary

| Priority | Count | Issues |
|----------|-------|--------|
| 🔴 High | 5 | Incorrect aria-label, Missing aria-expanded, Missing aria-haspopup, Clear button keyboard support, Escape key reliability |
| 🟡 Medium | 5 | Home/End keys, aria-activedescendant, Tab behavior, Focus trap, Multi-select tags |
| 🟢 Low | 3 | Commented test, Search focus, Role attribute |

---

## 🎯 Recommended Action Plan

### Phase 1: Critical Fixes (1-2 days)
1. Fix incorrect aria-label on chevron icon
2. Add aria-expanded attribute
3. Add aria-haspopup="listbox" attribute
4. Implement keyboard support for clear button
5. Verify/fix Escape key handling

### Phase 2: Important Improvements (2-3 days)
6. Add Home/End key support
7. Define and implement Tab key behavior
8. Implement focus trap for search-enabled dropdown
9. Make multi-selection tags keyboard accessible

### Phase 3: Polish (1 day)
10. Review and fix/remove commented test
11. Add comprehensive keyboard interaction tests
12. Perform screen reader testing
13. Update documentation with keyboard shortcuts

---

## 📝 Conclusion

The Dropdown component has a solid foundation for keyboard accessibility, with working arrow key navigation, Enter key selection, and basic ARIA support. However, to be fully accessible and meet WCAG 2.1 Level AA standards, the critical issues (especially ARIA attributes and clear button keyboard support) must be addressed.

The most impactful fixes that will benefit the most users:
1. Adding aria-expanded and aria-haspopup
2. Making the clear button keyboard accessible
3. Adding Home/End key support
4. Properly handling Tab key behavior

These improvements will significantly enhance the experience for keyboard-only users and screen reader users.
