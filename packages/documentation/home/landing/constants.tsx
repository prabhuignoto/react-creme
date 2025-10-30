import { Package, Layers, Zap, Code, Check, X, AlertCircle } from 'react-feather';

// Stats Bar Data
export const STATS_DATA = [
  {
    icon: <Package size={20} />,
    label: 'Bundle Size',
    value: '~118kb',
  },
  {
    icon: <Layers size={20} />,
    label: 'Components',
    value: '55+',
  },
  {
    icon: <Zap size={20} />,
    label: 'React Version',
    value: '19',
  },
  {
    icon: <Code size={20} />,
    label: 'CSS Approach',
    value: 'Modules',
  },
];

// Why React Creme USPs
export const USP_DATA = [
  {
    icon: <Zap size={32} />,
    title: '4x Lighter',
    description: 'At just 118kb, React Creme is 2.8x smaller than Material-UI and Ant Design. Faster load times, better Core Web Vitals, happier users.',
    highlight: '118kb vs 280kb+',
  },
  {
    icon: <Layers size={32} />,
    title: 'Modern Stack',
    description: 'Built with React 19, TypeScript 5.9 strict mode, and CSS Modules. No CSS-in-JS runtime overhead. No utility class verbosity.',
    highlight: 'React 19, Vite 6, TS 5.9',
  },
  {
    icon: <Code size={32} />,
    title: 'No Lock-in',
    description: 'Unlike Material-UI or Ant Design, React Creme has no opinionated design language. Your brand, your colors, your identity.',
    highlight: 'Your brand, not ours',
  },
];

// Comparison Table Data
export type ComparisonStatus = 'yes' | 'no' | 'partial';

export interface ComparisonRow {
  feature: string;
  reactCreme: ComparisonStatus | string;
  mui: ComparisonStatus | string;
  antDesign: ComparisonStatus | string;
  chakra: ComparisonStatus | string;
  shadcn: ComparisonStatus | string;
}

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Bundle Size',
    reactCreme: '~118kb',
    mui: '~350kb',
    antDesign: '~280kb',
    chakra: '~200kb',
    shadcn: 'Minimal',
  },
  {
    feature: 'React 19 Support',
    reactCreme: 'yes',
    mui: 'no',
    antDesign: 'no',
    chakra: 'no',
    shadcn: 'yes',
  },
  {
    feature: 'CSS Approach',
    reactCreme: 'Modules',
    mui: 'CSS-in-JS',
    antDesign: 'CSS-in-JS',
    chakra: 'CSS-in-JS',
    shadcn: 'Tailwind',
  },
  {
    feature: 'TypeScript Strict',
    reactCreme: 'yes',
    mui: 'partial',
    antDesign: 'partial',
    chakra: 'partial',
    shadcn: 'yes',
  },
  {
    feature: 'Design Opinion',
    reactCreme: 'Neutral',
    mui: 'Material',
    antDesign: 'Ant',
    chakra: 'Mild',
    shadcn: 'None',
  },
  {
    feature: 'npm Install',
    reactCreme: 'yes',
    mui: 'yes',
    antDesign: 'yes',
    chakra: 'yes',
    shadcn: 'no',
  },
  {
    feature: 'Dark Mode',
    reactCreme: 'yes',
    mui: 'yes',
    antDesign: 'yes',
    chakra: 'yes',
    shadcn: 'yes',
  },
  {
    feature: 'Tree-Shakeable',
    reactCreme: 'yes',
    mui: 'partial',
    antDesign: 'partial',
    chakra: 'partial',
    shadcn: 'yes',
  },
];

export const LIBRARY_NAMES = {
  reactCreme: 'React Creme',
  mui: 'Material-UI',
  antDesign: 'Ant Design',
  chakra: 'Chakra UI',
  shadcn: 'shadcn/ui',
} as const;

// Gallery Images for Showcase
export const SHOWCASE_GALLERY_IMAGES = [
  '/images/adrian.jpg',
  '/images/blue.jpg',
  '/images/gradient.jpg',
  '/images/nicole.jpg',
  '/images/pexels.jpeg',
  '/images/blurry.jpg',
];

// DataGrid Data for Showcase
export const SHOWCASE_GRID_DATA = [
  { Component: 'Button', 'Bundle Impact': '~2kb', Status: '✓ Ready' },
  { Component: 'DataGrid', 'Bundle Impact': '~8kb', Status: '✓ Ready' },
  { Component: 'Gallery', 'Bundle Impact': '~5kb', Status: '✓ Ready' },
  { Component: 'Switch', 'Bundle Impact': '~1.5kb', Status: '✓ Ready' },
  { Component: 'Rate', 'Bundle Impact': '~3kb', Status: '✓ Ready' },
];

// Navigation Links
export const NAV_LINKS = [
  { label: 'Components', path: '/buttons', external: false },
  { label: 'Documentation', path: '/home', external: false },
  { label: 'GitHub', path: 'https://github.com/prabhuignoto/react-creme', external: true },
];

// Hero Feature Items
export const HERO_FEATURES = [
  'TypeScript Strict Mode',
  'Zero Runtime CSS',
  'Tree-Shakeable',
];
