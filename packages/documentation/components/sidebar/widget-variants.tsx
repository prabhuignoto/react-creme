import { Sidebar } from '../../../lib/components';

export const Default = (
  <Sidebar
    groups={[
      {
        items: [{ name: 'tester' }, { name: 'tester 2' }],
        title: 'Section 1',
      },
      {
        items: [{ name: 'tester' }, { name: 'tester 2' }],
        title: 'Section 2',
      },
    ]}
  />
);

export const Searchable = (
  <Sidebar
    enableSearch
    focusable
    groups={[
      {
        items: [{ name: 'tester' }],
        title: 'Section 1',
      },
      {
        items: [{ name: 'tester' }, { name: 'tester 2' }],
        title: 'Section 2',
      },
      {
        items: [{ name: 'tester' }],
        title: 'Section 3',
      },
    ]}
  />
);
