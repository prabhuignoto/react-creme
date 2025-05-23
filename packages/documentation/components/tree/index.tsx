import DemoPageRenderer from '../../common/demo-page-renderer';
import Widgets from './widgets';

function tree() {
  return (
    <DemoPageRenderer
      title="Tree"
      description={`A tree view or an outline view is a graphical  element that presents a hierarchical view of information.
      Each item (often called a branch or a node) can have a number of subitems`}
      sourceId="tree/tree.tsx"
      editId="tree"
      features={['Support for both single and multi selection', 'Custom sizes']}
      properties={[
        {
          default: '[]',
          description: 'The tree nodes to display in the tree',
          name: 'nodes',
          optional: 'Yes',
          type: 'Array',
        },
        {
          default: 'False',
          description: 'Whether the tree is selectable',
          name: 'selectable',
          optional: 'Yes',
          type: 'Boolean',
        },
        {
          default: '',
          description: 'Callback for when the selection changes',
          name: 'onChange',
          optional: 'Yes',
          type: 'Function',
        },
        {
          default: 'sm',
          description:
            "The size of the tree nodes. Can be 'sm', 'md' or 'lg'. Controls the size of the fonts and icons.",
          name: 'size',
          optional: 'Yes',
          type: 'string',
        },
      ]}
      tabTitles={['Examples', 'Properties', 'Stackblitz']}
      demoWidget={<Widgets />}
    ></DemoPageRenderer>
  );
}

export default tree;
