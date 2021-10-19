import React from "react";
import { Carousel } from "../components";

function carousel() {
  return (
    <div>
      <Carousel direction="horizontal">
        <img src="https://images.unsplash.com/photo-1634482899782-a103fabb58de?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        <img src="https://images.unsplash.com/photo-1634323026799-f2351f5f3a40?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        <img src="https://images.unsplash.com/photo-1634437543707-61581cf687fb?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        <img src="https://images.unsplash.com/photo-1634485943932-e988dec10fd7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2342&q=80" />
        <span>1233</span>
      </Carousel>
    </div>
  );
}

export default carousel;
