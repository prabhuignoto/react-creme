# React Creme Design System

**Version:** 2025
**Last Updated:** January 2025

This document serves as the comprehensive guide to React Creme's design system. It defines all design tokens, utilities, patterns, and best practices for building consistent, accessible, and themeable components.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Design Tokens](#design-tokens)
3. [Theme System](#theme-system)
4. [Core Layout Utilities](#core-layout-utilities)
5. [Typography & Font System](#typography--font-system)
6. [Icon System](#icon-system)
7. [Animation System](#animation-system)
8. [Effects & Transitions](#effects--transitions)
9. [Borders](#borders)
10. [Shadows](#shadows)
11. [Button Utilities](#button-utilities)
12. [Positioning](#positioning)
13. [List Utilities](#list-utilities)
14. [Utility Functions](#utility-functions)
15. [Usage Patterns & Best Practices](#usage-patterns--best-practices)
16. [Sass Best Practices](#sass-best-practices)
17. [Contributing Guidelines](#contributing-guidelines)

---

## 📋 UX Review & Quality Assurance

Before building or modifying components, consult these UX guidelines:

- **[UX Review Checklist](./UX_REVIEW_CHECKLIST.md)** - Comprehensive checklist covering accessibility, spacing, keyboard navigation, visual design, and testing requirements. Use this for thorough component audits.

- **[UX Quick Checklist](./UX_QUICK_CHECKLIST.md)** - Condensed version for rapid PR reviews and daily use. Covers critical accessibility, spacing, and design system integration.

**When to use:**
- **Quick Checklist:** PR reviews, minor updates, daily development
- **Full Checklist:** New components, major refactoring, quarterly audits, accessibility reviews

---

## Architecture Overview

The design system is organized into modular SCSS files, each serving a specific purpose. All files follow modern Sass conventions and use the `@use` module system (not `@import`).

### File Structure

```
design/
├── core.scss          # Core flexbox and layout placeholders
├── theme.scss         # Theme colors (hex & rgb)
├── tokens.scss        # Design tokens (base values)
├── animate.scss       # Animation mixins and keyframes
├── animations.scss    # Pre-built animation definitions
├── effects.scss       # Visual effects (halo, transitions)
├── border.scss        # Border utilities and placeholders
├── shadow.scss        # Shadow utilities (inset, outset)
├── button.scss        # Button-specific utilities
├── font.scss          # Font size utilities
├── icon.scss          # Icon size utilities
├── list.scss          # List layout utilities
├── position.scss      # Absolute positioning mixin
└── util.scss          # General utility functions
```

### Import Order

Components should import design files in this recommended order:

```scss
@use '@design/theme.scss';      // Theme variables (colors)
@use '@design/tokens.scss';     // Design tokens
@use '@design/core.scss';       // Core layout utilities
@use '@design/animate.scss';    // Animation utilities (if needed)
@use '@design/effects.scss';    // Effects (if needed)
@use 'sass:map';                // Sass built-in modules
```

**Path Alias:** Use `@design` to reference the design folder (configured in Vite).

---

## Design Tokens

**File:** `tokens.scss`

Design tokens provide a single source of truth for base values. These are intentionally minimal and serve as foundation primitives.

### Colors

```scss
$color-primary: #4f46e5;              // indigo-600
$color-primary-contrast: #ffffff;      // White
$color-surface: #ffffff;               // Surface background
$color-surface-contrast: #111827;      // Text on surface (gray-900)
$color-border: #e5e7eb;                // Border color (gray-200)
```

### Typography

```scss
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, Helvetica, Arial, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;

$font-size-base: 16px;
$line-height-base: 1.5;
```

### Spacing Scale

```scss
$space-0: 0;
$space-1: 0.25rem;  // 4px
$space-2: 0.5rem;   // 8px
$space-3: 0.75rem;  // 12px
$space-4: 1rem;     // 16px
$space-5: 1.25rem;  // 20px
$space-6: 1.5rem;   // 24px
```

### Border Radius

```scss
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
```

**Usage Note:** These are base tokens. Most components use the theme system (below) which provides CSS custom properties for runtime theming.

---

## Theme System

**File:** `theme.scss`

The theme system provides runtime-customizable colors via CSS custom properties. It supports both light and dark modes.

### Primary Colors

Available in both **hex** and **rgb** formats:

```scss
// Hex format (for solid colors)
$primary: var(--rc-primary-color-hex);
$primary-light: var(--rc-primary-light-color-hex, #f0f0f0);
$secondary: var(--rc-secondary-color-hex);
$tertiary: var(--rc-tertiary-color-hex);
$text-color: var(--rc-text-color-hex);
$text-color-on-selection: var(--rc-textSelection-color-hex);

// RGB format (for rgba transparency)
$primary-rgb: var(--rc-primary-color-rgb);
$secondary-rgb: var(--rc-secondary-color-rgb);
$tertiary-rgb: var(--rc-tertiary-color-rgb);
$text-color-rgb: var(--rc-text-color-rgb);
$text-color-on-selection-rgb: var(--rc-textSelection-color-rgb);
```

### Dark Mode Colors

```scss
// Hex format
$dark-input-bg: var(--rc-darkInputBg-color-hex);
$dark-input-color: var(--rc-darkInputColor-color-hex);
$dark-hover: var(--rc-darkHover-color-hex);
$dark-control-bg: var(--rc-darkControlBg-color-hex);
$dark-control-border-hex: var(--rc-darkControlBorder-color-hex);
$dark-active-selection: var(--rc-darkActiveSelection-color-hex);

// RGB format
$dark-input-bg-rgb: var(--rc-darkInput-bg-color-rgb);
$dark-input-color-rgb: var(--rc-darkInput-color-color-rgb);
$dark-hover-rgb: var(--rc-darkHover-color-rgb);
$dark-control-bg-rgb: var(--rc-darkControlBg-color-rgb);
$dark-control-border-rgb: var(--rc-darkControlBorder-color-rgb);
$dark-active-selection-rgb: var(--rc-darkActiveSelection-color-rgb);
```

### Gray Scale

Static grays (not themeable):

```scss
$gray-100: #f8f9fa;  // Lightest
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;  // Mid-tone
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;  // Darkest
```

### Semantic Colors

```scss
$white: #fff;
$black: #000;
$crimson: #e32636;        // Error/Danger
$success-green: #4bb543;  // Success
$amber: #ffc107;          // Warning
$blue: #2196f3;           // Info
```

### Dark Mode Neutrals

```scss
$cod-gray: #1e1e1e;
$raisin-black: #1f2022;
$gunmetal-gray: #2b2b2b;
$jet-black: #343434;
$matte-black: #28282b;
$licorice: #191919;
$chinese-black: #171717;
$charcoal-gray: #4a4a4a;
$steel-gray: #71797e;
```

### Light Mode Neutrals

```scss
$light-bg: #f6f6f6;
$light-gray: #f7f7f7;
$snow-white: #f3f6fb;
$alto: #dbdbdb;
$mercury: #e5e5e5;
$platinum: #e5e4e2;
$chinese-gray: #ccc;
```

### Dark Mode Detection

```scss
$dark-mode: var(--rc-dark-mode);  // CSS custom property for dark mode state
```

**Usage:**

```scss
.component {
  &.dark {
    background: theme.$dark-control-bg;
    color: theme.$dark-input-color;
  }

  &:not(.dark) {
    background: theme.$white;
    color: theme.$text-color;
  }
}
```

**Why RGB and Hex?**

- **Hex:** For solid colors (`color: theme.$primary`)
- **RGB:** For transparency (`background: rgba(theme.$primary-rgb, 0.5)`)

---

## Core Layout Utilities

**File:** `core.scss`

### Flexbox Placeholders

#### Basic Flex Containers

```scss
%flex           // display: flex; align-items: center
%col            // flex + flex-direction: column
%col-left       // flex column + align-items: flex-start
%col-right      // flex column + align-items: flex-end
```

#### Horizontal Alignment

```scss
%left           // flex + justify-content: flex-start
%right          // flex + justify-content: flex-end
%center         // flex + justify-content: center
%top-center     // flex + align-items: flex-start + justify-content: center
```

**Usage:**

```scss
.container {
  @extend %center;  // Centers children horizontally & vertically
}

.sidebar {
  @extend %col-left;  // Vertical stack, left-aligned
}
```

### Flex Mixin

```scss
@mixin get-flex($align, $wrap: false)
```

**Parameters:**
- `$align`: `left`, `right`, or `center`
- `$wrap`: Boolean (default: `false`)

**Example:**

```scss
.toolbar {
  @include core.get-flex(left, true);  // Left-aligned, wrapping flex
}
```

### Disabled State

```scss
%disabled
```

Applies a comprehensive disabled state:
- Grayscale filter (90%)
- Reduced opacity (0.75)
- Removes interactivity
- Sets `cursor: not-allowed`

**Example:**

```scss
.button.disabled {
  @extend %disabled;
}
```

### Text Utilities

```scss
%text-no-wrap  // Ellipsis overflow with no wrapping
```

```scss
.label {
  @extend %text-no-wrap;  // Shows "Long text..." if truncated
}
```

---

## Typography & Font System

**File:** `font.scss`

### Font Size Variables

```scss
$font-size-sm: var(--rc-font-size-sm);  // Small
$font-size-md: var(--rc-font-size-md);  // Medium (default)
$font-size-lg: var(--rc-font-size-lg);  // Large
```

### Font Size Placeholders

```scss
%font-sm  // Small font size only
%font-md  // Medium font size only
%font-lg  // Large font size only
```

### Text Placeholders (Font + Color)

```scss
%text-sm  // Small font + theme text color
%text-md  // Medium font + theme text color
%text-lg  // Large font + theme text color
```

**Usage:**

```scss
.title {
  @extend %text-lg;  // Large, themed text
}

.description {
  @extend %font-md;  // Medium font (color applied separately)
  color: theme.$secondary;
}
```

---

## Icon System

**File:** `icon.scss`

### Icon Size Variables

```scss
$icon-size-xs: var(--rc-icon-size-xs);  // Extra small
$icon-size-sm: var(--rc-icon-size-sm);  // Small
$icon-size-md: var(--rc-icon-size-md);  // Medium
$icon-size-lg: var(--rc-icon-size-lg);  // Large
```

### Icon Placeholders

```scss
%icon     // Base icon (flex center, 100% svg)
%icon-xs  // Extra small icon
%icon-sm  // Small icon
%icon-md  // Medium icon
%icon-lg  // Large icon
```

All icon placeholders automatically:
- Center SVG content (`display: flex; align-items: center; justify-content: center`)
- Set SVG to 100% width/height

**Usage:**

```scss
.icon-container {
  @extend %icon-md;
  color: theme.$primary;  // SVG inherits color
}
```

---

## Animation System

### Core Animation Mixin

**File:** `animate.scss`

#### `set-keyframes` Mixin

Creates CSS `@keyframes` from a Sass map.

```scss
@mixin set-keyframes($name, $attrs, $reverse: false)
```

**Parameters:**
- `$name`: Animation name
- `$attrs`: Map with `from` and `to` keys
- `$reverse`: Boolean (swaps from/to)

**Example:**

```scss
$fade-in: (
  from: (opacity: 0),
  to: (opacity: 1)
);

@include animate.set-keyframes('fade-in', $fade-in);
// Generates: @keyframes fade-in { from {...} to {...} }
```

#### `set-settings` Mixin

Sets animation properties.

```scss
@mixin set-settings($dur: 0.5s, $timing-func: ease-in, $infinite: false)
```

**Example:**

```scss
.animated-box {
  @include animate.set-settings(0.3s, ease-out);
  animation-name: fade-in;
}
```

### Pre-built Animations

**File:** `animations.scss`

#### Available Animations

| Animation      | Effect                              |
|---------------|-------------------------------------|
| `pop`         | Fade in + scale from 1.05 + blur    |
| `drop`        | Drop from top (-600px translateY)   |
| `rise`        | Rise from bottom (+600px translateY)|
| `slide-left`  | Slide from left (-600px translateX) |
| `slide-right` | Slide from right (+600px translateX)|

#### Animation Definitions

```scss
$animation-pop: (
  from: (opacity: 0, transform: scale(1.05), filter: blur(3px)),
  to: (opacity: 1, transform: scale(1), filter: blur(0))
);

$animation-drop: (
  from: (opacity: 0, transform: translateY(-600px)),
  to: (opacity: 1, top: 50%, transform: translateY(0))
);

// Similar for rise, slide-left, slide-right...
```

#### Setup Mixins

Each animation type has an enter/leave setup:

```scss
@include setup-pop-animation();      // Creates rc-animation-pop-enter/leave
@include setup-drop-animation();     // Creates rc-animation-drop-enter/leave
@include setup-rise-animation();     // Creates rc-animation-rise-enter/leave
@include setup-slide-left-animation();
@include setup-slide-right-animation();
```

#### `set-animation` Mixin

Convenience mixin to apply animations:

```scss
@mixin set-animation($type, $key)
```

**Usage:**

```scss
.modal {
  @include animations.set-animation(drop, enter);
  @include animate.set-settings(0.4s, ease-out);
}
```

---

## Effects & Transitions

**File:** `effects.scss`

### Halo Effect

```scss
@mixin halo()
```

Creates a circular hover halo behind an element using `::after`.

**Features:**
- Circular background (120% size)
- Fades in on hover
- Dark/light mode support
- Uses semi-transparent secondary color

**Usage:**

```scss
.button {
  @include effects.halo();

  &.dark {
    // Halo auto-adjusts for dark mode
  }
}
```

### Transition Mixins

#### Single Property Transition

```scss
@mixin include-transition($property, $duration: 0.2s, $timing: ease-in)
```

**Example:**

```scss
.card {
  @include effects.include-transition(background, 0.3s, ease-out);
}
```

#### Multiple Property Transition

```scss
@mixin include-transition-multiple($props, $duration: 0.2s, $timing: ease-in)
```

**Example:**

```scss
.button {
  @include effects.include-transition-multiple(
    (background, transform, box-shadow),
    0.25s,
    cubic-bezier(0.4, 0, 0.2, 1)
  );
}
```

---

## Borders

**File:** `border.scss`

### Border Radius Placeholders

```scss
%border-radius-default  // 2px
%border-radius          // 4px (most common)
%border-radius-high     // 20px (pills)

// Directional radius
%border-radius-left     // Left corners only
%border-radius-right    // Right corners only
%border-radius-top      // Top corners only
```

### Border Placeholders

#### Standard Borders

```scss
%border            // 1px border with theme color, adaptive light/dark
%border-primary    // 1px border with primary color
%border-strong     // 1px border with primary color (alias)
%border-no-radius  // 1px border, no radius
```

**Example:**

```scss
.card {
  @extend %border;  // Auto-adjusts border color for light/dark mode
}
```

#### Semantic Borders

```scss
%border-error    // Red border (crimson)
%border-success  // Green border (success-green)
```

**Usage:**

```scss
.input.error {
  @extend %border-error;
}

.input.valid {
  @extend %border-success;
}
```

---

## Shadows

**File:** `shadow.scss`

### Inset Shadows

| Placeholder           | Description                    | Light/Dark Adaptive |
|-----------------------|--------------------------------|---------------------|
| `%shadow-inset-strong`| Strong inset shadow            | No                  |
| `%shadow-inset`       | Medium inset shadow            | Yes                 |
| `%shadow-inset-small` | Small inset shadow             | Yes                 |
| `%shadow-inset-xs`    | Extra small inset shadow       | Yes                 |

### Outset Shadows

| Placeholder           | Description                    |
|-----------------------|--------------------------------|
| `%shadow-small`       | Subtle outset shadow (1px)     |
| `%shadow-medium`      | Medium outset shadow (20px)    |
| `%shadow-medium-dark` | Medium shadow with dark tone   |

**Usage:**

```scss
.card {
  @extend %shadow-medium;

  &:hover {
    @extend %shadow-medium-dark;  // Deeper shadow on hover
  }
}

.input {
  @extend %shadow-inset;  // Adaptive inset shadow
}
```

---

## Button Utilities

**File:** `button.scss`

### Button Size Variables

```scss
$btn-sm-height: 20px;
$btn-md-height: 24px;
$btn-lg-height: 28px;
```

### Button Base Placeholder

```scss
%button  // Base button with hover effects
```

Provides:
- Centered flex layout
- Pointer cursor
- Background transition (0.2s)
- No-wrap text
- SVG color handling

### Button Type Placeholders

```scss
%button-primary  // Primary button (filled)
%button-danger   // Danger/delete button (red)
%button-default  // Default button (outline style)
%button-icon     // Icon-only button
```

### Button Type Mixin

```scss
@mixin get-button-type($bg, $bg-hover, $color, $color-hover)
```

**Example (Custom Button):**

```scss
.button-success {
  @include button.get-button-type(
    theme.$success-green,
    darken(theme.$success-green, 10%),
    theme.$white,
    theme.$white
  );
}
```

### Button Size Placeholders

```scss
%button-sm           // Small button
%button-md           // Medium button
%button-lg           // Large button
%button-sm-no-border // Small, no border
%button-lg-no-border // Large, no border
```

### Button Size Mixin

```scss
@mixin get-button($size, $border)
```

**Parameters:**
- `$size`: `small`, `medium`, or `large`
- `$border`: Boolean

**Usage:**

```scss
.custom-button {
  @include button.get-button(medium, true);
  @extend %button-primary;
}
```

---

## Positioning

**File:** `position.scss`

### Absolute Positioning Mixin

```scss
@mixin position-abs($position: "center center", $add-space: false)
```

**Supported Positions:**

| Position String    | Effect                           |
|--------------------|----------------------------------|
| `top left`         | Top-left corner                  |
| `top right`        | Top-right corner                 |
| `top center`       | Top center (horizontal)          |
| `bottom left`      | Bottom-left corner               |
| `bottom right`     | Bottom-right corner              |
| `bottom center`    | Bottom center (horizontal)       |
| `center left`      | Center-left (vertical)           |
| `center right`     | Center-right (vertical)          |
| `center center`    | Absolute center (both axes)      |

**Parameters:**
- `$position`: Position string
- `$add-space`: Boolean - adds 1rem offset if `true`

**Usage:**

```scss
.close-button {
  @include position.position-abs('top right', true);  // Top-right with 1rem spacing
}

.loading-spinner {
  @include position.position-abs('center center');  // Dead center
}
```

**Note:** Uses CSS transforms for true centering.

---

## List Utilities

**File:** `list.scss`

### Base List Placeholders

```scss
%list-common  // Resets list styles (no bullets, margin, padding)
```

### Vertical Lists

```scss
%list        // Centered vertical list
%list-left   // Left-aligned vertical list
%list-right  // Right-aligned vertical list
```

### Horizontal Lists

```scss
%list-horizontal             // Centered horizontal list
%list-horizontal-wrap        // Centered, wrapping
%list-horizontal-left        // Left-aligned horizontal
%list-horizontal-left-wrap   // Left-aligned, wrapping
%list-horizontal-right       // Right-aligned horizontal
```

### List Items

```scss
%list-item        // Centered flex item (0.25rem margin)
%list-item-left   // Left-aligned item
%list-item-right  // Right-aligned item
```

### Generic Wrapping List

```scss
%list-wrap  // Generic wrapping list (left-aligned)
```

**Usage:**

```scss
.navigation {
  @extend %list-horizontal-left;

  li {
    @extend %list-item;
  }
}

.tag-cloud {
  @extend %list-wrap;  // Wrapping tag list
}
```

---

## Utility Functions

**File:** `util.scss`

### `negative()` Function

Returns the negative value of a number.

```scss
@function negative($val)
```

**Example:**

```scss
$offset: 1rem;
.element {
  margin-top: util.negative($offset);  // -1rem
}
```

---

## Usage Patterns & Best Practices

### 1. Import Pattern

Always use `@use`, never `@import`:

```scss
// ✅ Good
@use '@design/theme.scss';
@use '@design/core.scss';

// ❌ Bad
@import '@design/theme.scss';
```

### 2. Namespace Usage

Access variables/mixins via namespace:

```scss
.component {
  color: theme.$primary;               // From theme.scss
  @include core.get-flex(center);      // From core.scss
  @include animate.set-settings(0.3s); // From animate.scss
}
```

### 3. Dark Mode Pattern

Always support both light and dark modes:

```scss
.component {
  @extend %border;

  &.dark {
    background: theme.$dark-control-bg;
    color: theme.$dark-input-color;
  }

  &:not(.dark) {
    background: theme.$white;
    color: theme.$text-color;
  }
}
```

### 4. Component Sizing Pattern

Use loops for size variants:

```scss
$sizes: (sm, md, lg);

@each $size in $sizes {
  .component-#{$size} {
    @extend %text-#{$size};
    @extend %button-#{$size};

    .icon {
      @extend %icon-#{$size};
    }
  }
}
```

### 5. Placeholder Extension

Extend placeholders for reusable styles:

```scss
.card {
  @extend %border-radius;
  @extend %shadow-medium;
  @extend %col;  // Vertical flex layout
}
```

### 6. Responsive Sizing

Use CSS custom properties for dynamic sizing:

```scss
.container {
  min-height: var(--height, 300px);  // Fallback to 300px
  width: var(--width, 100%);
}
```

### 7. State Modifiers

Use BEM-like modifiers for states:

```scss
.button {
  @extend %button;

  &.disabled {
    @extend %disabled;
  }

  &.loading {
    @extend %disabled;
    cursor: wait;
  }
}
```

### 8. Theming with RGB

Use RGB variables for opacity:

```scss
.overlay {
  background: rgba(theme.$primary-rgb, 0.2);  // 20% opacity
  backdrop-filter: blur(4px);
}

.border-subtle {
  border: 1px solid rgba(theme.$secondary-rgb, 0.5);
}
```

### 9. Animation Usage

Combine animation utilities:

```scss
.modal {
  // Properties first (per Sass ordering rules)
  display: block;

  // Nested selectors
  &.entering {
    animation-name: rc-animation-drop-enter;
  }

  &.leaving {
    animation-name: rc-animation-drop-leave;
  }

  // Mixins that generate nested rules last
  @include animate.set-settings(0.4s, cubic-bezier(0.4, 0, 0.2, 1));
  @include animations.setup-drop-animation();
}
```

### 10. Accessibility

Ensure keyboard navigation and screen reader support:

```scss
.button {
  @extend %button-primary;

  &:focus-visible {
    outline: 2px solid theme.$primary;
    outline-offset: 2px;
  }

  &[aria-disabled="true"] {
    @extend %disabled;
  }
}
```

---

## Sass Best Practices

### Modern Sass Ordering (Critical!)

Modern Sass (1.77.7+) enforces CSS-compliant ordering. **Always follow this order:**

1. **Variable declarations** (`$var: value;`)
2. **@extend directives** (`@extend %placeholder;`)
3. **Regular CSS properties** (`color: red; margin: 0;`)
4. **Nested rules** (`&.class {}`, `&:hover {}`)
5. **@include directives that generate nested rules** (e.g., animation mixins)

**Example (Correct Order):**

```scss
.component {
  // 1. Variables first
  $animation-settings: (
    from: (opacity: 0),
    to: (opacity: 1),
  );

  // 2. Extends next
  @extend %border-radius;
  @extend %flex;

  // 3. Properties before any nested rules
  display: block;
  color: theme.$primary;
  padding: 1rem;
  background: theme.$white;

  // 4. Nested selectors
  &:hover {
    opacity: 0.8;
  }

  &.active {
    background: theme.$primary;
  }

  // 5. Animation mixins last (generate @keyframes)
  @include animate.set-settings(0.25s);
  @include animate.set-keyframes('fade-in', $animation-settings);
}
```

**Why?** Sass 1.92.0+ enforces CSS-compliant ordering where declarations must appear before nested rules. Violating this causes deprecation warnings and will break in future versions.

**Project Configuration:** React Creme uses Vite with `api: 'modern-compiler'` for modern Sass behavior.

### Module System

Use `@use` with explicit namespaces:

```scss
@use '@design/theme.scss' as theme;
@use '@design/core.scss' as core;
@use 'sass:map';

.element {
  color: theme.$primary;          // Explicit namespace
  @include core.get-flex(center); // Clear origin
  $value: map.get($map, 'key');   // Built-in Sass modules
}
```

### Map Iteration

Use Sass maps for scalable utilities:

```scss
$sizes: (
  sm: 0.875rem,
  md: 1rem,
  lg: 1.25rem,
);

@each $name, $size in $sizes {
  .text-#{$name} {
    font-size: $size;
  }
}
```

### Mixins vs. Placeholders

- **Placeholders (`%`)**: For static, reusable styles (no parameters)
- **Mixins (`@mixin`)**: For dynamic styles with parameters

```scss
// Placeholder: Static, extended
%card-base {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

// Mixin: Dynamic, parameterized
@mixin card-padding($size) {
  @if $size == small {
    padding: 0.5rem;
  } @else if $size == large {
    padding: 1.5rem;
  }
}
```

### Calc() Best Practices

Use `calc()` for dynamic calculations:

```scss
.component {
  width: calc(100% - 2rem);              // Subtracting padding
  height: calc($btn-md-height * 0.3);    // Dynamic multiplier
  margin: calc(var(--spacing) / 2);      // CSS custom property math
}
```

---

## Contributing Guidelines

### Adding a New Component

1. **Create component SCSS in:** `components/<component-name>/<component-name>.module.scss`
2. **Import design utilities:**
   ```scss
   @use '@design/theme.scss';
   @use '@design/core.scss';
   ```
3. **Follow naming conventions:**
   ```scss
   .wrapper { /* Root element */ }
   .header { /* Child element */ }
   .body { /* Child element */ }
   ```
4. **Support dark mode:**
   ```scss
   .wrapper {
     &.dark { /* Dark styles */ }
     &:not(.dark) { /* Light styles */ }
   }
   ```
5. **Use placeholders for common patterns:**
   ```scss
   .wrapper {
     @extend %border;
     @extend %shadow-medium;
   }
   ```

### Modifying Design Tokens

1. **Update the appropriate file:**
   - Colors → `theme.scss` (for runtime theming) or `tokens.scss` (for static tokens)
   - Spacing → `tokens.scss`
   - Animations → `animations.scss`
2. **Maintain backwards compatibility** when changing variables
3. **Update this documentation** with the new token/variable
4. **Run linting:** `pnpm lint`
5. **Update snapshots if needed:** `pnpm test -u`

### Adding New Utilities

1. **Add to the appropriate utility file** (or create a new one)
2. **Provide both placeholder and mixin versions** if applicable:
   ```scss
   // Placeholder for static usage
   %my-utility {
     /* styles */
   }

   // Mixin for parameterized usage
   @mixin my-utility($param) {
     /* dynamic styles */
   }
   ```
3. **Document the utility in this guide**
4. **Add usage examples in component files**
5. **Follow Sass ordering rules** (see above)

### Testing Design Changes

1. **Visual regression:** Check Storybook stories (`pnpm story`)
2. **Component tests:** Run Vitest (`pnpm test`)
3. **Build verification:** Ensure library builds (`pnpm build:lib`)
4. **Dark mode testing:** Toggle dark mode in Storybook and documentation

---

## Design System Checklist

When building a new component, ensure you:

- [ ] Import from `@design` (not relative paths)
- [ ] Support light and dark modes
- [ ] Use placeholders for common styles
- [ ] Follow Sass ordering rules (variables → extends → properties → nested rules → mixins)
- [ ] Provide size variants (sm, md, lg) if applicable
- [ ] Use theme colors (not hardcoded hex values)
- [ ] Add accessibility support (focus states, ARIA)
- [ ] Use CSS custom properties for dynamic values
- [ ] Follow BEM-like naming within CSS Modules
- [ ] Test in both themes

---

## Version History

| Version | Date       | Changes                              |
|---------|------------|--------------------------------------|
| 2.0.0   | Jan 2025   | Added modern Sass ordering rules     |
| 1.1.0   | Jan 2025   | Documented all design system files   |
| 1.0.0   | Jan 2025   | Initial comprehensive documentation  |

---

## Resources

- **Project Documentation:** `CLAUDE.md` (project overview)
- **Modernization Plan:** `MODERNIZATION_PLAN.md` (tooling updates)
- **Monorepo Guide:** `MONOREPO_TOOLING.md` (workspace setup)
- **Sass Documentation:** [sass-lang.com](https://sass-lang.com/)
- **Vite CSS:** [vitejs.dev/guide/features#css](https://vitejs.dev/guide/features#css)

---

**Questions?** Check existing components in `packages/lib/components/` for real-world usage examples.
