import React, { useRef, useState } from "react";
import { useTimer } from "use-timer";
import "./App.css";
import { Carousel, Dialog, Drawer, MenuBar, Tooltip } from "./components";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";

function App() {
  const { time, start, pause, reset, status } = useTimer({
    endTime: 40,
    interval: 100,
  });

  const [open, setOpen] = useState(false);
  const ref = useRef();

  return (
    <div className="App">
      <button onClick={() => setOpen((prev) => !prev)}>open</button>
      {/* <div>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Stop</button>
      </div> */}
      {/* <div style={{ width: "500px" }}>
        <Tags
          items={[
            { name: "prabhu", disabled: true },
            { name: "ramya" },
            { name: "tester", disabled: true },
          ]}
          maxTags={5}
          restrictToValues={["one", "two"]}
          onSelected={(val) => console.log(val)}
        />
      </div> */}
      {/* <div style={{ width: "350px" }}>
        <Dropdown
          options={[
            {
              name: "indiaindia",
              value: "indiaindia",
            },
            { name: "usa", value: "usa" },
            { name: "uk", value: "uk" },
            { name: "germany", value: "germany", disabled: true },
            { name: "pakistan", value: "pakistan" },
            { name: "srilanka", value: "srilanka" },
            { name: "india", value: "india" },
            { name: "usa", value: "usa" },
            { name: "uk", value: "uk" },
            { name: "germany", value: "germany", disabled: true },
            { name: "pakistan", value: "pakistan" },
            { name: "srilanka", value: "srilanka" },
          ]}
        />
      </div> */}
      {/* <div style={{ width: "450px" }}>
        <List
          allowMultipleSelection
          options={[
            {
              name: "indiaindia",
              value: "indiaindia",
            },
            { name: "usa", value: "usa", selected: true },
            { name: "uk", value: "uk", selected: true },
            { name: "germany", value: "germany", disabled: true },
            { name: "pakistan", value: "pakistan" },
            { name: "srilanka", value: "srilanka" },
            { name: "india", value: "india" },
            { name: "usa", value: "usa" },
            { name: "uk", value: "uk" },
            { name: "germany", value: "germany", disabled: true },
            { name: "pakistan", value: "pakistan" },
            { name: "srilanka", value: "srilanka" },
          ]}
        />
      </div> */}
      <div style={{ width: "800px" }}>
        <Carousel direction="vertical">
          <span>one</span>
          <span>two</span>
          <span>three</span>
          <span>56</span>
          <span>two</span>
          <span>three</span>
          <span>one</span>
          <span>two</span>
          <span>1233</span>
        </Carousel>
      </div>
      {/* <Button label="save as new" disabled onClick={() => alert("rama")} />
      <Button
        label="save as new"
        type="primary"
        onClick={() => alert("rama")}
      />
      <Button label="save as new" type="danger" onClick={() => alert("rama")} />
      <Button label="save as new" onClick={() => alert("rama")} /> */}
      {/* <div
        style={{
          height: "600px",
          width: "900px",
          position: "relative",
        }}
        ref={ref}
      >
        {open && (
          <Dialog
            title="Confirm the action"
            showClose={false}
            onClose={() => setOpen((prev) => !prev)}
          >
            <span>tests</span>
          </Dialog>
        )}
      </div> */}
      {/* <CheckBox label="select" onChange={(ele) => console.log(ele)} /> */}
      {/* <Switch label="setting" disabled /> */}
      {/* <div style={{ width: "200px" }}>
        <Input>
          <ChevronRightIcon />
        </Input>
      </div> */}
      {/* <div style={{ width: "800px" }}>
        <Transfer
          list1={["one", "two", "five", "six"]}
          list2={["three", "four", "seven", "eight"]}
          onChange={(val, val2) => console.log(val, val2)}
        />
      </div> */}
      {/* <div
        style={{
          height: "600px",
          width: "900px",
          position: "relative"
        }}
        ref={ref}
      >
        {open && (
          <Drawer
            position="top"
            width={300}
            onClose={() => setOpen(false)}
            // containedToParent={ref}
          >
            <span>This is a test</span>
          </Drawer>
        )}
      </div> */}
      {/* <Progress
        type="progressive"
        width={150}
        maxValue={200}
        currentValue={time * 5}
        showProgressValue
        size="small"
      /> */}
      {/* <BreadCrumb>
        <Link href="http://www.google.com">one</Link>
        <Link href="http://www.google.com">two</Link>
        <Link href="http://www.google.com">three</Link>
      </BreadCrumb> */}
      {/* <Radio label="check" /> */}
      {/* <RadioGroup
        items={[
          { label: "prabhu", disabled: true },
          { label: "tester" },
          { label: "prabhu", disabled: false },
          { label: "tester" },
        ]}
        onSelected={(val) => console.log(val)}
      /> */}
      {/* <Tree
        items={[
          {
            name: "one",
            child: [
              { name: "two" },
              {
                name: "three",
                child: [
                  { name: "pop" },
                  { name: "pop" },
                  { name: "pop" },
                  { name: "pop" },
                  { name: "pop" },
                  {
                    name: "pop",
                    child: [
                      { name: "pop" },
                      { name: "pop" },
                      {
                        name: "pop",
                        child: [
                          { name: "pop" },
                          { name: "pop" },
                          { name: "pop" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "five",
            child: [{ name: "pop" }, { name: "pop" }, { name: "pop" }],
          },
          { name: "six", child: [{ name: "prabhu" }] },
          { name: "seven" },
        ]}
      /> */}
      {/* <div
        style={{
          height: "600px",
          width: "900px",
          position: "relative",
        }}
        ref={ref}
      > */}
      {/* <Notification position="top-center" title="Hello World">
        <span>test</span>
      </Notification> */}
      {/* </div> */}
      {/* <Tooltip message="test tooltip" position="top right">
        <div style={{ width: "450px", height: "100px" }}>
          this is a content this ia some huge contentthis is a content this ia
          some huge content. this is a content this ia some huge content
        </div>
      </Tooltip> */}
      {/* <Menu items={[{ name: "prabhu" }, { name: "testet" }]}>
        <span>test</span>
      </Menu> */}
      {/* <MenuBar
        onSelected={(val) => console.log(val)}
        width={800}
        align="right"
        items={[
          { name: "File", menu: [{ name: "prabhuy" }, { name: "tester" }] },
          {
            name: "Edit",
            menu: [
              { name: "tester1" },
              { name: "prabhu", disabled: true },
              { name: "tester" },
              { name: "tester2" },
            ],
          },
          { name: "Selection", menu: [{ name: "mars" }, { name: "moon" }] },
          {
            name: "View",
            menu: [
              { name: "olympus" },
              { name: "prabhu" },
              { name: "tester" },
              { name: "rivera" },
            ],
          },
          { name: "Go", menu: [{ name: "olympus" }, { name: "rivera" }] },
          { name: "Run", menu: [{ name: "olympus" }, { name: "rivera" }] },
          {
            name: "Terminal",
            menu: [
              { name: "olympus" },
              { name: "rivera" },
              { name: "olympus" },
              { name: "rivera" },
            ],
          },
        ]}
      ></MenuBar> */}
      {/* <div>
        <Slider start={1} end={180} onChange={(val) => console.log(val)} />
      </div> */}
      <div style={{ width: "70vw", height: "950px" }}>
        {/* <ImageComparer>
          <img src="https://images.unsplash.com/photo-1633993365492-0828ece5c0ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80" />
          <img src="https://images.unsplash.com/photo-1633993365492-0828ece5c0ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80" />
        </ImageComparer> */}
        {/* <Splitter dir="horizontal" minSplitWidth={250} maxSplitWidth={600}>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source.
          </p>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet.
          </p>
        </Splitter> */}
      </div>
    </div>
  );
}

export default App;
