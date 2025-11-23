# UX Quick Reference Checklist

**Use this for quick PR reviews and rapid assessments.**
For comprehensive reviews, see [UX_REVIEW_CHECKLIST.md](./UX_REVIEW_CHECKLIST.md)

---

## 🚨 Critical (Must Have)

### Accessibility
- [ ] Proper ARIA roles and attributes
- [ ] Keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Focus visible and managed correctly
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] Color contrast ≥ 4.5:1 for text

### Spacing
- [ ] Uses design tokens (not hardcoded values)
- [ ] Minimum padding: 8px (`tokens.$space-2`)
- [ ] Touch targets: ≥ 44×44px
- [ ] Proper `gap` in Grid/Flexbox

### States
- [ ] Default, Hover, Focus, Active, Disabled
- [ ] Smooth transitions (200-300ms)
- [ ] Clear visual feedback

---

## ⚠️ High Priority (Should Have)

### Design System
- [ ] Uses theme colors (`theme.$primary`, etc.)
- [ ] Consistent with other components
- [ ] Size variants work (`sm`, `md`, `lg`)
- [ ] Dark mode supported

### UX Polish
- [ ] No hardcoded dimensions (use `min-height`)
- [ ] Content doesn't overflow
- [ ] Icons properly sized
- [ ] Error states handled

---

## ⭐ Nice to Have

- [ ] RTL support
- [ ] Loading states
- [ ] Virtualization (for large lists)
- [ ] PageUp/PageDown support
- [ ] `prefers-reduced-motion` respected

---

## 🧪 Testing

- [ ] `jest-axe` tests pass
- [ ] User interaction tests
- [ ] All prop variants tested
- [ ] Edge cases covered

---

## 📝 Documentation

- [ ] Props documented with JSDoc
- [ ] TypeScript types in `-model.ts`
- [ ] Exported in `react-creme.ts`
- [ ] Storybook examples (if applicable)

---

## Common Anti-Patterns to Avoid

❌ **Don't:**
- `padding: 10px` → Use `tokens.$space-*`
- `height: 35px` → Use `min-height: 40px`
- `grid-template-columns: calc(100% - 4rem) 2rem 2rem` → Use `1fr auto auto` with gap
- Inline functions in JSX → Wrap in `useCallback`
- Missing hover states
- Padding on icons (halo mixin handles it)
- Fixed widths everywhere

✅ **Do:**
- Use design tokens consistently
- Flexible dimensions (`min-height`, `1fr`)
- Clear focus indicators
- Proper ARIA attributes
- Test with keyboard only
- Test with screen reader

---

## Quick Keyboard Test

1. **Tab** through component - All interactive elements reachable?
2. **Enter/Space** - Activates buttons/toggles?
3. **Arrows** - Navigates lists/menus?
4. **Escape** - Closes overlays?
5. **Home/End** - Jumps to start/end?

---

## Quick Visual Test

1. **Hover** - Visual feedback?
2. **Focus** - Clear indicator?
3. **Click** - Active state?
4. **Disabled** - Grayed out with not-allowed cursor?
5. **Dark mode** - Still readable?

---

## Quick Code Review Checklist

```tsx
// ✅ Good Example
interface ButtonProps {
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

const Button = ({ size = 'md', disabled = false, onClick }: ButtonProps) => {
  const handleClick = useCallback(() => {
    if (!disabled) onClick?.();
  }, [disabled, onClick]);

  return (
    <button
      className={styles[size]}
      disabled={disabled}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      Click me
    </button>
  );
};
```

```scss
// ✅ Good Styles
.button {
  // Use design tokens
  padding: tokens.$space-2 tokens.$space-4;

  // Flexible sizing
  min-height: 40px;

  // Smooth transitions
  transition: background-color 0.2s ease-in;

  // All states
  &:hover:not(:disabled) {
    background: darken($primary, 10%);
  }

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }

  &:disabled {
    @extend %disabled;
  }
}
```

---

## Score Your Component

**Accessibility:** ___/10
**Design System:** ___/10
**UX Quality:** ___/10
**Performance:** ___/10

**Total:** ___/40

- **35-40:** Excellent ✨
- **30-34:** Good ✅
- **25-29:** Needs work ⚠️
- **<25:** Requires significant improvements 🚨

---

## When to Use Full Checklist

Use [UX_REVIEW_CHECKLIST.md](./UX_REVIEW_CHECKLIST.md) for:
- New component development
- Major refactoring
- Quarterly audits
- Accessibility audits
- Pre-release reviews

---

**Last Updated:** 2025-10-27
