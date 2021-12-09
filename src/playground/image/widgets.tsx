import React from "react";
import { Section } from "../../components";
import { Image } from "../../components/image/image";

function widgets() {
  return (
    <div className={"rc-demo-widgets"}>
      <Section>
        <div className="rc-demo-widget">
          <Image
            width={150}
            height={150}
            src="https://images.unsplash.com/photo-1637196268676-ccfe49d8ba1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          />
          <Image
            width={150}
            height={150}
            src="https://images.unsplash.com/photo-1637247474589-e948ee383422?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
          />
        </div>
      </Section>
      <Section>
        <div className="rc-demo-widget">
          <Image
            width={300}
            height={200}
            expandImageOnClick
            src="https://images.theconversation.com/files/252882/original/file-20190108-32145-zkc40y.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
          />
          <Image
            width={300}
            height={200}
            expandImageOnClick
            src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
          />
        </div>
      </Section>
    </div>
  );
}

export default widgets;
