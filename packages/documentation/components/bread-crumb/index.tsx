import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function BreadCrumb() {
  return (
    <DemoPageRenderer
      properties={[
        {
          default: '[]',
          description:
            '<strong>Required.</strong> Array of breadcrumb labels representing the navigation hierarchy from root to current page',
          name: 'links',
          optional: 'No',
          type: 'string[]',
        },
        {
          default: 'undefined',
          description:
            'Callback invoked when user clicks or navigates to a breadcrumb item. Receives the selected breadcrumb label as parameter: <code>(selected?: string) => void</code>',
          name: 'onSelected',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: '"chevron"',
          description:
            'Separator icon style displayed between breadcrumb items. Options: <code>"chevron"</code> (›), <code>"arrow"</code> (→), or <code>"slash"</code> (—)',
          name: 'icon',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: '"sm"',
          description:
            'Visual size of breadcrumb text and icons. Options: <code>"sm"</code> (small), <code>"md"</code> (medium), <code>"lg"</code> (large)',
          name: 'size',
          optional: 'Yes',
          type: 'String',
        },
        {
          default: 'true',
          description:
            'Enables keyboard navigation with arrow keys (←/→), Home (first item), and End (last item). Set to <code>false</code> to disable keyboard interaction',
          name: 'focusable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '0',
          description:
            'Zero-based index of the initially selected breadcrumb item. Use this to highlight a specific position in the navigation trail',
          name: 'selectedCrumbIndex',
          optional: 'Yes',
          type: 'Number',
        },
        {
          default: 'false',
          description:
            'Renders breadcrumbs in right-to-left layout for RTL languages (Arabic, Hebrew, etc.). Icons and navigation order are automatically reversed',
          name: 'RTL',
          optional: 'Yes',
          type: 'Boolean',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'StackBlitz', 'RTL Support']}
      features={[
        'Full keyboard navigation (Arrow keys, Home, End)',
        'Three size variants (sm, md, lg)',
        'Customizable separator icons (chevron, arrow, slash)',
        'Right-to-left (RTL) layout support for international applications',
        'WCAG 2.1 AA compliant with semantic HTML and ARIA attributes',
        'Automatic focus management and visual indicators',
        'Click and keyboard selection callbacks',
        'Lightweight and performant with React.memo optimization',
      ]}
      demoWidget={<Widgets />}
      title="Bread Crumb"
      sourceId="breadcrumb/breadcrumb.tsx"
      editId="bread-crumb"
      description="Breadcrumbs provide hierarchical navigation that shows users their current location within the site structure and enables quick access to parent pages. Essential for improving user wayfinding in applications with deep navigation hierarchies, breadcrumbs reduce cognitive load and provide contextual awareness. Fully accessible with keyboard navigation and screen reader support."
    ></DemoPageRenderer>
  );
}

export default BreadCrumb;
