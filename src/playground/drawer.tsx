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
          width: "1200px",
          position: "relative",
        }}
      >
        {open && (
          <Drawer
            position="right"
            width={800}
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
