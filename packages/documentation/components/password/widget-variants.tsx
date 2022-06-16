import { Password } from '../../../lib/components';

export const Default = <Password onChange={val => console.log(val)} />;
export const RTL = <Password RTL />;
export const Medium = <Password size="md" />;
export const Large = <Password size="lg" />;
