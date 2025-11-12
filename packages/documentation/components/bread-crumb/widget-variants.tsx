import { BreadCrumb } from '../../../lib/components';

export const Default = (
  <BreadCrumb
    links={['Home', 'Features', 'Bread Crumb']}
    onSelected={item => console.log('Breadcrumb selected:', item)}
  ></BreadCrumb>
);

export const Slash = (
  <BreadCrumb
    icon="slash"
    selectedCrumbIndex={1}
    links={['Home', 'Features', 'Bread Crumb']}
    onSelected={item => console.log('Breadcrumb selected:', item)}
  ></BreadCrumb>
);

export const CustomIcon = (
  <BreadCrumb
    icon="arrow"
    links={['Home', 'Features', 'Bread Crumb']}
    onSelected={item => console.log('Breadcrumb selected:', item)}
  ></BreadCrumb>
);

export const SelectedIndex = (
  <BreadCrumb
    icon="arrow"
    size="md"
    selectedCrumbIndex={2}
    links={['Home', 'Features', 'Bread Crumb']}
    onSelected={item => console.log('Breadcrumb selected:', item)}
  ></BreadCrumb>
);

export const CustomSize = (
  <BreadCrumb
    icon="arrow"
    size="lg"
    links={['Home', 'Features', 'Bread Crumb']}
    onSelected={item => console.log('Breadcrumb selected:', item)}
  ></BreadCrumb>
);

export const RTL = (
  <BreadCrumb
    links={['Home', 'Features', 'Bread Crumb']}
    RTL
    onSelected={item => console.log('Breadcrumb selected:', item)}
  ></BreadCrumb>
);
