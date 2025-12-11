import { Package, Layers, Zap, Code } from 'lucide-react';

// Stats Bar Data
export const STATS_DATA = [
  {
    icon: <Package size={20} />,
    label: 'Full bundle (gzip)',
    value: '~119 KB',
  },
  {
    icon: <Zap size={20} />,
    label: 'CSS bundle (gzip)',
    value: '~47 KB',
  },
  {
    icon: <Code size={20} />,
    label: 'Namespaces',
    value: '9 entry points',
  },
  {
    icon: <Layers size={20} />,
    label: 'Components',
    value: '57',
  },
];

// Why React Creme USPs
export const USP_DATA = [
  {
    description:
      'Full library ships at ~119 KB gzipped (ESM) with namespaced entry points to keep individual bundles lean and a ~47 KB gzipped CSS bundle.',
    highlight: '~119 KB gzip (full ESM)',
    icon: <Zap size={32} />,
    title: 'Lightweight',
  },
  {
    description:
      'Built for React 19 with TypeScript 5.9 strict mode and CSS Modules. No CSS-in-JS runtime overhead.',
    highlight: 'React 19, Vite 6, TS 5.9',
    icon: <Layers size={32} />,
    title: 'Modern Stack',
  },
  {
    description:
      'Neutral design defaults so you can apply your own brand tokens without fighting preset themes.',
    highlight: 'Your brand, your colors',
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
    antDesign: 'Varies',
    chakra: 'Varies',
    feature: 'Bundle Size',
    mui: 'Varies',
    reactCreme: '~119kb (full ESM, gzip)',
    shadcn: 'Varies',
  },
  {
    antDesign: 'Check docs',
    chakra: 'Check docs',
    feature: 'React 19 Support',
    mui: 'Check docs',
    reactCreme: 'yes',
    shadcn: 'yes',
  },
  {
    antDesign: 'Compiled CSS',
    chakra: 'CSS-in-JS',
    feature: 'CSS Approach',
    mui: 'CSS-in-JS',
    reactCreme: 'Modules',
    shadcn: 'Tailwind',
  },
  {
    antDesign: 'Check docs',
    chakra: 'Check docs',
    feature: 'TypeScript Strict',
    mui: 'Check docs',
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
  { 'Bundle Impact': 'Low', Component: 'Button', Status: '✓ Ready' },
  { 'Bundle Impact': 'Low', Component: 'DataGrid', Status: '✓ Ready' },
  { 'Bundle Impact': 'Low', Component: 'Gallery', Status: '✓ Ready' },
  { 'Bundle Impact': 'Low', Component: 'Switch', Status: '✓ Ready' },
  { 'Bundle Impact': 'Low', Component: 'Rate', Status: '✓ Ready' },
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
