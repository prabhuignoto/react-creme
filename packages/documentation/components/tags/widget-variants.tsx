import { Tags } from '../../../lib/components';

const items = [
  { disabled: false, name: 'python' },
  { name: 'fortran' },
  { name: 'c sharp' },
  { name: 'Go lang' },
  { disabled: true, name: 'RUST' },
];

export const Default = (
  <Tags
    placeholder="Choose a language..."
    items={items}
    onChange={val => console.log(val)}
    tagWidth={70}
    focusable
  />
);

export const Disabled = (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={15}
    onChange={val => console.log(val)}
    tagWidth={70}
    tagStyle="fill"
  />
);

export const ReadOnly = (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={15}
    onChange={val => console.log(val)}
    readonly
    tagWidth={50}
  />
);

export const AutoComplete = (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={15}
    onChange={val => console.log(val)}
    autoComplete
    suggestions={['one', 'two']}
    tagWidth={75}
  />
);

export const Accent = (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={15}
    onChange={val => console.log(val)}
    tagWidth={75}
    tagStyle="fill"
    accent="rounded"
  />
);

export const LargeSize = (
  <Tags
    placeholder="Choose a language..."
    items={items}
    onChange={val => console.log(val)}
    tagWidth={100}
    size="lg"
  />
);

export const MaxTags = (
  <Tags
    placeholder="Choose a language..."
    items={items}
    maxTags={2}
    onChange={val => console.log(val)}
    tagWidth={70}
  />
);
