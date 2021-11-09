import React from "react";
import { Card } from "../components/card/card";
import { Skeleton } from "../components/skeleton/skeleton";

function card() {
  return (
    <div style={{ width: "600px" }}>
      <Card
        alignHeader="left"
        header={<h2>header</h2>}
        footer={<span>footer</span>}
        minHeight={400}
      >
        <Skeleton
          animate
          rowHeight={10}
          rows={10}
          style={{ marginTop: "1rem" }}
          showCircle
        ></Skeleton>
      </Card>
    </div>
  );
}

export default card;
