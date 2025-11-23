# Demo Page Renderer - Modular Architecture

A modernized, modular system for rendering interactive component demonstrations in the React Creme documentation.

## 🎯 Overview

This system provides a complete UX overhaul with:
- **Floating code panels** - View code without scrolling
- **Quick actions toolbar** - Copy, toggle, open StackBlitz, reset, fullscreen
- **Keyboard shortcuts** - Cross-platform (Cmd/Ctrl) shortcuts for all actions
- **State persistence** - localStorage sync for preferences
- **Enhanced demo container** - Theme toggle, viewport switching, fullscreen
- **Context-based state** - Eliminates prop drilling
- **Type-safe URL generation** - No more hardcoded GitHub URLs
- **Modular components** - Single-responsibility, reusable pieces

## 📁 Directory Structure

```
demo-page-renderer/
├── components/            # Modular UI components
│   ├── demo-container.tsx         # Enhanced demo wrapper
│   ├── floating-code-panel.tsx    # Dockable code viewer
│   ├── property-table.tsx         # Properties/callbacks display
│   ├── quick-actions-toolbar.tsx  # Action buttons
│   └── variant-selector.tsx       # Component variant switcher
├── hooks/                 # Custom React hooks
│   ├── use-demo-shortcuts.ts      # Keyboard shortcuts
│   └── use-demo-state.ts          # LocalStorage persistence
├── utils/                 # Utility functions
│   ├── code-extractor.ts          # React → code conversion
│   └── url-builder.ts             # Type-safe URL generation
├── demo-context.tsx       # Central state management
├── demo-page-header.tsx   # Page header
├── demo-page-tabs.tsx     # Tabbed interface
├── index.tsx              # Main renderer
└── types.ts               # TypeScript definitions

../code-viewer/            # Code display components
├── shiki-code-viewer.tsx  # Static code with Shiki
├── sandpack-interactive.tsx # Interactive playground
└── code-panel.tsx         # Unified code interface
```

## 🚀 Key Features

### 1. Floating Code Panel

A resizable, dockable side panel that displays code without pushing content down:

```tsx
<FloatingCodePanel
  snippet={{
    code: 'import { Button } from "react-creme";',
    language: 'tsx',
    fileName: 'example.tsx',
  }}
  isOpen={true}
  width={600}
  minWidth={300}
  maxWidth={1000}
  onClose={() => {}}
  onResize={(width) => {}}
/>
```

**Features:**
- Resizable (300-1000px)
- Fixed positioning (doesn't push content)
- Smooth animations
- Keyboard shortcuts (Cmd+K to toggle)
- Close with Escape key

### 2. Quick Actions Toolbar

Action buttons for common tasks with keyboard shortcut hints:

```tsx
<QuickActionsToolbar
  onCopyCode={() => {}}
  onToggleCode={() => {}}
  onOpenStackBlitz={() => {}}
  onReset={() => {}}
  onFullscreen={() => {}}
  showShortcuts={true}
/>
```

**Actions:**
- **Copy Code** (⌘C) - Copy to clipboard
- **Toggle Code** (⌘K) - Show/hide code panel
- **Open in StackBlitz** (⌘O) - Open in new tab
- **Reset** (⌘R) - Reset demo state
- **Fullscreen** (⌘F) - Toggle fullscreen mode

### 3. Demo Container

Enhanced wrapper with theme toggle, viewport switching, and controls:

```tsx
<DemoContainer
  onThemeToggle={() => {}}
  onViewportChange={(size) => {}}
  onReset={() => {}}
  onFullscreen={() => {}}
>
  {children}
</DemoContainer>
```

**Features:**
- Theme toggle (light/dark/auto)
- Viewport selector (mobile/tablet/desktop)
- Fullscreen mode
- Reset button
- Responsive frame

### 4. Keyboard Shortcuts

Global keyboard shortcuts with cross-platform support:

```tsx
useDemoShortcuts({
  handlers: {
    onCopyCode: () => {},
    onToggleCode: () => {},
    onOpenStackBlitz: () => {},
    onReset: () => {},
    onFullscreen: () => {},
  },
});
```

**Shortcuts:**
- `Cmd+C` (Mac) / `Ctrl+C` (Windows/Linux) - Copy code
- `Cmd+K` / `Ctrl+K` - Toggle code panel
- `Cmd+O` / `Ctrl+O` - Open StackBlitz
- `Cmd+R` / `Ctrl+R` - Reset demo
- `Cmd+F` / `Ctrl+F` - Fullscreen

### 5. State Management with Context

Centralized state management eliminates prop drilling:

```tsx
// Provider
<DemoContextProvider
  defaultVariant=""
  defaultViewport="desktop"
  defaultTheme="auto"
  initialCodePanel={{ isOpen: false, width: 600 }}
>
  {children}
</DemoContextProvider>

// Consumers
const codePanel = useCodePanelState();
const actions = useDemoActions();
const theme = useThemeMode();
const viewport = useViewport();
```

**State includes:**
- Active variant
- Code panel configuration
- Viewport size
- Theme mode
- Fullscreen state

### 6. localStorage Persistence

Preferences persist across page loads:

```tsx
const [theme, setTheme] = useDemoState({
  storageKey: 'demo-theme-mode',
  initialState: 'auto',
  persist: true,
});
```

**Persisted state:**
- Code panel open/closed
- Code panel width
- Viewport size
- Theme preference

### 7. Type-Safe URL Generation

Centralized URL utilities eliminate hardcoded URLs:

```tsx
import { getSourceUrl, getEditUrl, getStackBlitzUrl } from './utils/url-builder';

const sourceUrl = getSourceUrl('button');
// => https://github.com/prabhuignoto/react-creme/tree/master/packages/lib/components/button

const editUrl = getEditUrl('button');
// => https://github.com/prabhuignoto/react-creme/tree/master/packages/documentation/components/button/index.tsx

const stackBlitzUrl = getStackBlitzUrl('react-creme-button-demo');
// => https://stackblitz.com/edit/react-creme-button-demo
```

**Available utilities:**
- `getSourceUrl(componentId)` - GitHub source code
- `getEditUrl(pageId)` - GitHub edit page
- `getStackBlitzUrl(projectId)` - StackBlitz editor
- `getStackBlitzEmbedUrl(projectId, options)` - StackBlitz embed
- `getNpmUrl(packageName)` - NPM package page
- `getIssuesUrl()` - GitHub issues
- `getNewIssueUrl(title, body, labels)` - New GitHub issue

### 8. Code Extraction

Convert React elements to formatted code strings:

```tsx
import { extractCodeFromElement, wrapWithImport } from './utils/code-extractor';

const code = extractCodeFromElement(<Button variant="primary">Click</Button>);
// => '<Button variant="primary">Click</Button>'

const withImport = wrapWithImport(code, 'Button');
// => 'import { Button } from "react-creme";\n\n<Button variant="primary">Click</Button>'
```

**Available utilities:**
- `extractCodeFromElement(element, options)` - React → code
- `wrapWithImport(code, componentName, packageName)` - Add import
- `formatCode(code, indentSize)` - Format with indentation
- `addLineNumbers(code, startLine)` - Add line numbers
- `highlightLines(code, lines, marker)` - Highlight specific lines
- `extractImports(code)` - Extract import statements
- `removeImports(code)` - Remove imports
- `variantToCodeSnippet(variant, componentName)` - Variant → snippet

## 🔧 Usage

### Basic Integration

```tsx
import DemoPageRenderer from './common/demo-page-renderer';

<DemoPageRenderer
  title="Button Component"
  description="A customizable button component"
  demoWidget={<ButtonDemo />}
  properties={properties}
  callbacks={callbacks}
  tabTitles={['Demo', 'Properties', 'Playground']}
  sourceId="button"
  editId="button"
  stackBlitzCodes={['react-creme-button']}
  features={['Accessible', 'Themeable', 'Customizable']}
  pageIcon={<CodeIcon />}
/>
```

### Using Individual Components

```tsx
// Floating Code Panel
import { FloatingCodePanel } from './components/floating-code-panel';
import { useCodePanelState, useDemoActions } from './demo-context';

const MyComponent = () => {
  const codePanel = useCodePanelState();
  const actions = useDemoActions();

  return (
    <>
      <button onClick={actions.toggleCodePanel}>Show Code</button>
      {codePanel.isOpen && (
        <FloatingCodePanel
          snippet={{ code: '...', language: 'tsx' }}
          isOpen={codePanel.isOpen}
          width={codePanel.width}
          onClose={actions.toggleCodePanel}
          onResize={actions.setCodePanelWidth}
        />
      )}
    </>
  );
};
```

## 📦 Components API

### DemoPageRenderer

Main component that orchestrates the entire demo page.

**Props:**
- `title: string` - Page title
- `description: string | ReactNode` - Page description
- `demoWidget: ReactNode` - Component demo to display
- `properties: any[]` - Component properties metadata
- `callbacks?: any[]` - Component callbacks metadata
- `tabTitles: string[]` - Tab labels
- `sourceId?: string` - Component source directory name
- `editId?: string` - Documentation page directory name
- `stackBlitzCodes?: string[]` - StackBlitz project IDs
- `features?: string[]` - Feature badges
- `pageIcon?: ReactNode` - Page icon

### DemoContainer

Enhanced wrapper for component demos.

**Props:**
- `children: ReactNode` - Demo content
- `onThemeToggle: (isDark: boolean) => void` - Theme toggle handler
- `onViewportChange: (size: ViewportSize) => void` - Viewport change handler
- `onReset: () => void` - Reset handler
- `onFullscreen: () => void` - Fullscreen toggle handler

### FloatingCodePanel

Dockable side panel for code viewing.

**Props:**
- `snippet: CodeSnippet` - Code to display
- `isOpen: boolean` - Panel open state
- `width: number` - Panel width (px)
- `minWidth?: number` - Minimum width (default: 300)
- `maxWidth?: number` - Maximum width (default: 1000)
- `onClose: () => void` - Close handler
- `onResize: (width: number) => void` - Resize handler

### QuickActionsToolbar

Action buttons with keyboard shortcuts.

**Props:**
- `onCopyCode: () => void` - Copy code handler
- `onToggleCode: () => void` - Toggle code panel handler
- `onOpenStackBlitz?: () => void` - Open StackBlitz handler (optional)
- `onReset: () => void` - Reset handler
- `onFullscreen: () => void` - Fullscreen toggle handler
- `showShortcuts?: boolean` - Show keyboard shortcut hints (default: false)

### PropertyTable

Display component properties and callbacks.

**Props:**
- `properties: PropertyMeta[]` - Properties metadata
- `callbacks?: CallbackMeta[]` - Callbacks metadata (optional)
- `columns: DataGridColumn[]` - DataGrid column configuration

### VariantSelector

Switch between component variants.

**Props:**
- `variants: ComponentVariant[]` - Available variants
- `activeVariant: string` - Currently selected variant
- `onVariantChange: (id: string) => void` - Variant change handler
- `layout?: 'tabs' | 'grid' | 'list'` - Display layout (default: 'tabs')

## 🎨 Types

```typescript
// Code snippet
interface CodeSnippet {
  code: string;
  language: SupportedLanguage;
  fileName?: string;
  highlightLines?: number[];
  label?: string;
}

// Interactive demo
interface InteractiveDemo {
  stackBlitzId?: string;
  files?: SandpackFiles;
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts';
  dependencies?: Record<string, string>;
  height?: number;
}

// Component variant
interface ComponentVariant {
  id: string;
  title: string;
  description?: string;
  code: CodeSnippet;
  demo: ReactNode;
  interactive?: InteractiveDemo;
}

// Viewport size
type ViewportSize = 'mobile' | 'tablet' | 'desktop';

// Theme mode
type ThemeMode = 'light' | 'dark' | 'auto';

// Code panel configuration
interface CodePanelConfig {
  isOpen: boolean;
  width: number;
  minWidth: number;
  maxWidth: number;
  defaultTab: 'code' | 'playground';
}
```

## 🔌 Hooks

### useDemoShortcuts

Global keyboard shortcuts.

```tsx
useDemoShortcuts({
  handlers: {
    onCopyCode?: () => void;
    onToggleCode?: () => void;
    onOpenStackBlitz?: () => void;
    onReset?: () => void;
    onFullscreen?: () => void;
  },
  shortcuts?: KeyboardShortcut[],
  enabled?: boolean,
});
```

### useDemoState

State management with localStorage persistence.

```tsx
const [state, setState, reset] = useDemoState({
  storageKey: 'my-state-key',
  initialState: defaultValue,
  persist: true,
  serialize?: (value) => string,
  deserialize?: (value) => T,
});
```

### Context Hooks

```tsx
// Full context
const context = useDemoContext();

// Specific pieces
const activeVariant = useActiveVariant();
const codePanel = useCodePanelState();
const viewport = useViewport();
const theme = useThemeMode();
const actions = useDemoActions();
```

## 🎯 Best Practices

### 1. Use Context for Shared State

```tsx
// ❌ Bad - Prop drilling
<Parent>
  <Child isOpen={isOpen} onToggle={onToggle} />
</Parent>

// ✅ Good - Context
<DemoContextProvider>
  <Parent>
    <Child /> {/* Uses useDemoActions internally */}
  </Parent>
</DemoContextProvider>
```

### 2. Persist User Preferences

```tsx
// ✅ Good - Persists across page loads
const [viewport, setViewport] = useDemoState({
  storageKey: 'demo-viewport',
  initialState: 'desktop',
  persist: true,
});
```

### 3. Use Type-Safe URLs

```tsx
// ❌ Bad - Hardcoded URL
const url = `https://github.com/prabhuignoto/react-creme/tree/master/packages/lib/components/${id}`;

// ✅ Good - Type-safe utility
const url = getSourceUrl(id);
```

### 4. Extract Code from React Elements

```tsx
// ✅ Good - Dynamic code extraction
const code = extractCodeFromElement(demoWidget);
const withImport = wrapWithImport(code, 'Button');
```

## 🐛 Troubleshooting

### Code panel not opening

Check that:
1. Context provider wraps your component
2. `useDemoActions()` is called inside the context
3. Toggle handler is wired correctly

### Keyboard shortcuts not working

Check that:
1. `useDemoShortcuts` is called with handlers
2. User is not focused on an input/textarea
3. Browser shortcuts don't conflict

### State not persisting

Check that:
1. `persist: true` is set
2. localStorage is available (not disabled)
3. Storage key is unique

### URLs not generating correctly

Check that:
1. Component ID matches directory name
2. Configuration is passed if custom paths needed

## 📝 Migration Guide

### From Old System

**Before:**
```tsx
// Hardcoded URLs everywhere
<a href="https://github.com/prabhuignoto/react-creme/...">Source</a>

// No keyboard shortcuts
// No floating code panel
// Prop drilling for state
```

**After:**
```tsx
import { getSourceUrl } from './utils/url-builder';
import { useDemoActions } from './demo-context';

<DemoContextProvider>
  <QuickActionsToolbar
    onToggleCode={actions.toggleCodePanel}
    onCopyCode={() => {}}
  />
  <FloatingCodePanel ... />
</DemoContextProvider>
```

## 🚀 Future Enhancements

Potential improvements:
- [ ] Variant comparison view (side-by-side)
- [ ] Code diff viewer for variants
- [ ] Live theme editor
- [ ] A11y audit panel
- [ ] Performance metrics display
- [ ] Export to CodeSandbox
- [ ] Component playground editor
- [ ] Screenshot/video capture

## 📄 License

Part of React Creme - Same license as the parent project.
