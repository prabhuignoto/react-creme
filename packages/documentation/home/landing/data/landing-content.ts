interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface CapabilityCard {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export const featureCards: FeatureCard[] = [
  {
    icon: '⚡',
    title: 'Enterprise-Grade UI Components',
    description:
      'Build professional applications with our comprehensive suite of beautiful and robust React components.',
  },
  {
    icon: '🎨',
    title: 'Deep Customization',
    description:
      'Achieve pixel-perfect designs with highly customizable UI elements and fine-grained control over appearance.',
  },
  {
    icon: '📚',
    title: 'Extensive Component Library',
    description:
      'Access 45+ high-quality UI components, ready to integrate into common and complex application scenarios.',
  },
  {
    icon: '♿',
    title: 'Accessibility First',
    description:
      'Ensure inclusivity with fully accessible UI components, featuring keyboard navigation and screen reader support.',
  },
  {
    icon: '🎯',
    title: 'Flexible Color Schemes',
    description:
      'Seamlessly adapt components to your brand identity with robust support for custom color schemes and theming.',
  },
  {
    icon: '🛡️',
    title: 'TypeScript Powered',
    description:
      'Build with confidence using TypeScript for type-safe, maintainable, and scalable applications.',
  },
  {
    icon: '🌓',
    title: 'Light & Dark Mode',
    description:
      'Effortlessly implement modern UI aesthetics with out-of-the-box support for both light and dark themes.',
  },
  {
    icon: '⚙️',
    title: 'Developer-Friendly',
    description:
      'Streamline your workflow with easily configurable components that provide sensible defaults for rapid development.',
  },
];

export const capabilityCards: CapabilityCard[] = [
  {
    icon: '🔄',
    title: 'Bi-directional Support',
    description:
      'Full RTL (Right-to-Left) support built into every component, enabling seamless internationalization for global applications.',
    features: [
      'Simple RTL toggle for all components',
      'Automatic layout mirroring',
      'Optimized for multilingual interfaces',
    ],
  },
  {
    icon: '🎨',
    title: 'Advanced Theme System',
    description:
      'Dynamic theming capabilities that go beyond basic light and dark modes with support for custom color palettes and granular styling.',
    features: [
      'Runtime theme switching',
      'Custom color palette generation',
      'Component-level style customization',
    ],
  },
  {
    icon: '♿',
    title: 'Superior Accessibility',
    description:
      'Industry-leading accessibility features integrated at the core level, ensuring compliance with WCAG standards out of the box.',
    features: [
      'ARIA attributes automatically applied',
      'Focus management system',
      'Screen reader optimizations',
    ],
  },
  {
    icon: '⚡',
    title: 'Lightweight Performance',
    description:
      'Meticulously optimized components with minimal bundle size impact and intelligent rendering strategies for maximum performance.',
    features: [
      'Tiny 42kb core footprint',
      'Tree-shakable architecture',
      'Virtualized rendering for large datasets',
    ],
  },
  {
    icon: '✨',
    title: 'Built-in Animation System',
    description:
      'Smooth, high-performance animations and transitions that enhance user experience without compromising performance.',
    features: [
      'Hardware-accelerated transitions',
      'Customizable animation durations',
      'Reduced motion preference support',
    ],
  },
  {
    icon: '🛠️',
    title: 'Developer Experience',
    description:
      'Thoughtfully designed API with comprehensive TypeScript definitions and consistent patterns that boost developer productivity.',
    features: [
      'Consistent prop patterns',
      'Detailed TypeScript definitions',
      'Extensive documentation and examples',
    ],
  },
];
