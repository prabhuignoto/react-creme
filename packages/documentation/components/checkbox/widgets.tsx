import React from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { CustomStyle, Default, Disabled, Large } from './widget-variants';

function widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget>
          <div style={{ width: '250px' }}>
            <Default />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Disabled State">
        <DemoWidget>
          <div style={{ width: '250px' }}>
            <Disabled />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Large size">
        <BlockQuote>Comes in three sizes: small, medium, large.</BlockQuote>
        <DemoWidget>
          <div style={{ width: '250px' }}>
            <Large />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Custom Checkbox style">
        <DemoWidget>
          <div style={{ width: '250px' }}>
            <CustomStyle />
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default widgets;
