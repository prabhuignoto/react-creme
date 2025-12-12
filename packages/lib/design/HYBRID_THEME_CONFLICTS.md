# Hybrid Theme Conflicts Analysis

**Date:** 2024  
**Status:** Pending Resolution  
**Files Analyzed:** `hybrid-theme.scss`, `tokens.scss`, `theme.scss`, `shadow.scss`

---

## Summary

Analysis of `hybrid-theme.scss` reveals **one direct conflict** with existing theme tokens and **one area of overlap** that should be addressed for consistency.

---

## 🔴 Direct Conflicts

### 1. Border Radius Variables (Duplicate Definitions)

**Conflict:** Both `tokens.scss` and `hybrid-theme.scss` define the same border radius variables.

#### `tokens.scss` (lines 30-32)
```scss
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
```

#### `hybrid-theme.scss` (lines 44-56)
```scss
$radius-xs: 2px;
$radius-sm: 4px;    // ⚠️ Duplicate
$radius-md: 8px;    // ⚠️ Duplicate
$radius-lg: 12px;   // ⚠️ Duplicate
$radius-xl: 16px;
```

**Current Usage:**
- Components use namespaced imports: `hybrid.$radius-*` or `tokens.$radius-*`
- No runtime conflicts due to namespacing
- Creates maintenance burden (two sources of truth)

**Impact:** ⚠️ **Medium** - Functional but creates duplication

**Recommendation:**
1. **Option A (Preferred):** Remove radius variables from `hybrid-theme.scss` and reference `tokens.scss`:
   ```scss
   @use 'tokens.scss' as tokens;
   
   $radius-xs: 2px;  // New, only in hybrid-theme
   $radius-sm: tokens.$radius-sm;
   $radius-md: tokens.$radius-md;
   $radius-lg: tokens.$radius-lg;
   $radius-xl: 16px;  // New, only in hybrid-theme
   ```

2. **Option B:** Remove from `tokens.scss` and consolidate in `hybrid-theme.scss` (if hybrid-theme becomes primary)

3. **Option C:** Keep both but document that `tokens.scss` is the source of truth for base tokens

---

## 🟡 Areas of Overlap (No Direct Conflict)

### 2. Shadow System (Different Purposes)

**Overlap:** Both files define shadow systems, but serve different purposes.

#### `shadow.scss`
- **Purpose:** Theme-aware inset shadows and mixins
- **Features:**
  - Inset shadows (`%shadow-inset`, `%shadow-inset-small`, `%shadow-inset-xs`)
  - Dark mode aware
  - Uses theme colors (`theme.$secondary-rgb`, `theme.$raisin-black`)
  - Mixins: `@mixin shadow-inset`, `@mixin shadow-inset-small`, etc.

#### `hybrid-theme.scss` (lines 90-120)
- **Purpose:** Color-agnostic outset shadow patterns
- **Features:**
  - Outset shadows (`$shadow-soft`, `$shadow-medium`, `$shadow-strong`)
  - Uses standard black with opacity (color-agnostic)
  - Mixin: `@mixin drop-shadow-refined()`

**Impact:** ✅ **Low** - Different purposes, no conflict

**Recommendation:** Keep both systems. Consider documenting their distinct use cases:
- Use `shadow.scss` for theme-aware inset shadows
- Use `hybrid-theme.scss` for color-agnostic outset elevation shadows

---

## ✅ No Conflicts

### 3. Animation Durations
- **Status:** Only defined in `hybrid-theme.scss`
- **Variables:** `$animation-duration-instant`, `$animation-duration-secondary`, `$animation-duration-primary`, `$animation-duration-critical`, `$animation-duration-elaborate`
- **No conflicts found**

### 4. Color System
- **Status:** No overlap
- **`theme.scss`:** Runtime-customizable colors via CSS custom properties
- **`hybrid-theme.scss`:** Color-agnostic (as documented in comments)
- **No conflicts found**

### 5. Spacing Scale
- **Status:** Only defined in `tokens.scss`
- **Variables:** `$space-0` through `$space-6`
- **No conflicts found**

---

## Component Usage Patterns

### Current Import Patterns

Most components import both files:
```scss
@use '@design/theme.scss';
@use '@design/tokens.scss';
@use '@design/hybrid-theme.scss' as hybrid;
```

### Radius Variable Usage

**Using `hybrid.$radius-*`:**
- `accordion-header.module.scss`
- `scroll-spy.module.scss`
- `input.module.scss`
- `dialog.module.scss`
- `tabs/tab-header.module.scss`
- `button.module.scss`
- `notification.module.scss`
- `breadcrumb.module.scss`
- `drawer.module.scss`
- `slider.module.scss`
- `switch.module.scss`
- `checkbox.module.scss`
- `menu.module.scss`
- `tooltip.module.scss`
- And more...

**Using `tokens.$radius-*`:**
- `pin.module.scss` (only one found)

**Finding:** Components heavily favor `hybrid.$radius-*` over `tokens.$radius-*`

---

## Action Items

- [ ] **Decide on border radius consolidation strategy** (Option A, B, or C)
- [ ] **Refactor `hybrid-theme.scss`** to remove duplicate radius definitions
- [ ] **Update component imports** if consolidation changes namespacing
- [ ] **Document shadow system usage** in design system docs
- [ ] **Verify no build-time conflicts** after refactoring

---

## Notes

- All conflicts are **compile-time only** (Sass variables)
- No runtime conflicts due to proper namespacing
- Current system is functional but not optimal for maintenance
- `hybrid-theme.scss` appears to be the preferred source for radius values in new components

---

## Related Files

- `packages/lib/design/tokens.scss` - Base design tokens
- `packages/lib/design/theme.scss` - Runtime theme colors
- `packages/lib/design/hybrid-theme.scss` - Hybrid theme system
- `packages/lib/design/shadow.scss` - Shadow utilities
- `packages/lib/design/DESIGN_SYSTEM.md` - Design system documentation
