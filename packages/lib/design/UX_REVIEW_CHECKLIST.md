# UX Design Review Checklist

This document provides a comprehensive checklist for reviewing the UX design, accessibility, and implementation quality of React Creme components. Use this for both existing components and new component development.

**Version:** 1.0.0
**Last Updated:** 2025-10-27

---

## Table of Contents

1. [Accessibility (WCAG 2.1 Level AA)](#1-accessibility-wcag-21-level-aa)
2. [Keyboard Navigation](#2-keyboard-navigation)
3. [Spacing & Layout](#3-spacing--layout)
4. [Visual Design & Feedback](#4-visual-design--feedback)
5. [Design System Integration](#5-design-system-integration)
6. [States & Variants](#6-states--variants)
7. [Performance](#7-performance)
8. [Responsive Design](#8-responsive-design)
9. [Testing Requirements](#9-testing-requirements)
10. [Documentation](#10-documentation)

---

## How to Use This Checklist

- ✅ **Required** - Must be implemented for all components
- ⭐ **Recommended** - Should be implemented when applicable
- 🔍 **Review** - Requires manual verification
- 📝 **Document** - Needs documentation

For each item:
- [ ] Mark incomplete items
- [x] Mark completed items
- Add notes or file references where applicable

---

## 1. Accessibility (WCAG 2.1 Level AA)

### 1.1 Semantic HTML & ARIA

- [ ] ✅ Uses semantic HTML elements where possible
- [ ] ✅ Has proper ARIA roles when semantic HTML isn't sufficient
  - Example: `role="combobox"` for dropdown, `role="listbox"` for list
- [ ] ✅ Includes all required ARIA attributes for the role
  - `aria-label` or `aria-labelledby` for accessible name
  - `aria-describedby` for additional context
  - `aria-expanded`, `aria-haspopup`, `aria-controls` for interactive widgets
- [ ] ✅ ARIA states update dynamically (`aria-expanded`, `aria-selected`, etc.)
- [ ] ✅ `aria-disabled` matches actual disabled state
- [ ] ✅ No conflicting roles or attributes

**Reference:** [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### 1.2 Focus Management

- [ ] ✅ Component is keyboard focusable (tabIndex properly set)
- [ ] ✅ Focus order follows logical reading order
- [ ] ✅ Focus is trapped when appropriate (modals, dialogs)
- [ ] ✅ Focus is restored when closing overlays/modals
- [ ] ✅ Focus indicator is clearly visible
- [ ] ✅ Uses `:focus-visible` for modern browsers
- [ ] ⭐ Custom focus ring matches design system

**React Creme Hook:** `useFocusNew`, `useTrapFocus`

### 1.3 Screen Reader Support

- [ ] ✅ All interactive elements have accessible names
- [ ] ✅ Dynamic content changes are announced (use `aria-live` if needed)
- [ ] ✅ Instructions/hints are associated with form controls
- [ ] ✅ Error messages are announced
- [ ] 🔍 Test with screen reader (NVDA, JAWS, VoiceOver)

### 1.4 Color & Contrast

- [ ] ✅ Text meets 4.5:1 contrast ratio (normal text)
- [ ] ✅ Large text meets 3:1 contrast ratio
- [ ] ✅ Interactive elements meet 3:1 contrast ratio
- [ ] ✅ Focus indicators meet 3:1 contrast ratio
- [ ] ✅ Information not conveyed by color alone

**Tool:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 1.5 Touch Targets

- [ ] ✅ Minimum touch target: 44×44px (WCAG 2.1)
- [ ] ⭐ Recommended: 48×48px for better UX
- [ ] ✅ Adequate spacing between touch targets (8px minimum)

---

## 2. Keyboard Navigation

### 2.1 Standard Keys

- [ ] ✅ **Tab**: Moves focus to next focusable element
- [ ] ✅ **Shift+Tab**: Moves focus to previous element
- [ ] ✅ **Enter**: Activates button/link, submits form
- [ ] ✅ **Space**: Activates button, toggles checkbox
- [ ] ✅ **Escape**: Closes modals, dropdowns, menus

### 2.2 Component-Specific Keys

For lists/menus/dropdowns:
- [ ] ✅ **Arrow Up/Down**: Navigate items vertically
- [ ] ✅ **Home**: Jump to first item
- [ ] ✅ **End**: Jump to last item
- [ ] ⭐ **Page Up/Down**: Jump multiple items (for long lists)

For sliders/carousels:
- [ ] ✅ **Arrow Left/Right**: Navigate horizontally
- [ ] ⭐ **Home/End**: Jump to first/last

For complex widgets:
- [ ] 📝 Document custom keyboard shortcuts
- [ ] ✅ Shortcuts don't conflict with browser/OS shortcuts

**React Creme Hook:** `useKeyNavigation`, `useKey`, `useCloseOnEscape`

### 2.3 Keyboard-Only Operation

- [ ] 🔍 All functionality available via keyboard
- [ ] 🔍 No keyboard traps (can navigate out of component)
- [ ] ✅ Clear visual focus throughout interaction

---

## 3. Spacing & Layout

### 3.1 Design Tokens Usage

- [ ] ✅ Uses spacing tokens from `design/tokens.scss`
  - `$space-1` (0.25rem / 4px)
  - `$space-2` (0.5rem / 8px)
  - `$space-3` (0.75rem / 12px)
  - `$space-4` (1rem / 16px)
  - `$space-5` (1.25rem / 20px)
  - `$space-6` (1.5rem / 24px)
- [ ] ✅ No hardcoded spacing values (avoid `padding: 10px`)
- [ ] ✅ Consistent spacing scale throughout component

### 3.2 Padding & Margins

- [ ] ✅ Adequate internal padding (minimum 8px for touch)
- [ ] ✅ Consistent padding across similar components
- [ ] ✅ Padding scales with size variants (sm, md, lg)
- [ ] 🔍 Padding doesn't make content feel cramped
- [ ] 🔍 Padding provides visual breathing room

**Example (Dropdown):**
```scss
// ❌ Before: Too tight
padding: 0.1rem 0;  // ~1.6px - unusable

// ✅ After: Comfortable
padding: tokens.$space-2 tokens.$space-1;  // 8px 4px
```

### 3.3 Dimensions

- [ ] ✅ Minimum heights accommodate content
- [ ] ✅ Use `min-height` instead of fixed `height` when possible
- [ ] ✅ Width is flexible or has sensible constraints
- [ ] ✅ Content doesn't overflow unexpectedly
- [ ] ⭐ Responsive to parent container size

**Example:**
```scss
// ❌ Inflexible
height: 35px;

// ✅ Flexible
min-height: 40px;
```

### 3.4 Grid & Flexbox

- [ ] ✅ Uses modern layout (Grid/Flexbox over floats)
- [ ] ✅ Proper use of `gap` instead of margin hacks
- [ ] ✅ Flexible columns (`1fr auto`) over fixed pixels
- [ ] ✅ Proper alignment (`align-items`, `justify-content`)

---

## 4. Visual Design & Feedback

### 4.1 Interactive States

- [ ] ✅ **Default**: Clear, usable state
- [ ] ✅ **Hover**: Visual change on mouse over
- [ ] ✅ **Focus**: Clear focus indicator (keyboard users)
- [ ] ✅ **Active/Pressed**: Visual feedback on click/tap
- [ ] ✅ **Disabled**: Visually distinct, cursor not-allowed
- [ ] ⭐ **Loading**: Indicates async operations

**CSS Example:**
```scss
.button {
  // Default state
  background: $primary;

  // Hover state
  &:hover:not(:disabled) {
    background: darken($primary, 10%);
  }

  // Focus state (keyboard)
  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }

  // Active state
  &:active {
    transform: scale(0.98);
  }

  // Disabled state
  &:disabled {
    @extend %disabled;
  }
}
```

### 4.2 Transitions & Animations

- [ ] ✅ Smooth transitions for state changes
- [ ] ✅ Duration: 150-300ms for most interactions
- [ ] ✅ Easing: `ease-in-out` or cubic-bezier for natural feel
- [ ] ⭐ Respects `prefers-reduced-motion` media query
- [ ] ❌ No jarring or excessive animations

**Example:**
```scss
transition: border-color 0.2s ease-in,
            box-shadow 0.2s ease-in;

@media (prefers-reduced-motion: reduce) {
  transition: none;
}
```

### 4.3 Visual Hierarchy

- [ ] ✅ Clear primary action (if applicable)
- [ ] ✅ Secondary actions visually distinct
- [ ] ✅ Dangerous actions use warning colors
- [ ] ✅ Proper font sizes (uses design system scale)
- [ ] ✅ Proper font weights for emphasis

### 4.4 Icons & Graphics

- [ ] ✅ Icons have proper size (not too small or large)
- [ ] ✅ Icon size scales with text size
- [ ] ✅ Icons use design system icon sizes (`%icon-sm`, `%icon-md`, `%icon-lg`)
- [ ] ✅ Icons have accessible labels (aria-label)
- [ ] ✅ Decorative icons have `aria-hidden="true"`

**React Creme:** Icon sizes are `%icon-xs`, `%icon-sm`, `%icon-md`, `%icon-lg`

---

## 5. Design System Integration

### 5.1 Theme Variables

- [ ] ✅ Uses CSS custom properties from theme
  - Colors: `theme.$primary`, `theme.$secondary`, etc.
  - Grays: `theme.$gray-100` through `theme.$gray-900`
- [ ] ✅ Supports dark mode via `isDark()` utility
- [ ] ✅ Works with custom theme colors
- [ ] 🔍 Looks good in both light and dark themes

### 5.2 Typography

- [ ] ✅ Uses font scale from design system
  - `%font-sm`, `%font-md`, `%font-lg`
  - `%text-sm`, `%text-md`, `%text-lg`
- [ ] ✅ Line heights provide readability
- [ ] ✅ Font weights are semantic (normal, medium, bold)

### 5.3 Effects & Utilities

- [ ] ✅ Uses shared mixins (`@include effects.halo()`)
- [ ] ✅ Uses extend patterns (`@extend %border-radius`)
- [ ] ✅ Consistent shadows (`%shadow-small`, `%shadow-medium`, etc.)
- [ ] ✅ Consistent borders (`@extend %border`)

### 5.4 Size Variants

- [ ] ✅ Supports size variants: `sm`, `md`, `lg`
- [ ] ✅ Size variants scale consistently
  - Padding scales proportionally
  - Font size scales appropriately
  - Icon size matches text size
- [ ] ✅ Size prop has sensible default

**Example:**
```scss
$sizes: (sm, md, lg);

@each $size in $sizes {
  .#{$size} {
    .value {
      @extend %text-#{$size};
    }
    .icon {
      @extend %icon-#{$size};
    }
  }
}
```

---

## 6. States & Variants

### 6.1 Component States

- [ ] ✅ **Default**: Initial, uninteracted state
- [ ] ✅ **Loading**: Async operations in progress
- [ ] ✅ **Error**: Invalid input or operation failed
- [ ] ✅ **Success**: Operation completed successfully
- [ ] ✅ **Disabled**: Component cannot be interacted with
- [ ] ✅ **Empty**: No data to display (with helpful message)

### 6.2 Props & Configuration

- [ ] ✅ All props have TypeScript types in `-model.ts`
- [ ] ✅ Props have JSDoc comments
- [ ] ✅ Optional props have sensible defaults
- [ ] ✅ Boolean props default to `false`
- [ ] 📝 Complex props documented with examples

### 6.3 Edge Cases

- [ ] 🔍 Very long text content (overflow handling)
- [ ] 🔍 Very short content (minimum sizes)
- [ ] 🔍 Empty states (no data)
- [ ] 🔍 Single item vs. many items
- [ ] 🔍 Extremely large datasets (virtualization?)
- [ ] 🔍 Rapid state changes (debouncing?)

---

## 7. Performance

### 7.1 React Performance

- [ ] ✅ Uses `React.memo` for expensive components
- [ ] ✅ Callbacks wrapped in `useCallback`
- [ ] ✅ Derived state uses `useMemo`
- [ ] ✅ Avoids unnecessary re-renders
- [ ] ❌ No inline function definitions in JSX (causes re-renders)
- [ ] ❌ No inline object/array literals in JSX

### 7.2 Bundle Size

- [ ] ✅ Tree-shakeable (`sideEffects: false`)
- [ ] ✅ No unnecessary dependencies
- [ ] ✅ Heavy dependencies lazy-loaded when possible

### 7.3 Rendering Performance

- [ ] ⭐ Large lists use virtualization (`virtualized` prop)
- [ ] ⭐ Images/assets lazy-loaded
- [ ] ⭐ Debouncing/throttling for frequent events
- [ ] 🔍 No layout thrashing (check browser devtools)

**React Creme:** Use `List` component's `virtualized` prop for large datasets

---

## 8. Responsive Design

### 8.1 Mobile Support

- [ ] ✅ Touch-friendly (44×44px minimum targets)
- [ ] ✅ Proper spacing for fat fingers
- [ ] ✅ No hover-only interactions
- [ ] 🔍 Works well on small screens (320px width)
- [ ] 🔍 Scrolling works correctly on touch devices

### 8.2 Desktop Support

- [ ] ✅ Full keyboard support
- [ ] ✅ Hover states enhance experience
- [ ] ✅ Works well with mouse
- [ ] 🔍 Comfortable at typical desktop widths

### 8.3 Flexible Sizing

- [ ] ✅ Adapts to container width
- [ ] ⭐ Responsive prop variants (if applicable)
- [ ] ⭐ Media queries for layout changes
- [ ] 🔍 No fixed widths unless absolutely necessary

---

## 9. Testing Requirements

### 9.1 Unit Tests

- [ ] ✅ Test file exists in `__tests__/` directory
- [ ] ✅ Tests rendering with default props
- [ ] ✅ Tests rendering with all prop variations
- [ ] ✅ Tests user interactions (click, type, etc.)
- [ ] ✅ Tests callback props are called correctly
- [ ] ✅ Tests error states

**Framework:** Vitest + React Testing Library

### 9.2 Accessibility Tests

- [ ] ✅ `jest-axe` tests run and pass
- [ ] ✅ Tests ARIA attributes are present
- [ ] ✅ Tests keyboard navigation
- [ ] 🔍 Manual screen reader testing
- [ ] 🔍 Manual keyboard-only testing

**Example:**
```typescript
import { axe } from 'jest-axe';

it('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 9.3 Visual Regression

- [ ] ⭐ Storybook stories exist
- [ ] ⭐ Stories cover all states/variants
- [ ] ⭐ Visual regression tests (if available)

---

## 10. Documentation

### 10.1 Component Documentation

- [ ] 📝 README or docs page exists
- [ ] 📝 Props documented with descriptions
- [ ] 📝 Usage examples provided
- [ ] 📝 Common use cases demonstrated
- [ ] 📝 API reference complete

### 10.2 Code Documentation

- [ ] ✅ TypeScript types in `-model.ts` file
- [ ] ✅ JSDoc comments on public APIs
- [ ] ✅ Complex logic has explanatory comments
- [ ] ✅ Export statements in `react-creme.ts`

### 10.3 Storybook

- [ ] ⭐ Interactive examples in Storybook
- [ ] ⭐ All variants shown
- [ ] ⭐ Controls/knobs for experimentation
- [ ] ⭐ Dark mode toggle available

---

## Industry Standards Comparison

### Compare Against Leading Libraries

Review how similar components work in:

- [ ] 🔍 **Material-UI (MUI)** - Material Design patterns
- [ ] 🔍 **Ant Design** - Enterprise UI patterns
- [ ] 🔍 **Chakra UI** - Accessible component API
- [ ] 🔍 **Headless UI** - Unstyled, accessible primitives
- [ ] 🔍 **React Select** - Best-in-class select/dropdown

### Feature Parity Check

- [ ] 🔍 Loading states
- [ ] 🔍 Error states
- [ ] 🔍 Search/filter (if applicable)
- [ ] 🔍 Multi-selection (if applicable)
- [ ] 🔍 Option groups (if applicable)
- [ ] 🔍 Virtualization for large datasets
- [ ] 🔍 Async data loading
- [ ] 🔍 Customization APIs

---

## Review Checklist Template

Use this template for each component review:

```markdown
# Component Review: [Component Name]

**Date:** YYYY-MM-DD
**Reviewer:** [Name]
**Component Path:** `packages/lib/components/[name]/`

## Summary
[Brief overview of findings]

## Accessibility Score: [X/10]
- [ ] Item 1
- [ ] Item 2
...

## Design System Integration Score: [X/10]
- [ ] Item 1
- [ ] Item 2
...

## UX Quality Score: [X/10]
- [ ] Item 1
- [ ] Item 2
...

## Critical Issues
1. [Issue description] - File: [path:line]
2. ...

## High Priority Improvements
1. [Improvement description]
2. ...

## Nice-to-Have Enhancements
1. [Enhancement description]
2. ...

## Action Items
- [ ] [Task 1] - Assignee: [Name]
- [ ] [Task 2] - Assignee: [Name]
```

---

## Quick Reference: Common Issues

### 🚨 Critical Issues (Fix Immediately)

1. **Missing ARIA attributes** - Breaks screen readers
2. **No keyboard accessibility** - Excludes keyboard-only users
3. **Poor color contrast** - Violates WCAG
4. **Touch targets < 44px** - Unusable on mobile
5. **Focus traps** - Users can't navigate out

### ⚠️ High Priority (Fix Soon)

1. **Hardcoded spacing** - Inconsistent with design system
2. **Missing hover/focus states** - Poor visual feedback
3. **Fixed dimensions** - Doesn't adapt to content
4. **No error states** - Poor UX for invalid inputs
5. **Icons too small/large** - Poor visual hierarchy

### 📋 Medium Priority (Improve When Possible)

1. **Missing size variants** - Limited flexibility
2. **No dark mode support** - Theme inconsistency
3. **No RTL support** - Excludes RTL language users
4. **Inconsistent transitions** - Janky animations
5. **Missing documentation** - Hard for developers to use

---

## Tools & Resources

### Testing Tools
- **axe DevTools** - Browser extension for accessibility testing
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Automated audits (Chrome DevTools)
- **React DevTools** - Performance profiling

### Design Tools
- **Figma/Sketch** - Design mockups
- **Contrast Checker** - WCAG contrast verification
- **Color Blindness Simulator** - Test for color accessibility

### Documentation
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [Material Design Guidelines](https://m3.material.io/)

---

## Maintenance

This checklist should be:
- ✅ Updated when new patterns emerge
- ✅ Reviewed quarterly for relevance
- ✅ Referenced in PR reviews
- ✅ Used for onboarding new contributors

**Last Review:** 2025-10-27
**Next Review:** 2026-01-27

---

## Credits

Based on the comprehensive UX review of the Dropdown component (October 2025), incorporating best practices from:
- WCAG 2.1 Level AA Guidelines
- WAI-ARIA Authoring Practices
- React Creme Design System
- Industry-leading component libraries (MUI, Ant Design, Chakra UI, Headless UI)
