const text = `
      <p>
        Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit amet justo
        vel, convallis volutpat neque. Morbi semper odio sed diam tristique, nec
        tempor neque tempus. Praesent quis ultrices odio. Nulla vestibulum nulla
        sed massa molestie, quis vulputate risus semper. Phasellus elementum,
        metus in iaculis sollicitudin, risus elit pulvinar neque, eget pulvinar
        odio libero eu mi. Vivamus id leo facilisis, tincidunt lacus semper,
        condimentum est. Nam euismod non eros a lacinia.
      </p>
`;

export const AutoClosing = `const App = () => {
  return (
    <AccordionGroup
      titles={['one', 'two', 'three']}
      autoClose
      border={false}
      size="sm"
    >
      ${text.repeat(3)}
    </AccordionGroup>
  );
`;

export const CustomIconCode = `const App = () => {
   return (
     <AccordionGroup
      titles={['one', 'two', 'three', 'four']}
      border={false}
      iconType="plus"
    >
        ${text.repeat(4)}
    </AccordionGroup>
  );
`;

export const RTLCode = `const App = () => {
  return (
    <AccordionGroup
      titles={['one', 'two', 'three', 'four']}
      border
      alignIconRight
    >
      ${text.repeat(4)}
    </AccordionGroup>
  )
}`;

export const MediumSizedCode = `const App = () => {
  return (
    <AccordionGroup
      titles={['one', 'two', 'three', 'four']}
      border={false}
      size="md"
    >
      ${text.repeat(4)}
    </AccordionGroup>
  )
}`;

export const LargeSizedCode = `const App = () => {
  return (
    <AccordionGroup
      titles={['one', 'two', 'three', 'four']}
      border={false}
      size="lg"
    >
      ${text.repeat(4)}
    </AccordionGroup>
  )
}`;

export const DefaultCode = `const App = () => {
  return (
    <AccordionGroup titles={['one', 'two']}>
      ${text}
      <div
        style={{
          height: '400px',
          width: '100%',
        }}
      >
        <Image src="https://bit.ly/3i9PcxC"></Image>
      </div>
    </AccordionGroup>
  );
}`;

export const InitialStateCode = `const App = () => {
  return (
    <AccordionGroup
      titles={['one', 'two']}
      autoClose={false}
      border={false}
      expanded
      focusable
    >
      ${text}
      <div
        style={{
          height: '300px',
          width: '100%',
        }}
      >
        <Image src="https://bit.ly/3i9PcxC"></Image>
      </div>
    </AccordionGroup>
  );
}`;
