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
      src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
      loaderSize="md"
    />
  </Card>
);

export const CustomImageCode = `
  <Card alignHeader="left" height={250} shadow={false}>
    <Image src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg" loaderSize='md' />
  </Card>
`;
