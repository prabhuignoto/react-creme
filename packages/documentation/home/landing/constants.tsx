import { Package, Layers, Zap, Code } from 'react-feather';

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
    description:
      'At just 118kb, React Creme is 2.8x smaller than Material-UI and Ant Design. Faster load times, better Core Web Vitals, happier users.',
    highlight: '118kb vs 280kb+',
    icon: <Zap size={32} />,
    title: '4x Lighter',
  },
  {
    description:
      'Built with React 19, TypeScript 5.9 strict mode, and CSS Modules. No CSS-in-JS runtime overhead. No utility class verbosity.',
    highlight: 'React 19, Vite 6, TS 5.9',
    icon: <Layers size={32} />,
    title: 'Modern Stack',
  },
  {
    description:
      'Unlike Material-UI or Ant Design, React Creme has no opinionated design language. Your brand, your colors, your identity.',
    highlight: 'Your brand, not ours',
    icon: <Code size={32} />,
    title: 'No Lock-in',
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
    antDesign: '~280kb',
    chakra: '~200kb',
    feature: 'Bundle Size',
    mui: '~350kb',
    reactCreme: '~118kb',
    shadcn: 'Minimal',
  },
  {
    antDesign: 'no',
    chakra: 'no',
    feature: 'React 19 Support',
    mui: 'no',
    reactCreme: 'yes',
    shadcn: 'yes',
  },
  {
    antDesign: 'CSS-in-JS',
    chakra: 'CSS-in-JS',
    feature: 'CSS Approach',
    mui: 'CSS-in-JS',
    reactCreme: 'Modules',
    shadcn: 'Tailwind',
  },
  {
    antDesign: 'partial',
    chakra: 'partial',
    feature: 'TypeScript Strict',
    mui: 'partial',
    reactCreme: 'yes',
    shadcn: 'yes',
  },
  {
    antDesign: 'Ant',
    chakra: 'Mild',
    feature: 'Design Opinion',
    mui: 'Material',
    reactCreme: 'Neutral',
    shadcn: 'None',
  },
  {
    antDesign: 'yes',
    chakra: 'yes',
    feature: 'npm Install',
    mui: 'yes',
    reactCreme: 'yes',
    shadcn: 'no',
  },
  {
    antDesign: 'yes',
    chakra: 'yes',
    feature: 'Dark Mode',
    mui: 'yes',
    reactCreme: 'yes',
    shadcn: 'yes',
  },
  {
    antDesign: 'partial',
    chakra: 'partial',
    feature: 'Tree-Shakeable',
    mui: 'partial',
    reactCreme: 'yes',
    shadcn: 'yes',
  },
];

export const LIBRARY_NAMES = {
  antDesign: 'Ant Design',
  chakra: 'Chakra UI',
  mui: 'Material-UI',
  reactCreme: 'React Creme',
  shadcn: 'shadcn/ui',
} as const;

// Gallery Images for Showcase - Nature backgrounds
export const SHOWCASE_GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop',
];

// DataGrid Data for Showcase
export const SHOWCASE_GRID_DATA = [
  { 'Bundle Impact': '~2kb', Component: 'Button', Status: '✓ Ready' },
  { 'Bundle Impact': '~8kb', Component: 'DataGrid', Status: '✓ Ready' },
  { 'Bundle Impact': '~5kb', Component: 'Gallery', Status: '✓ Ready' },
  { 'Bundle Impact': '~1.5kb', Component: 'Switch', Status: '✓ Ready' },
  { 'Bundle Impact': '~3kb', Component: 'Rate', Status: '✓ Ready' },
];

// Navigation Links
export const NAV_LINKS = [
  { external: false, label: 'Components', path: '/accordion' },
  { external: false, label: 'Documentation', path: '/home' },
  {
    external: true,
    label: 'GitHub',
    path: 'https://github.com/prabhuignoto/react-creme',
  },
];

// Hero Feature Items
export const HERO_FEATURES = [
  'TypeScript Strict Mode',
  'Zero Runtime CSS',
  'Tree-Shakeable',
];
