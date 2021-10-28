import React from "react";
import { Accordion } from "../components";

function accordion() {
  return (
    <div style={{ height: "500px", width: "500px" }}>
      <Accordion title="accordion title" noBorder>
        <p>
          Sed laoreet neque eget sem varius, et interdum dui venenatis.
          Suspendisse in faucibus tortor, nec aliquet arcu. Quisque at lorem sed
          est pretium bibendum. Etiam semper iaculis semper. Proin auctor velit
          massa, euismod pretium dui euismod in. Pellentesque rhoncus eros id
          posuere tincidunt. Maecenas quis libero vitae elit consectetur finibus
          et ac libero. Donec at fermentum lectus. Cras iaculis augue non mauris
          interdum, vitae pretium mi blandit. Aenean ultrices pellentesque
          lectus ac faucibus. Morbi tristique vulputate nisi, id porttitor diam
          egestas a. Suspendisse a tortor suscipit, accumsan massa at, viverra
          urna. Maecenas vel lectus sodales, dapibus dolor eget, pharetra neque.
          Nam eleifend id mauris in suscipit. Ut sed risus at mi vulputate
          rhoncus.
        </p>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here, content here, making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for lorem ipsum will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </Accordion>
      <br></br>
      <br></br>
      <Accordion title="Show Image">
        <div
          style={{
            width: "500px",
            height: "400px",
          }}
        >
          <img
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            src="https://images.unsplash.com/photo-1635276080002-e1b219f8414f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1447&q=80"
          />
        </div>
      </Accordion>
    </div>
  );
}

export default accordion;
