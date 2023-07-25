import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Card, Image, Skeleton } from '../../../lib/components';
import { themeState } from '../../atoms/home';

const Header = () => {
  const theme = useRecoilValue(themeState);
  const isDark = useMemo(() => theme.darkMode, [theme]);

  return <span style={{ color: isDark ? '#fff' : '#000' }}>header</span>;
};
const Footer = () => {
  const theme = useRecoilValue(themeState);
  const isDark = useMemo(() => theme.darkMode, [theme]);

  return (
    <span style={{ color: isDark ? '#fff' : '#000' }}>Footer content</span>
  );
};

export const Default = (
  <Card alignHeader="left" header={<Header />} footer={<Footer />} height={350}>
    <Skeleton animate rowHeight={7} rows={6} showCircle></Skeleton>
  </Card>
);

export const CustomImage = (
  <Card alignHeader="left" height={250} shadow={false}>
    <Image
      src="https://images.unsplash.com/photo-1690184432588-81068877d852"
      loaderSize="md"
    />
  </Card>
);

export const CustomImageCode = `
  <Card alignHeader="left" height={250} shadow={false}>
    <Image src="https://images.unsplash.com/photo-1690184432588-81068877d852" loaderSize='md' />
  </Card>
`;
