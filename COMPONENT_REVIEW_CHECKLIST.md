# Component Review Checklist

> Comprehensive guidelines for reviewing and refactoring React Creme components
> Based on breadcrumb and dialog component analysis (January 2025)

## Overview

This document provides a systematic approach to reviewing components for:
- React best practices and performance
- Design system consistency
- Accessibility (WCAG AA compliance)
- User experience and developer experience
- TypeScript type safety
- Test coverage
- SCSS/CSS quality

---

## 1. React Best Practices & Performance

### 1.1 Hooks - useMemo Dependencies
- [ ] All `useMemo` hooks have complete dependency arrays
- [ ] No stale closures (all used variables in deps)
- [ ] Expensive computations are properly memoized

**Common Issues:**
```typescript
// ❌ BAD: Missing dependencies
const dialogClass = useMemo(
  () => classNames(styles.dialog, { [styles.dark]: isDarkMode }),
  [isClosing, size] // Missing: isDarkMode, animationType
);

// ✅ GOOD: Complete dependencies
const dialogClass = useMemo(
  () => classNames(styles.dialog, { [styles.dark]: isDarkMode }),
  [isClosing, size, isDarkMode, animationType]
);
```

### 1.2 Hooks - useCallback
- [ ] Event handlers are wrapped in `useCallback`
- [ ] Callbacks passed to child components are memoized
- [ ] Dependency arrays are complete

**Common Issues:**
```typescript
// ❌ BAD: Not memoized
const handleClick = () => {
  onClose?.();
};

// ✅ GOOD: Memoized with dependencies
const handleClick = useCallback(() => {
  onClose?.();
}, [onClose]);
```

### 1.3 Props-to-State Anti-Pattern
- [ ] Component doesn't copy props to state without synchronization
- [ ] Derived state uses `useMemo` instead of `useState`
- [ ] `useEffect` isn't used to sync props to state

**Common Issues:**
```typescript
// ❌ BAD: Props-to-state anti-pattern
const [items, setItems] = useState(
  links.map((link) => ({ name: link }))
);
// Never updates when links prop changes!

// ✅ GOOD: Derived state
const items = useMemo(
  () => links.map((link) => ({ name: link })),
  [links]
);
```

### 1.4 Ref Usage
- [ ] No imperative ref mutations (use `useMemo` instead)
- [ ] Refs for DOM references only
- [ ] `useRef` used for stable values that don't trigger re-renders
- [ ] Lazy initialization for expensive values

**Common Issues:**
```typescript
// ❌ BAD: Imperative mutation
const focusProps = useRef({});
focusProps.current = { tabIndex: 0 }; // Mutating!

// ✅ GOOD: useMemo
const focusProps = useMemo(
  () => ({ tabIndex: 0 }),
  []
);

// ❌ BAD: nanoid called every render
const id = useRef(`rc-dialog-${nanoid()}`);

// ✅ GOOD: Lazy initialization
const id = useRef<string>();
if (!id.current) {
  id.current = `rc-dialog-${nanoid()}`;
}
```

### 1.5 Unnecessary Re-renders
- [ ] Component wrapped in `React.memo` if appropriate
- [ ] Expensive computations are memoized
- [ ] Functions called once, not on every render

**Common Issues:**
```typescript
// ❌ BAD: Called on every render
const isDarkMode = useMemo(() => isDark(), []);

// ✅ GOOD: Called once
const isDarkMode = isDark();
```

### 1.6 Unused Code
- [ ] No unused props
- [ ] No unused refs
- [ ] No unused variables
- [ ] All imports are used

---

## 2. Design System Integration

### 2.1 Spacing Tokens
- [ ] No hard-coded spacing values (rem, px)
- [ ] Uses `tokens.$space-*` variables
- [ ] Consistent spacing scale

**Token Reference:**
```scss
$space-0: 0;       // 0
$space-1: 0.25rem; // 4px
$space-2: 0.5rem;  // 8px
$space-3: 0.75rem; // 12px
$space-4: 1rem;    // 16px
$space-5: 1.25rem; // 20px
$space-6: 1.5rem;  // 24px
```

**Common Issues:**
```scss
// ❌ BAD: Hard-coded values
.header {
  margin: 0.25rem 0;
  padding-left: 1rem;
}

// ✅ GOOD: Design tokens
@use '@design/tokens.scss';

.header {
  margin: tokens.$space-1 0;
  padding-left: tokens.$space-4;
}
```

### 2.2 Typography
- [ ] Uses font placeholders (`%font-sm`, `%font-md`, `%font-lg`)
- [ ] No hard-coded font sizes
- [ ] Proper heading hierarchy

**Common Issues:**
```scss
// ❌ BAD: Hard-coded font size
.title {
  font-size: 1rem;
}

// ✅ GOOD: Design system placeholder
.title {
  @extend %font-md;
}
```

### 2.3 Layout Patterns
- [ ] Uses design system placeholders for common layouts
- [ ] Proper flexbox patterns (`%left`, `%center`, `%right`, `%col`)
- [ ] Uses list patterns for lists (`%list-horizontal-left-wrap`)

**Common Patterns:**
```scss
// Horizontal list (like breadcrumbs, tabs, pin)
.wrapper {
  @extend %list-horizontal-left-wrap;
}

// List items with inline flex
.item {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  flex-wrap: nowrap;

  &:not(:first-child) {
    margin-left: $spacing;
  }
}
```

### 2.4 Colors & Themes
- [ ] Uses theme variables (`theme.$primary`, `theme.$white`, etc.)
- [ ] Supports dark mode with `.dark` classes
- [ ] No hard-coded color values

### 2.5 Border Radius, Shadows, Borders
- [ ] Uses placeholders: `%border-radius`, `%shadow-inset`, `%border`
- [ ] No hard-coded values

---

## 3. Accessibility (WCAG AA)

### 3.1 ARIA Attributes
- [ ] Proper `role` attributes
- [ ] `aria-label` or `aria-labelledby` for all interactive elements
- [ ] `aria-describedby` for additional descriptions
- [ ] `aria-modal="true"` for modals/dialogs
- [ ] `aria-current` for current/active items
- [ ] `aria-hidden="true"` for decorative elements

**Common Issues:**
```tsx
// ❌ BAD: Missing ARIA attributes
<div role="dialog">
  <h2>{title}</h2>
  <section>{children}</section>
</div>

// ✅ GOOD: Complete ARIA
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby={titleId}
  aria-describedby={bodyId}
>
  <h2 id={titleId}>{title}</h2>
  <section id={bodyId}>{children}</section>
</div>
```

### 3.2 Semantic HTML
- [ ] Uses semantic elements (`<nav>`, `<button>`, `<header>`, `<footer>`)
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Lists use `<ul>/<ol>` and `<li>`
- [ ] Interactive elements are `<button>` or `<a>`

### 3.3 Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Proper `tabIndex` usage
- [ ] Arrow key navigation for appropriate components
- [ ] `Home`/`End` keys for navigation
- [ ] `Escape` key to close modals/overlays
- [ ] Focus trapping in modals
- [ ] No keyboard traps

**Common Patterns:**
```typescript
// Create reusable keyboard navigation hooks
export function useHorizontalKeyboard<T extends HTMLElement>(
  ref: RefObject<T | null>,
  itemCount: number,
  currentIndex: number,
  onNavigate: (index: number) => void,
  enabled = true,
  rtl = false
) {
  // Handle ArrowLeft, ArrowRight, Home, End
}
```

### 3.4 Focus Management
- [ ] Visible focus indicators
- [ ] Focus order is logical
- [ ] First focusable element receives focus on open (modals)
- [ ] Focus returns to trigger on close (modals)

### 3.5 Screen Reader Support
- [ ] Meaningful labels for all controls
- [ ] State changes are announced
- [ ] Error messages are associated with inputs
- [ ] No `aria-hidden` on focusable elements

### 3.6 Accessibility Testing
- [ ] Component passes `axe` accessibility tests
- [ ] Manual keyboard navigation tested
- [ ] Screen reader tested (if critical component)

```typescript
it('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 4. User Experience & Developer Experience

### 4.1 Customization
- [ ] Configurable labels (no hard-coded text)
- [ ] Optional sections can be hidden
- [ ] Flexible styling options (size, variant, color)
- [ ] Optional callback props

**Common Issues:**
```typescript
// ❌ BAD: Hard-coded, inflexible
<Button label="okay" onClick={handleSuccess} />
<Button label="cancel" onClick={handleClose} />

// ✅ GOOD: Customizable
<Button
  label={primaryButtonLabel}
  onClick={handlePrimaryClick}
/>
<Button
  label={secondaryButtonLabel}
  onClick={handleSecondaryClick}
/>
```

### 4.2 Required vs Optional Props
- [ ] Required props are actually required
- [ ] Optional props have sensible defaults
- [ ] TypeScript types reflect requirements

**Common Issues:**
```typescript
// ❌ BAD: Title should be required for accessibility
interface DialogProps {
  title?: string;
}

// ✅ GOOD: Required with proper type
interface DialogProps {
  title: string; // Required for accessibility
}
```

### 4.3 Prop Naming
- [ ] Clear, descriptive names
- [ ] Consistent with other components
- [ ] Boolean props prefixed with `is`, `has`, `show`, etc.
- [ ] Callback props prefixed with `on`

### 4.4 Backward Compatibility
- [ ] Breaking changes are avoided
- [ ] Deprecated props marked with `@deprecated`
- [ ] Deprecated props still work (with fallback)

```typescript
export interface DialogProps {
  // New prop
  onPrimaryClick?: () => void;

  // @deprecated Use onPrimaryClick instead
  onSuccess?: () => void;
}

// Implementation supports both
const handlePrimaryClick = useCallback(() => {
  onPrimaryClick?.();
  onSuccess?.(); // Backward compatibility
  onClose?.();
}, [onPrimaryClick, onSuccess, onClose]);
```

### 4.5 Mobile/Responsive Support
- [ ] Component works on mobile devices
- [ ] Touch-friendly targets (min 44x44px)
- [ ] Responsive breakpoints in SCSS
- [ ] Handles overflow gracefully

---

## 5. TypeScript Type Safety

### 5.1 Props Interface
- [ ] All props have explicit types
- [ ] JSDoc comments for complex props
- [ ] Union types for variants
- [ ] Optional props marked with `?`

**Example:**
```typescript
export interface ComponentProps {
  // Size variant
  size?: 'sm' | 'md' | 'lg';

  // Callback executed on close
  onClose?: () => void;

  // React node content
  children?: React.ReactNode;

  // Required title for accessibility
  title: string;
}
```

### 5.2 No `any` Types
- [ ] No `any` types (use `unknown` if needed)
- [ ] Proper generic types for flexible components
- [ ] Type guards for runtime checks

### 5.3 Strict Null Checks
- [ ] Handle `null` and `undefined` properly
- [ ] Optional chaining (`?.`) for optional props
- [ ] Nullish coalescing (`??`) for defaults

### 5.4 Ref Types
- [ ] Correct ref types for forwarded refs
- [ ] Nullable refs: `RefObject<T | null>`

---

## 6. Testing

### 6.1 Test Coverage
- [ ] All major features tested
- [ ] Edge cases covered
- [ ] Error states tested
- [ ] Accessibility tested

**Minimum Test Categories:**
1. **Rendering**: Basic rendering, props, variants
2. **Interaction**: Clicks, keyboard, focus
3. **Accessibility**: ARIA, keyboard nav, axe tests
4. **Edge Cases**: Empty data, long content, special characters
5. **Callbacks**: All event handlers
6. **Snapshots**: Default and all variants

### 6.2 Test Quality
- [ ] Tests are readable and maintainable
- [ ] Tests use proper roles/labels (not test IDs)
- [ ] Tests wait for async operations
- [ ] No flaky tests

**Example Test Structure:**
```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    it('should render with basic props', () => {});
    it('should render all sizes', () => {});
    it('should handle empty state', () => {});
  });

  describe('Interaction', () => {
    it('should call onClick when clicked', () => {});
    it('should handle keyboard navigation', () => {});
  });

  describe('Accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<Component />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long text', () => {});
  });
});
```

### 6.3 Test Count Guidelines
- Simple components: 10-15 tests
- Complex components: 20-30 tests
- Components with keyboard nav: +5-10 tests
- Components with animations: +3-5 tests

---

## 7. SCSS/CSS Quality

### 7.1 Design System Usage
- [ ] Imports from `@design/*`
- [ ] Uses `@extend` for placeholders
- [ ] Uses tokens for spacing, colors, typography
- [ ] No direct `@use 'sass:*'` unless necessary

**Required Imports:**
```scss
@use '@design/core.scss';
@use '@design/theme.scss';
@use '@design/tokens.scss';
// Component-specific:
@use '@design/list.scss';
@use '@design/button.scss';
// etc.
```

### 7.2 Class Naming
- [ ] BEM-like naming (within modules)
- [ ] Descriptive class names
- [ ] Consistent naming across components
- [ ] No generic names (`container`, `wrapper` → use specific names)

### 7.3 SCSS Best Practices
- [ ] Variables declared before extends
- [ ] Extends before properties
- [ ] Properties before nested rules
- [ ] No `@extend` inside media queries
- [ ] Use variables for repeated values

**Modern Sass Ordering:**
```scss
.component {
  // 1. Variables
  $local-spacing: 0.5rem;

  // 2. Extends
  @extend %flex;
  @extend %border-radius;

  // 3. Properties
  display: block;
  padding: $local-spacing;

  // 4. Nested selectors
  &:hover {
    opacity: 0.8;
  }

  // 5. Media queries
  @media (max-width: 640px) {
    padding: tokens.$space-1;
  }
}
```

### 7.4 Responsive Design
- [ ] Mobile-first approach (when appropriate)
- [ ] Breakpoint consistency
- [ ] No fixed pixel widths (use max-width, min-width)
- [ ] Test at common breakpoints: 320px, 640px, 768px, 1024px

### 7.5 Unused Styles
- [ ] No unused classes
- [ ] No commented-out code
- [ ] Remove old/deprecated styles

---

## 8. Component-Specific Patterns

### 8.1 List Components (Breadcrumb, Tabs, Pin, Tags, etc.)
- [ ] Use `%list-horizontal-left-wrap` for wrapper
- [ ] Items use inline flex with `flex-wrap: nowrap`
- [ ] Proper spacing with `:not(:first-child)`
- [ ] Keyboard navigation (ArrowLeft, ArrowRight, Home, End)
- [ ] RTL support

### 8.2 Modal/Overlay Components (Dialog, Drawer, Modal, etc.)
- [ ] Uses `withOverlay` HOC
- [ ] `aria-modal="true"`
- [ ] Focus trapping
- [ ] Escape key to close
- [ ] Return focus on close
- [ ] Body scroll locking

### 8.3 Form Components (Input, Select, Checkbox, etc.)
- [ ] Label association
- [ ] Error state handling
- [ ] Disabled state
- [ ] Required indicator
- [ ] Validation support

### 8.4 Interactive Components (Button, Link, etc.)
- [ ] Proper roles
- [ ] Keyboard support
- [ ] Disabled state
- [ ] Loading state
- [ ] Focus indicators

---

## 9. Common Issues Checklist

### React Issues
- [ ] ❌ Props-to-state anti-pattern
- [ ] ❌ Missing useMemo/useCallback dependencies
- [ ] ❌ Imperative ref mutations
- [ ] ❌ Functions called on every render
- [ ] ❌ Unused refs, props, or variables
- [ ] ❌ Memory leaks in effects

### Design System Issues
- [ ] ❌ Hard-coded spacing (0.25rem, 1rem, etc.)
- [ ] ❌ Hard-coded font sizes
- [ ] ❌ Not using placeholders (%font-*, %border-radius, etc.)
- [ ] ❌ Inconsistent spacing scale
- [ ] ❌ Unused CSS classes

### Accessibility Issues
- [ ] ❌ Missing ARIA attributes
- [ ] ❌ Non-semantic HTML
- [ ] ❌ Missing keyboard navigation
- [ ] ❌ Missing focus management
- [ ] ❌ No aria-current on active items
- [ ] ❌ Decorative elements not hidden (aria-hidden)

### UX/DX Issues
- [ ] ❌ Hard-coded labels
- [ ] ❌ No customization options
- [ ] ❌ Optional props should be required (e.g., title)
- [ ] ❌ No mobile/responsive support

### Testing Issues
- [ ] ❌ Insufficient test coverage (<20 tests for complex components)
- [ ] ❌ No accessibility tests
- [ ] ❌ No keyboard navigation tests
- [ ] ❌ Missing edge case tests

### TypeScript Issues
- [ ] ❌ Using `any` types
- [ ] ❌ Incorrect ref types
- [ ] ❌ Missing prop types
- [ ] ❌ Loose type definitions

---

## 10. Review Process

### Step 1: Initial Analysis
1. Read component implementation
2. Read TypeScript model
3. Read SCSS
4. Read tests
5. Identify issues using checklist

### Step 2: Plan Refactoring
1. Group issues by category
2. Prioritize: Critical → Important → Nice-to-have
3. Identify breaking changes
4. Create task list

### Step 3: Implementation
1. Fix React performance issues first
2. Integrate design system
3. Add accessibility features
4. Enhance UX/DX
5. Update TypeScript types
6. Write/update tests
7. Update SCSS

### Step 4: Verification
1. Run tests: `pnpm test <component> --run`
2. Run build: `pnpm build`
3. Check for TypeScript errors
4. Manual testing (keyboard, screen reader)
5. Visual regression testing

### Step 5: Documentation
1. Update component JSDoc comments
2. Add migration guide if breaking changes
3. Update Storybook examples

---

## 11. Quick Reference

### Breadcrumb Component Example
**Issues Found:** 8 major issues
- Props-to-state anti-pattern
- Missing aria-current
- No keyboard navigation
- Missing design system patterns
- Stale useMemo dependencies

**Result:** 29 tests, all passing, fully accessible

### Dialog Component Example
**Issues Found:** 10 major issues
- Stale closures in useMemo
- Imperative ref mutation
- Hard-coded spacing
- Missing aria-modal, aria-describedby
- Hard-coded button labels

**Result:** 23 tests, all passing, enhanced UX

---

## 12. Tools & Resources

### Testing
- `@testing-library/react` - Component testing
- `@testing-library/user-event` - User interaction simulation
- `jest-axe` / `vitest-axe` - Accessibility testing
- `vitest` - Test runner

### Linting
- `oxlint` - Fast Rust-based linter
- `eslint` - JavaScript/TypeScript linting
- `stylelint` - SCSS/CSS linting

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [React Hooks Documentation](https://react.dev/reference/react)

---

## Appendix: Before/After Examples

### Example 1: Props-to-State
```typescript
// ❌ BEFORE
const [items, setItems] = useState(
  links.map((link, index) => ({
    id: nanoid(),
    name: link,
    selected: selectedCrumbIndex === index,
  }))
);
// Never updates when props change!

// ✅ AFTER
const items = useMemo(
  () =>
    links.map((link, index) => ({
      id: nanoid(),
      name: link,
      selected: currentIndex === index,
    })),
  [links, currentIndex]
);
```

### Example 2: Design System Integration
```scss
// ❌ BEFORE
.header {
  margin: 0.25rem 0;
}

.footer {
  margin-bottom: 1rem;
  margin-right: 2rem;
}

// ✅ AFTER
@use '@design/tokens.scss';

.header {
  margin: tokens.$space-1 0;
}

.footer {
  margin-bottom: tokens.$space-4;
  margin-right: tokens.$space-6;
}
```

### Example 3: Accessibility
```tsx
// ❌ BEFORE
<div role="dialog">
  <h2>{title}</h2>
  <div>{children}</div>
</div>

// ✅ AFTER
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby={titleId}
  aria-describedby={bodyId}
>
  <h2 id={titleId}>{title}</h2>
  <section id={bodyId}>{children}</section>
</div>
```

---

**Document Version:** 1.0
**Last Updated:** January 2025
**Based On:** Breadcrumb & Dialog component refactoring
