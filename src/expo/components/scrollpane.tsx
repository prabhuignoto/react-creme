import React from "react";
import { ScrollPane } from "../../components";

function scrollpane() {
  return (
    <div className="rc-demo-widgets">
      <div className="rc-demo-widget">
        <ScrollPane width={350} height={400} scrollBarWidth={5}>
          <div>
            Pellentesque id auctor erat, et scelerisque ex. Integer congue
            posuere lacus, vel tincidunt erat fermentum eget. Maecenas auctor
            risus purus, ultrices bibendum libero semper ac. consequat vehicula
            rutrum. Duis molestie libero vitae consequat suscipit. Vestibulum eu
            pellentesque turpis. Duis fringilla justo sit amet quam posuere, eu
            efficitur eros mollis. Suspendisse et quam ut elit luctus lacinia ut
            id leo. Nulla facilisi. Praesent vestibulum nunc id luctus placerat.
            Nunc mollis tincidunt dolor et rhoncus. Aliquam vitae egestas arcu.
            Suspendisse faucibus justo eu ligula mollis, sit amet semper est
            feugiat. Vivamus porta nec orci vel finibus. Duis pellentesque
            maximus neque in varius. Donec velit nulla, commodo in placerat in,
            fringilla a nisi. Proin eget vehicula urna. Vestibulum efficitur
            convallis feugiat. Pellentesque id auctor erat, et scelerisque ex.
            Integer congue posuere lacus, vel tincidunt erat fermentum eget.
            Maecenas auctor risus purus, ultrices bibendum libero semper ac.
            consequat vehicula
          </div>
        </ScrollPane>
      </div>
    </div>
  );
}

export default scrollpane;
