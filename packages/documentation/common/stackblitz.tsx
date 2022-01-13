import sdk from "@stackblitz/sdk";
import React, { useCallback } from "react";
import { Progress } from "../../lib/components";
import "./stackblitz.scss";

interface StackBlitzProps {
  id?: string;
}

const StackBlitz: React.FunctionComponent<StackBlitzProps> = ({ id }) => {
  const [loaded, setLoaded] = React.useState(false);

  const onRef = useCallback(async (node) => {
    if (node) {
      await sdk.embedProjectId(node, id, {
        openFile: "index.tsx",
        height: "100%",
        hideExplorer: true,
        hideNavigation: true,
      });
      setLoaded(true);
    }
  }, []);

  return (
    <div className="stackblitz-container">
      {!loaded && (
        <div className="stackblitz-loading">
          <Progress type="infinite" size="sm" />
        </div>
      )}
      <div ref={onRef} className="stackblitz-editor"></div>
    </div>
  );
};

export default StackBlitz;
