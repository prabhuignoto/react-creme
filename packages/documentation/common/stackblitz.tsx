import sdk from "@stackblitz/sdk";
import React, { useCallback } from "react";
import "./stackblitz.scss";

interface StackBlitzProps {
  id?: string;
}

const StackBlitz: React.FunctionComponent<StackBlitzProps> = ({ id }) => {
  const onRef = useCallback((node) => {
    if (node) {
      sdk.embedProjectId(node, id, {
        openFile: "index.tsx",
        height: "100%",
        hideExplorer: true,
        hideNavigation: true,
      });
    }
  }, []);

  return <div ref={onRef} className="stackblitz-container"></div>;
};

export default StackBlitz;
