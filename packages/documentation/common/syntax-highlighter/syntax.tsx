import { ReactNode } from 'react';
import jsxToString from 'react-element-to-jsx-string';
import { SyntaxHighLighter } from '.';

/**
 * Custom display name getter for React.memo wrapped components
 * Fixes issue where react-element-to-jsx-string shows "UnknownElementType"
 * for memoized components in React 19
 */
const getDisplayName = (element: ReactNode): string => {
  // Type assertion to access internal React properties
  const reactElement = element as any;

  // For React.memo wrapped components, check the render function's displayName
  if (reactElement?.type?.render?.displayName) {
    return reactElement.type.render.displayName;
  }
  // For regular components, check displayName directly
  if (reactElement?.type?.displayName) {
    return reactElement.type.displayName;
  }
  // Fallback to function name
  if (reactElement?.type?.name) {
    return reactElement.type.name;
  }
  // Final fallback
  return 'Component';
};

export const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
  useFragmentWithSingleChildren: true,
  displayName: getDisplayName,
};

const Code: React.FunctionComponent<{
  children?: ReactNode;
  code?: string;
  name?: string;
  wrap?: boolean;
}> = ({ children, code, name, wrap }) => {
  return code ? (
    <SyntaxHighLighter code={code} name={name} wrap={wrap}></SyntaxHighLighter>
  ) : (
    <SyntaxHighLighter
      code={jsxToString(children, jsxToStringOptions)}
      name={name}
      wrap={wrap}
    ></SyntaxHighLighter>
  );
};

export { Code };
