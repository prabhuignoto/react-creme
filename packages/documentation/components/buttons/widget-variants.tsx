import { Button } from '@core';
import { SearchIcon } from '@common/icons';

export const Default = <Button label="save" onClick={() => alert('test')} />;

export const Icon = (
  <Button label="Search this page">
    <SearchIcon />
  </Button>
);

export const SearchingState = (
  <Button label="Searching ..." type="progress"></Button>
);

export const Disabled = (
  <Button
    border={false}
    label="I am disabled"
    disabled
    onClick={() => alert('test')}
  />
);

export const Medium = (
  <Button label="save as new" type="primary" size="md" border={false} />
);

export const Large = <Button label="save as new" type="danger" size="lg" />;
