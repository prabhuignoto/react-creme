import React from "react";
import { Rate } from "../../components/rate/rate";
import { SearchIcon } from "../../icons";

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <div className="rc-demo-widget">
        <Rate
          onChange={(val) => alert(val)}
          ratingValues={["one", "two", "three", "four", "five"]}
        />
      </div>
      <div className="rc-demo-widget">
        <Rate size="md" />
      </div>
      <div className="rc-demo-widget">
        <Rate size="lg" iconCount={3} focusable={false} value={3} />
      </div>
      <div className="rc-demo-widget">
        <Rate size="md" icon={<SearchIcon />} iconCount={7} />
      </div>
    </div>
  );
}

export default widgets;
