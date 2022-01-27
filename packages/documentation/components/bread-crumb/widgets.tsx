import React from 'react';
import { BlockQuote, BreadCrumb, Link, Section } from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget width={450}>
          <BreadCrumb>
            <Link href="#">Home</Link>
            <Link href="#">Features</Link>
            <Link href="#">Bread Crumb</Link>
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
          <BreadCrumb icon="slash">
            <Link href="#">Home</Link>
            <Link href="#">Features</Link>
            <Link href="#">Bread Crumb</Link>
          </BreadCrumb>
        </DemoWidget>
      </Section>
      <Section title="Custom Icon - arrow">
        <DemoWidget width={450}>
          <BreadCrumb icon="arrow">
            <Link href="#">Home</Link>
            <Link href="#">Features</Link>
            <Link href="#">Bread Crumb</Link>
          </BreadCrumb>
        </DemoWidget>
      </Section>
      <Section title="Custom Size - Medium">
        <BlockQuote>
          The size can be changed by setting the <code>size</code> property to{' '}
          <code>sm</code> <code>md</code> or <code>lg</code>.
        </BlockQuote>
        <DemoWidget width={450}>
          <BreadCrumb icon="arrow" size="md">
            <Link href="#">Home</Link>
            <Link href="#">Features</Link>
            <Link href="#">Bread Crumb</Link>
          </BreadCrumb>
        </DemoWidget>
      </Section>
      <Section title="Custom Size - Large">
        <DemoWidget width={400}>
          <BreadCrumb icon="arrow" size="lg">
            <Link href="#">Home</Link>
            <Link href="#">Features</Link>
            <Link href="#">Bread Crumb</Link>
          </BreadCrumb>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
