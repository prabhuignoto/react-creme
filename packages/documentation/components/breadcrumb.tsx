import React from 'react';
import { BreadCrumb } from '../../lib/components';
function breadcrumb() {
  return (
    <div>
      <div>
        <BreadCrumb icon="arrow">
          <span>one</span>
          <span>two</span>
          <span>three</span>
        </BreadCrumb>
      </div>
      <div>
        <BreadCrumb size="md">
          <span>one</span>
          <span>two</span>
          <span>three</span>
        </BreadCrumb>
      </div>
      <div>
        <BreadCrumb icon="slash" size="lg">
          <span>one</span>
          <span>two</span>
          <span>three</span>
        </BreadCrumb>
      </div>
    </div>
  );
}

export default breadcrumb;
