import jsxToString from 'react-element-to-jsx-string';
import { BlockQuote, Section, Text } from '../../../lib/components';
import { HeaderCodeToggle } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import { jsxToStringOptions } from '../../common/syntax-highlighter/syntax';
import {
  CircleShape,
  CustomSize,
  CustomSpeed,
  Default,
  FineGrainedSize,
  LoadingIndicatorCount,
  RTL,
} from './widget-variants';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Default"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <HeaderCodeToggle.Content
            code={jsxToString(Default, jsxToStringOptions)}
            language="jsx"
            componentName="LoadingIndicator"
          >
            <DemoWidget
              name="LoadingIndicator"
              width={200}
              style={{ marginLeft: '2rem' }}
            >
              {Default}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Shape"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The shape of the loading indicator can be changed to circle by
            passing the
            <code>shape</code> prop with value <code>circle</code>. The default
            shape is square.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CircleShape, jsxToStringOptions)}
            language="jsx"
            componentName="LoadingIndicator"
          >
            <DemoWidget
              name="LoadingIndicator"
              width={200}
              style={{ marginLeft: '2rem' }}
            >
              {CircleShape}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Speed"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The speed of the loading indicator can be changed by passing the
            <code>speed</code> prop with value <code>slow</code>,{' '}
            <code>normal</code> or <code>fast</code>. The default speed is
            normal.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomSpeed, jsxToStringOptions)}
            language="jsx"
            componentName="LoadingIndicator"
          >
            <DemoWidget
              name="LoadingIndicator"
              width={200}
              style={{ marginLeft: '2rem' }}
            >
              {CustomSpeed}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom length"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The number of items in the loading indicator can be changed by
            passing the <code>count</code> prop with a number value. The default
            count is <code>3</code>.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(LoadingIndicatorCount, jsxToStringOptions)}
            language="jsx"
            componentName="LoadingIndicator"
          >
            <DemoWidget
              name="LoadingIndicator"
              width={200}
              style={{ marginLeft: '2rem' }}
            >
              {LoadingIndicatorCount}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Right to Left"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            The loading indicator can be displayed from right to left by passing
            the <code>rtl</code>. The default direction is left to right.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(RTL, jsxToStringOptions)}
            language="jsx"
            componentName="LoadingIndicator"
          >
            <DemoWidget
              name="LoadingIndicator"
              width={200}
              style={{ marginLeft: '2rem' }}
            >
              {RTL}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Size"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            Customize the size of the loading indicator by passing the{' '}
            <code>size</code> prop with value <code>sm</code>, <code>md</code>{' '}
            or <code>lg</code>. The default size is <code>sm</code>.
          </Text>
          <BlockQuote>
            The sizes can be managed by adjusting the iconSizes settings in the
            ThemeProvider
          </BlockQuote>
          <HeaderCodeToggle.Content
            code={jsxToString(CustomSize, jsxToStringOptions)}
            language="jsx"
            componentName="LoadingIndicator"
          >
            <DemoWidget
              name="LoadingIndicator"
              width={200}
              style={{ marginLeft: '2rem' }}
            >
              {CustomSize}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>

      <HeaderCodeToggle.Provider>
        <Section
          size="md"
          title="Custom size"
          border={false}
          headerActions={<HeaderCodeToggle.Button />}
        >
          <Text>
            If you want to take complete control over the size of the loading
            indicator, you can pass the <code>customSize</code> prop with a
            number value (pixels). This will override the <code>size</code>{' '}
            prop.
          </Text>
          <HeaderCodeToggle.Content
            code={jsxToString(FineGrainedSize, jsxToStringOptions)}
            language="jsx"
            componentName="LoadingIndicator"
          >
            <DemoWidget
              name="LoadingIndicator"
              width={200}
              style={{ marginLeft: '2rem' }}
            >
              {FineGrainedSize}
            </DemoWidget>
          </HeaderCodeToggle.Content>
        </Section>
      </HeaderCodeToggle.Provider>
    </div>
  );
}

export default Widgets;
