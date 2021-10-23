import React, { useRef, useState } from "react";
import { Button, Drawer } from "../components";

function drawer() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  return (
    <div>
      <Button onClick={() => setOpen(true)} label="Open drawer"></Button>
      <div
        style={{
          height: "600px",
          width: "900px",
          position: "relative",
        }}
      >
        {open && (
          <Drawer
            position="top"
            width={300}
            onClose={() => setOpen(false)}
            containedToParent={ref}
          >
            <span>This is a test</span>
          </Drawer>
        )}
      </div>
    </div>
  );
}

export default drawer;
