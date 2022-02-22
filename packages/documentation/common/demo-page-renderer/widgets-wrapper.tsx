import React, { ReactNode } from 'react';
import './widget-wrapper.scss';

const WidgetsWrapper: React.FunctionComponent<{
  children: ReactNode[] | ReactNode;
}> = ({ children }) => {
  return (
    <div className="rc-doc-widgets-wrapper">
      <div className="rc-doc-widgets-collection">{children}</div>
      <div className="rc-doc-links-wrapper"></div>
    </div>
  );
};

export default WidgetsWrapper;
