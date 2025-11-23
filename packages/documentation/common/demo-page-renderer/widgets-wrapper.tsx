import { ReactNode } from 'react';
import './widget-wrapper.scss';

/**
 * Simple wrapper for demo widgets
 * Note: The old TOC implementation has been removed and replaced with
 * the modern TableOfContents component in App.tsx
 */
const WidgetsWrapper: React.FunctionComponent<{
  children: ReactNode[] | ReactNode;
}> = ({ children }) => {
  return (
    <div className="rc-doc-widgets-wrapper">
      <div className="rc-doc-widgets-collection">{children}</div>
    </div>
  );
};

export default WidgetsWrapper;
