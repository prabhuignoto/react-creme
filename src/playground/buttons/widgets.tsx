import React from "react";
import { Button } from "../../components";
import { SearchIcon } from "../../icons";

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <div className="rc-demo-widget">
        <Button
          border={false}
          label="I am disabled"
          disabled
          onClick={() => alert("test")}
        />
      </div>
      <div className="rc-demo-widget">
        <Button label="save as new" type="primary" size="md" border={false} />
      </div>
      <div className="rc-demo-widget">
        <Button label="save as new" type="danger" size="lg" />
      </div>
      <div className="rc-demo-widget">
        <Button label="save" onClick={() => alert("test")} />
      </div>
      <div className="rc-demo-widget">
        <Button label="Search this page" size="sm">
          <SearchIcon />
        </Button>
      </div>
      <div className="rc-demo-widget">
        <Button label="Searching ..." size="sm" type="progress"></Button>
      </div>
    </div>
  );
}

export default widgets;
