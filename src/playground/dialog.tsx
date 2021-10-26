import React, { useRef, useState } from "react";
import { Button, Dialog } from "../components";

function dialog() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  return (
    <div>
      <Button onClick={() => setOpen(true)} label="Open dialog"></Button>
      <div
        style={{
          height: "600px",
          width: "900px",
          position: "relative",
        }}
      >
        {open && (
          <Dialog onClose={() => setOpen(false)} containedToParent={ref}>
            <span>sinthanai, suvai, vetri mani ADICHU</span>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default dialog;
