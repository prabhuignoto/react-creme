import React from 'react';
import { BlockQuote, BreadCrumb, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget width={450}>
          <BreadCrumb>
            <span>Home</span>
            <span>Features</span>
            <span>Bread Crumb</span>
          </BreadCrumb>
        </DemoWidget>
      </Section>
      <Section title="Custom Icon - slash">
        <BlockQuote>
          The icon can be changed by setting the <code>icon</code> property to
          any of the values <code>slash</code> <code>arrow</code> or{' '}
          <code>chevron</code>.
        </BlockQuote>
        <DemoWidget width={450}>
          <BreadCrumb icon="slash" selectedCrumbIndex={1}>
            <span>Home</span>
            <span>Features</span>
            <span>Bread Crumb</span>
          </BreadCrumb>
        </DemoWidget>
      </Section>
      <Section title="Custom Icon - arrow">
        <DemoWidget width={450}>
          <BreadCrumb icon="arrow">
            <span>Home</span>
            <span>Features</span>
            <span>Bread Crumb</span>
          </BreadCrumb>
        </DemoWidget>
      </Section>
      <Section title="Custom Size - Medium">
        <BlockQuote>
          The size can be changed by setting the <code>size</code> property to{' '}
          <code>sm</code> <code>md</code> or <code>lg</code>.
        </BlockQuote>
        <DemoWidget width={450}>
          <BreadCrumb icon="arrow" size="md" selectedCrumbIndex={2}>
            <span>Home</span>
            <span>Features</span>
            <span>Bread Crumb</span>
          </BreadCrumb>
        </DemoWidget>
      </Section>
      <Section title="Custom Size - Large">
        <DemoWidget width={400}>
          <BreadCrumb icon="arrow" size="lg">
            <span>Home</span>
            <span>Features</span>
            <span>Bread Crumb</span>
          </BreadCrumb>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
