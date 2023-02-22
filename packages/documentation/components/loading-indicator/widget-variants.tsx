import { LoadingIndicator } from '../../../lib/components';

export const Default = <LoadingIndicator />;

export const RTL = <LoadingIndicator count={4} rtl />;

export const CircleShape = <LoadingIndicator shape="circle" />;

export const CustomSpeed = <LoadingIndicator speed="fast" />;

export const CustomSize = <LoadingIndicator size="lg" />;

export const FineGrainedSize = <LoadingIndicator customSize={10} />;

export const LoadingIndicatorCount = <LoadingIndicator count={7} />;
