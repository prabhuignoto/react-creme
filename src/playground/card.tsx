import React from "react";
import { Card } from "../components/card/card";

function card() {
  return (
    <div style={{ width: "600px" }}>
      <Card
        alignHeader="left"
        header={<span>header</span>}
        footer={<span>footer</span>}
        minHeight={400}
      ></Card>
    </div>
  );
}

export default card;
