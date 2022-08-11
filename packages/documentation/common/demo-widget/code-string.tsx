import { FunctionComponent, ReactNode } from 'react';
import { Code } from '../syntax-highlighter/syntax';

const CodeString: FunctionComponent<{
  children?: ReactNode;
  code?: string;
  component?: ReactNode;
  name?: string;
}> = ({ code, name, component, children }) => {
  return code ? (
    <Code code={code} name={name} />
  ) : (
    <Code name={name}>{component || children}</Code>
  );
};

export default CodeString;
