import sdk from '@stackblitz/sdk';
import { useCallback, useState } from 'react';
import { Progress } from '../../../lib/components';
import './stackblitz.scss';

interface StackBlitzProps {
  id?: string;
}

const StackBlitz: React.FunctionComponent<StackBlitzProps> = ({ id }) => {
  const [loaded, setLoaded] = useState(false);

  const onRef = useCallback(
    node => {
      if (node) {
        sdk
          .embedProjectId(node, id, {
            height: '100%',
            hideExplorer: true,
            hideNavigation: true,
            openFile: 'index.tsx',
          })
          .then(() => {
            setLoaded(true);
          });
      }
    },
    [id]
  );

  return (
    <div className="stackblitz-container">
      {!loaded && (
        <div className="stackblitz-loading">
          <Progress type="indeterminate" size="sm" />
        </div>
      )}
      <div ref={onRef} className="stackblitz-editor"></div>
    </div>
  );
};

export default StackBlitz;
