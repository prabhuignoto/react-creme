import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  CustomIcon,
  CustomSize,
  Default,
  RTL,
  SelectedIndex,
  Slash,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default" border={false}>
        <Text>
          Basic breadcrumb navigation with default chevron separators and small
          size. The breadcrumb trail shows the hierarchical path from root to
          current page, with each item being clickable for easy navigation back
          to parent pages.
        </Text>
        <DemoWidget name="BreadCrumb" width={450}>
          {Default}
        </DemoWidget>
        <InlineCodeViewer language="jsx">
          {jsxToString(Default, jsxToStringOptions)}
        </InlineCodeViewer>
      </Section>

      <Section size="md" title="Custom Icon - Slash" border={false}>
        <Text>
          The separator icon can be customized by setting the <code>icon</code>{' '}
          property to <code>slash</code>, <code>arrow</code>, or{' '}
          <code>chevron</code>. The slash style provides a more subtle,
          minimalist separator that works well in compact layouts or when you
          want less visual emphasis on the separators.
        </Text>
        <DemoWidget name="BreadCrumb" width={450}>
          {Slash}
        </DemoWidget>
        <InlineCodeViewer language="jsx">
          {jsxToString(Slash, jsxToStringOptions)}
        </InlineCodeViewer>
      </Section>

      <Section size="md" title="Custom Icon - Arrow" border={false}>
        <Text>
          The arrow icon provides a clear directional indicator showing
          navigation flow. This style is particularly effective for step-based
          processes or when you want to emphasize forward progression through
          the navigation hierarchy.
        </Text>
        <DemoWidget name="BreadCrumb" width={450}>
          {CustomIcon}
        </DemoWidget>
        <InlineCodeViewer language="jsx">
          {jsxToString(CustomIcon, jsxToStringOptions)}
        </InlineCodeViewer>
      </Section>

      <Section size="md" title="Selected Index" border={false}>
        <Text>
          Use <code>selectedCrumbIndex</code> to highlight a specific position
          in the breadcrumb trail. This is useful for indicating the current
          active page or section. In this example, the third item (index 2) is
          pre-selected, showing medium size styling.
        </Text>
        <DemoWidget name="BreadCrumb" width={450}>
          {SelectedIndex}
        </DemoWidget>
        <InlineCodeViewer language="jsx">
          {jsxToString(SelectedIndex, jsxToStringOptions)}
        </InlineCodeViewer>
      </Section>

      <Section size="md" title="Custom Size - Large" border={false}>
        <Text>
          The breadcrumb component supports three size variants:{' '}
          <code>sm</code> (default), <code>md</code> (medium), and{' '}
          <code>lg</code> (large). Larger sizes improve visibility and touch
          targets on mobile devices or when breadcrumbs are a primary
          navigation element. Choose the size that best fits your design system
          and use case.
        </Text>
        <DemoWidget name="BreadCrumb" width={400}>
          {CustomSize}
        </DemoWidget>
        <InlineCodeViewer language="jsx">
          {jsxToString(CustomSize, jsxToStringOptions)}
        </InlineCodeViewer>
      </Section>

      <Section size="md" title="Right-to-Left (RTL) Support" border={false}>
        <Text>
          Full RTL layout support for internationalization. When{' '}
          <code>RTL</code> is enabled, breadcrumbs automatically reverse their
          order and separator icons flip direction to match RTL reading
          patterns. Essential for applications supporting Arabic, Hebrew, and
          other right-to-left languages. The component maintains proper
          keyboard navigation (arrow keys work naturally) and accessibility in
          RTL mode.
        </Text>
        <DemoWidget name="BreadCrumb" width={400}>
          {RTL}
        </DemoWidget>
        <InlineCodeViewer language="jsx">
          {jsxToString(RTL, jsxToStringOptions)}
        </InlineCodeViewer>
      </Section>

      <Section size="md" title="Keyboard Navigation" border={false}>
        <Text>
          Breadcrumbs are fully keyboard accessible. Try it: click to focus the
          breadcrumb, then use <strong>Arrow Left/Right</strong> to navigate
          between items, <strong>Home</strong> to jump to the first item,{' '}
          <strong>End</strong> to jump to the last item, and{' '}
          <strong>Enter</strong> or <strong>Space</strong> to select an item.
          This ensures users who rely on keyboard navigation can efficiently
          move through the breadcrumb trail without using a mouse.
        </Text>
        <DemoWidget name="BreadCrumb" width={450}>
          {Default}
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
