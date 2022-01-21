export {
  CustomIcon,
  Default,
  Expanded,
} from '../../documentation/components/accordion/widgets-variants';
import { ComponentMeta } from '@storybook/react';
import { Accordion } from '../../lib/components'; // YourComponent.stories.ts|tsx

export default {
  component: Accordion,
  title: 'Accordion',
} as ComponentMeta<typeof Accordion>;
