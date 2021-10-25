import React from "react";
import { Carousel } from "../components";

function carousel() {
  return (
    <>
      <div style={{ height: "500px", width: "700px" }}>
        <Carousel direction="horizontal">
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1474&q=80" />
          <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1274&q=80" />
          <img src="https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1476&q=80" />
          <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80" />
          <span>1233</span>
        </Carousel>
      </div>
      <br></br>
      <br></br>
      <div style={{ height: "400px", width: "500px" }}>
        <Carousel direction="vertical">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
            tempor nunc, quis gravida justo. Proin sed pellentesque odio. In
            congue leo lacus, ac fringilla arcu gravida a. Ut ac interdum risus.
            Maecenas lacinia vulputate lorem, in dignissim magna faucibus quis.
            Phasellus augue erat, maximus non turpis eget, egestas venenatis
            turpis. Sed elementum porttitor eleifend. Nulla tincidunt lobortis
            libero eu fringilla. Curabitur congue ac libero ac porta. Proin quam
            risus, pharetra lacinia tristique a, mollis at ipsum. Integer
            pellentesque dignissim erat, sed fermentum eros malesuada eget.
            Quisque ullamcorper et augue at facilisis. Aliquam vel urna sapien.
            Sed id ullamcorper ex, vel sagittis sapien. Aliquam mattis ante sit
            amet imperdiet consectetur. Morbi sagittis mi nec ante scelerisque
            rutrum.
          </p>
          <p>
            Proin cursus nisl libero, scelerisque finibus felis mattis nec. Sed
            porta nunc vitae augue semper maximus. In euismod fermentum leo eget
            rutrum. Mauris rutrum, dui non venenatis blandit, tortor velit
            finibus urna, in ultrices lectus sapien sit amet sapien. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Phasellus vel metus eget quam mollis porta. Integer
            at nisi elementum, varius mauris eget, consectetur neque. Integer id
            turpis non nisi posuere venenatis.
          </p>
          <p>
            Nulla lacinia nibh sit amet tortor rhoncus, et fringilla diam
            scelerisque. Nullam diam elit, malesuada in tincidunt id, interdum
            non urna. Nullam libero neque, egestas non facilisis et, egestas vel
            mi. Aenean volutpat velit id lectus venenatis tincidunt. Vestibulum
            et nisl dolor. Suspendisse vel ipsum ut neque laoreet auctor id
            varius magna. Donec in nisl rutrum, facilisis leo id, ultrices ex.
            Vivamus quis lacus ac est semper cursus et et ex. In a dictum
            turpis. Nam pharetra diam eu finibus varius. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Sed consectetur ultricies lacinia. Donec justo enim,
            ultricies eget blandit vehicula, blandit ut purus. Fusce fringilla
            venenatis lorem, quis imperdiet arcu porta sit amet. Donec ut risus
            quis justo maximus tincidunt. Curabitur vehicula nisl vitae dui
            mattis lobortis.
          </p>
        </Carousel>
      </div>
    </>
  );
}

export default carousel;
