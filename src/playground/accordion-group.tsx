import React from "react";
import { AccordionGroup } from "../components";

function accordionGroup() {
  return (
    <div style={{ height: "600px", width: "600px" }}>
      <AccordionGroup titles={["one", "two", "three", "image"]}>
        <p>
          Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit amet
          justo vel, convallis volutpat neque. Morbi semper odio sed diam
          tristique, nec tempor neque tempus. Praesent quis ultrices odio. Nulla
          vestibulum nulla sed massa molestie, quis vulputate risus semper.
          Phasellus elementum, metus in iaculis sollicitudin, risus elit
          pulvinar neque, eget pulvinar odio libero eu mi. Vivamus id leo
          facilisis, tincidunt lacus semper, condimentum est. Nam euismod non
          eros a lacinia. Nam in maximus quam. Pellentesque dignissim risus sed
          tellus fringilla vehicula. Quisque dapibus ex in eros iaculis
          ullamcorper. Nulla cursus tortor vitae rutrum tincidunt. Nunc sit amet
          lectus ac arcu suscipit bibendum. Nam eu aliquam dolor. Nam in gravida
          ipsum. In et urna laoreet, placerat erat in, tempor lacus.
        </p>
        <p>
          Sed convallis aliquet eros sit amet maximus. Nunc orci est, faucibus
          ut dolor et, pretium volutpat nunc. Fusce at ante eget nulla laoreet
          scelerisque eget id justo. Mauris porttitor mi dolor, ut pretium orci
          luctus a. Integer posuere mauris tempor velit aliquet, sed suscipit
          mauris porta. In nisi lorem, dapibus sed lorem vitae, condimentum
          finibus nibh. Etiam laoreet arcu nec sollicitudin fermentum. Aenean
          rhoncus feugiat nibh a tristique. Duis congue arcu velit, vitae
          blandit sem blandit non. Donec lectus orci, tristique id fringilla ac,
          gravida posuere ligula. Maecenas ac lacus rutrum, vestibulum nulla
          tincidunt, interdum arcu. Nam vel interdum libero.
        </p>
        <p>
          Nam faucibus ac magna ac hendrerit. Aenean pulvinar tempus hendrerit.
          Proin vitae posuere lectus. Maecenas convallis enim sit amet sem
          gravida, eu cursus lacus placerat. Nunc a venenatis quam. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. In vel ipsum augue. Etiam
          blandit, erat a lacinia dapibus, risus ex molestie erat, eget sagittis
          est turpis id lorem. Nunc bibendum pretium velit eget ornare. Donec
          sollicitudin odio nec odio posuere egestas. Pellentesque eu rhoncus
          massa. Etiam id urna lacus. Integer ante diam, volutpat non
          condimentum a, lobortis non eros.
        </p>
        <div
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          <img
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            src="https://images.unsplash.com/photo-1635449586099-3ecb7ef8374d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
          />
        </div>
      </AccordionGroup>
    </div>
  );
}

export default accordionGroup;
