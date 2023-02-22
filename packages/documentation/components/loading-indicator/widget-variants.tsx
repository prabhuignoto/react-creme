import { LoadingIndicator } from '../../../lib/components';

export const Default = <LoadingIndicator size="sm" />;

export const RTL = <LoadingIndicator count={4} rtl size="sm" />;

export const CircleShape = <LoadingIndicator shape="circle" size="sm" />;

export const CustomSpeed = <LoadingIndicator speed="fast" size="sm" />;

export const CustomSize = <LoadingIndicator size="lg" />;

export const FineGrainedSize = <LoadingIndicator customSize={10} />;
