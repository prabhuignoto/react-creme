export const DefaultCodeString = `import {useState} from 'react';
const [show, setShow] = useState(false);

const App = () => {
  return <div>
    <button onClick={() => setShow(true)}>Open Notification</button>
    {
      show && <Notification position="top-right" title="Hello World" onClose={() => setShow(false)} >
                <span>test</span>
              </Notification>
    }
  </div>
}
`;

export const ContainedCodeString = `import {useState} from 'react';
const [show, setShow] = useState(false);
const ref = useRef(null);

const App = () => {
  return <div ref={useRef}>
    <button onClick={() => setShow(true)}>Open Notification</button>
    {
      show && <Notification position="top-left" title="Hello World" onClose={() => setShow(false)} containedToParent={ref}>
                <span>test</span>
              </Notification>
    }
  </div>
}
`;

export const AutoCloseString = `import {useState} from 'react';
const [show, setShow] = useState(false);
const ref = useRef(null);

const App = () => {
  return <div>
    <button onClick={() => setShow(true)}>Open Notification</button>
    {
      show ?
      <Notification position="top-left" title="Hello World" onClose={() => setShow(false)} autoClose={3000}>
        <span>test</span>
      </Notification> : null
    }
  </div>
}
`;
