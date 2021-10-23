import React from "react";
import { ImageComparer } from "../components";

function comparer() {
  return (
    <div style={{ height: "500px", width: "600px" }}>
      <ImageComparer>
        <img src="https://images.unsplash.com/photo-1634747037495-3a209f58cfb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80" />
        <img src="https://images.unsplash.com/photo-1634747037495-3a209f58cfb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80" />
      </ImageComparer>
    </div>
  );
}

export default comparer;
