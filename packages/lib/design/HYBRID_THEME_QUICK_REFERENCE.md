# Hybrid Theme - Quick Reference Guide

> Fast reference for using the Color-Agnostic Animation & Shape System

## 📚 Files

### 1. **hybrid-theme.scss** (~10KB)
Reusable SCSS module with:
- **Animation timing**: Variables and spring physics easing
- **Shadow patterns**: Soft, medium, strong (color-agnostic)
- **Gradient mixins**: Wrapper, hover, active state patterns
- **Animation keyframes**: 7 reusable animations
- **Utility mixins**: Transitions, spring animations, hover effects, focus states
- **Theme configuration map**

**Key Principle**: All animations, shadows, and shapes are **color-agnostic**. Colors come from your theme.

**Location**: `@design/hybrid-theme.scss`

### 2. **HYBRID_THEME.md** (18KB)
Comprehensive documentation with:
- Design philosophy & core principles
- Complete specifications (timing, easing, shadows, shapes)
- Animation keyframes & patterns
- Color application via theme system
- Code examples using theme colors
- Performance metrics & browser support
- Troubleshooting guide

**Location**: `@design/HYBRID_THEME.md`

## 🚀 Quick Start

### 1. Import Both Modules

```scss
@use '@design/hybrid-theme.scss' as hybrid;
@use '@design/theme.scss' as theme;  // Your theme colors
```

### 2. Use Spring Animations with Semantic Timing

```scss
// Main interaction - elegant feedback
.my-component {
  @include hybrid.spring-animation(hybrid-item-fade-in, hybrid.$animation-duration-primary);
}

// Important/destructive action - deliberate timing
.destructive-action {
  @include hybrid.spring-animation(hybrid-refined-ping, hybrid.$animation-duration-critical);
}
```

### 3. Apply Responsive Animations (Auto Mobile Optimization)

```scss
.menu-item {
  // Automatically 30% faster on mobile
  @include hybrid.responsive-spring-animation(hybrid-item-fade-in, hybrid.$animation-duration-primary);
}
```

### 4. Add Shape Tokens

```scss
.button {
  border-radius: hybrid.$radius-sm;  // Snappy, small components
}

.card {
  border-radius: hybrid.$radius-lg;  // Premium, large surfaces
}
```

### 5. Apply Shadows (Universal)

```scss
.element {
  box-shadow: hybrid.$shadow-soft;

  &:hover {
    box-shadow: hybrid.$shadow-medium;
  }
}
```

### 6. Add Staggered List Animations

```scss
.list-items {
  .item {
    animation: hybrid-item-fade-in
      hybrid.$animation-duration-primary
      hybrid.$spring-easing
      backwards;

    @include hybrid.stagger-children($max-items: 20, $delay-step: 0.04s);
  }
}
```

### 7. Add Theme Colors to Borders & Focus

```scss
.element {
  @include hybrid.refined-border(theme.$border-color);

  &:focus-visible {
    @include hybrid.focus-outline(theme.$focus-color);
  }
}
```

## ⏱️ Animation Durations (Semantic)

Choose by meaning, not numbers:

```scss
$animation-duration-instant:    0.1s;  // Lightweight feedback, tooltips
$animation-duration-secondary:  0.2s;  // Quick interactions, minor changes
$animation-duration-primary:    0.3s;  // Main interactions, state transitions
$animation-duration-critical:   0.4s;  // Important/destructive actions
$animation-duration-elaborate:  0.6s;  // Polish, entrance/exit animations

// Backward compatible aliases (deprecated)
$animation-duration-quick:      $animation-duration-secondary;
$animation-duration-smooth:     $animation-duration-primary;
$animation-duration-standard:   $animation-duration-critical;
$animation-duration-extended:   $animation-duration-elaborate;
```

## 🎨 Shadow Patterns (Color-Agnostic)

Shadows use universal black with opacity - works with any color scheme:

```scss
$shadow-soft:   0 1px 2px rgba(0, 0, 0, 0.05);

$shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);

$shadow-strong: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

**Apply colors from your theme**, not from hybrid theme.

## 🔷 Shape System (Border Radius)

Standardized radius tokens for visual hierarchy:

```scss
$radius-xs:  2px;   // Minimal rounding
$radius-sm:  4px;   // Small components (buttons, badges)
$radius-md:  8px;   // Standard components (cards, dropdowns)
$radius-lg:  12px;  // Large surfaces (dialogs, panels)
$radius-xl:  16px;  // Extra large (hero sections, featured)
```

**Pairing with animations:**
- Small radius + secondary/primary timing = snappy, responsive feel
- Large radius + primary/critical timing = premium, refined feel

## 📦 Reusable Animations

| Animation | Duration | Use Case |
|-----------|----------|----------|
| `hybrid-item-fade-in` | 0.3s | Menu items, list items |
| `hybrid-polish-glow` | 0.5s | Menu open, activation |
| `hybrid-subtle-shine` | 0.6s | Hover effects, polish |
| `hybrid-refined-ping` | 0.5s | Button clicks, selections |
| `hybrid-snap-select` | 0.4s | Item selection |
| `hybrid-chevron-rotate` | 0.4s | Menu chevron |
| `hybrid-item-lift` | 0.25s | Hover effects |

## 🎯 Common Patterns (With Theme Colors)

### Glossy Card

```scss
@use '@design/hybrid-theme.scss' as hybrid;
@use '@design/theme.scss' as theme;

.card {
  @include hybrid.glossy-gradient-wrapper(theme.$card-bg, theme.$card-bg-subtle);
  @include hybrid.refined-border(theme.$card-border);
  box-shadow: hybrid.$shadow-soft;

  &:hover {
    box-shadow: hybrid.$shadow-medium;
    transform: translateY(-2px);
  }
}
```

### Interactive Button

```scss
@use '@design/hybrid-theme.scss' as hybrid;
@use '@design/theme.scss' as theme;

.button {
  @include hybrid.smooth-transition(transform, box-shadow);
  border-radius: hybrid.$radius-sm;

  &:active {
    animation: hybrid-refined-ping
      hybrid.$animation-duration-critical
      hybrid.$spring-easing;
  }

  &:focus-visible {
    @include hybrid.focus-outline(theme.$focus-color);
  }
}
```

### Menu Item

```scss
@use '@design/hybrid-theme.scss' as hybrid;
@use '@design/theme.scss' as theme;

.menu-item {
  @include hybrid.smooth-multi-transition(background-color, transform);
  border-radius: hybrid.$radius-md;
  animation: hybrid-item-fade-in hybrid.$animation-duration-primary hybrid.$spring-easing backwards;

  @include hybrid.stagger-children($max-items: 20, $delay-step: 0.04s);

  &:hover {
    @include hybrid.glossy-gradient-hover(theme.$hover-light, theme.$hover-lighter);
    transform: translateY(-2px);
  }
}
```

## 🛠️ Utility Mixins

### `smooth-transition` (Single property)
```scss
@include hybrid.smooth-transition(color);
@include hybrid.smooth-transition(all, 0.5s);
```

### `smooth-multi-transition` (Multiple properties)
```scss
@include hybrid.smooth-multi-transition(background-color, box-shadow);
@include hybrid.smooth-multi-transition(color, opacity, transform);
```

### `spring-animation` (Spring physics)
```scss
@include hybrid.spring-animation(hybrid-item-fade-in, hybrid.$animation-duration-primary);
@include hybrid.spring-animation(hybrid-refined-ping, hybrid.$animation-duration-critical);
```

### `responsive-spring-animation` (Auto mobile optimization)
```scss
// Desktop: 0.3s, Mobile: 0.21s (30% faster)
@include hybrid.responsive-spring-animation(hybrid-item-fade-in, hybrid.$animation-duration-primary);
```

### `stagger-children` (Cascade animations)
```scss
// Forward stagger (top-to-bottom)
@include hybrid.stagger-children($max-items: 20, $delay-step: 0.04s);

// Reverse stagger (bottom-to-top)
@include hybrid.stagger-children($max-items: 20, $delay-step: 0.04s, $reverse: true);
```

### `hover-lift` (Elevation effect)
```scss
@include hybrid.hover-lift();           // Default: 2px with shadow
@include hybrid.hover-lift(4px);        // Custom distance
@include hybrid.hover-lift(2px, false); // Without shadow
```

### `refined-border` (With theme color)
```scss
@include hybrid.refined-border(theme.$border-color);        // All sides
@include hybrid.refined-border(theme.$border-color, bottom); // Specific side
```

### `focus-outline` (With theme color)
```scss
@include hybrid.focus-outline(theme.$focus-color);
@include hybrid.focus-outline(theme.$focus-color, 3px, 0);
```

### `drop-shadow-refined` (Refined drop shadow)
```scss
@include hybrid.drop-shadow-refined(soft);
@include hybrid.drop-shadow-refined(medium);
@include hybrid.drop-shadow-refined(strong);
```

### `glossy-gradient-*` (Theme-based gradients)
```scss
@include hybrid.glossy-gradient-wrapper($color-from, $color-to);
@include hybrid.glossy-gradient-hover($color-from, $color-to);
@include hybrid.glossy-gradient-active($color-from, $color-to);
```

## 🌙 Dark Mode Support

Shadows work universally, colors come from your theme:

```scss
@use '@design/hybrid-theme.scss' as hybrid;
@use '@design/theme.scss' as theme;

.component {
  @include hybrid.glossy-gradient-wrapper(theme.$bg, theme.$bg-subtle);
  @include hybrid.refined-border(theme.$border-color);
  box-shadow: hybrid.$shadow-soft;

  &.dark {
    @include hybrid.glossy-gradient-wrapper(theme.$dark-bg, theme.$dark-bg-subtle);
    @include hybrid.refined-border(theme.$dark-border-color);
  }

  // Shadows remain the same - they're universal
}
```

## 🎬 Animation Timing Guide (Semantic)

**Choose duration based on semantic meaning:**

| Timing | Variable | When to Use | Example |
|--------|----------|------------|---------|
| **Instant (0.1s)** | `$animation-duration-instant` | Lightweight feedback | Tooltip appears |
| **Secondary (0.2s)** | `$animation-duration-secondary` | Quick interactions | Minor state change |
| **Primary (0.3s)** | `$animation-duration-primary` | Main interactions | Menu opening, selection |
| **Critical (0.4s)** | `$animation-duration-critical` | Important/destructive | Delete action, major change |
| **Elaborate (0.6s)** | `$animation-duration-elaborate` | Flourish effects | Entrance/exit, shine |

## ✅ Components Already Using Hybrid Theme

- ✅ **Dropdown** - Full implementation with polish, animations
- ✅ **Menu-Bar** - Chevron rotation, hover lift, glossy states
- ✅ **Menu** - Core animations and polish

## 🚀 Components Ready for Implementation

- Button (refined ping)
- Card (glossy backgrounds)
- Modal (polish glow)
- Toast (refined slide)
- Tabs (smooth indicator)
- Input (subtle glow on focus)

## 💡 Tips & Tricks

### Stagger List Animations

```scss
.list-item {
  animation: hybrid-item-fade-in
    hybrid.$animation-duration-primary
    hybrid.$spring-easing
    backwards;

  // Use the stagger-children mixin instead of manual loops
  @include hybrid.stagger-children($max-items: 20, $delay-step: 0.04s);
}
```

### Combine Animations with Responsive Timing

```scss
.element {
  // Animation + transform with responsive duration
  @include hybrid.responsive-spring-animation(hybrid-item-fade-in, hybrid.$animation-duration-primary);

  &:hover {
    transform: scale(1.05);  // Separate transform on hover
  }
}
```

### Respect Motion Preferences

```scss
.animated {
  animation: hybrid-polish-glow 0.5s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}
```

## 🎯 Phase 2: State Machines & Interactions

### State Animations

```scss
// Loading - subtle pulse
@include hybrid.state-loading();

// Success - celebratory bounce
@include hybrid.state-success();

// Error - attention-getting shake
@include hybrid.state-error();

// Disabled - reduced opacity
@include hybrid.state-disabled();
```

### Touch vs Mouse Feedback

```scss
// Mouse hover only
@include hybrid.hover-feedback() {
  transform: translateY(-2px);
}

// Touch press only
@include hybrid.touch-feedback() {
  transform: scale(0.98);
}

// Combined (auto detects device)
@include hybrid.interactive-feedback();
```

### Composition Animations

```scss
// Fade in with lift
@include hybrid.fade-in-lift();

// Fade in with scale
@include hybrid.fade-in-scale();

// Slide in from direction
@include hybrid.slide-in(left);   // Also: right, up, down
```

### Exit Animations

```scss
// Fade out
@include hybrid.exit-fade();

// Slide off right
@include hybrid.exit-slide-right();

// Slide off up
@include hybrid.exit-slide-up();
```

## 📊 Performance

- **CPU**: ~5% per animation
- **GPU**: GPU-accelerated (transform, opacity)
- **Memory**: < 2MB for full animation set
- **Bundle**: +2KB gzipped CSS
- **FPS**: 60fps on modern hardware

## 🎨 Phase 2 Examples

### Button with State Machine

```scss
.button {
  border-radius: hybrid.$radius-sm;

  // Default - interactive feedback
  &:not(:disabled):not(.is-loading):not(.is-success):not(.is-error) {
    @include hybrid.interactive-feedback();
  }

  &.is-loading {
    @include hybrid.state-loading();
  }

  &.is-success {
    @include hybrid.state-success();
  }

  &.is-error {
    @include hybrid.state-error();
  }

  &:disabled {
    @include hybrid.state-disabled();
  }
}
```

### Modal with Entrance/Exit

```scss
.modal-overlay {
  @include hybrid.fade-in-scale(hybrid.$animation-duration-primary);

  &.exiting {
    @include hybrid.exit-fade(hybrid.$animation-duration-secondary);
  }
}
```

### Touch-Aware List

```scss
.list-item {
  @include hybrid.fade-in-lift();
  @include hybrid.stagger-children();

  @include hybrid.hover-feedback() {
    transform: translateY(-2px);
  }

  @include hybrid.touch-feedback() {
    transform: scale(0.98);
  }
}
```

## 📚 Learn More

- **Full Documentation**: See `HYBRID_THEME.md` for complete guide
- **Phase 1**: Shape system, responsive durations, stagger utility, semantic timing
- **Phase 2**: State machines, touch/mouse interactions, composition, entrance/exit
- **Examples**: Button states, modal interactions, touch-aware lists
- **Best Practices**: 10+ guidelines for optimal UX

## 🐛 Common Issues

### Animation not bouncy?
→ Check easing: use `hybrid.$spring-easing`, not `ease-out`

### Colors/borders look wrong?
→ Pass theme colors to mixins: `@include hybrid.refined-border(theme.$border-color)` instead of hardcoding

### Gradients not showing?
→ Use gradient mixins with colors: `@include hybrid.glossy-gradient-wrapper(theme.$bg, theme.$bg-subtle)`

### Motion not disabled?
→ Add `@media (prefers-reduced-motion: reduce)` with `animation: none`

### State animations not showing?
→ Use mixins: `@include hybrid.state-loading()` instead of manual animations

### Touch feedback not working on mobile?
→ Use `@include hybrid.touch-feedback()` instead of `:hover` - detects device automatically

### Entrance animation not visible?
→ Make sure element starts with `opacity: 0` or initial transform state

---

**For detailed documentation, see**: `@design/HYBRID_THEME.md`

**Phase 3 Roadmap**: Enhanced keyboard navigation, animation harmony docs, micro-interactions playbook, advanced accessibility (see HYBRID_THEME.md for details)
