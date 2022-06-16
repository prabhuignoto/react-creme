import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Accordion } from '../../../lib/components';
import { themeState } from '../../atoms/home';

const TextContent = () => {
  const theme = useRecoilValue(themeState);

  const isDark = useMemo(() => theme.darkMode, [theme]);

  const style = useMemo(
    () => ({
      color: isDark ? '#fff' : '#000',
    }),
    [isDark]
  );

  return (
    <div style={style}>
      <p>
        Sed laoreet neque eget sem varius, et interdum dui venenatis.
        Suspendisse in faucibus tortor, nec aliquet arcu. Quisque at Proin
        auctor velit massa, euismod pretium dui euismod in. Pellentesque rhoncus
        eros id posuere tincidunt. Maecenas quis libero vitae elit consectetur
        finibus et ac libero. Donec at fermentum lectus. Cras iaculis augue non
        mauris interdum, vitae pretium mi blandit. Aenean ultrices pellentesque
        lectus ac faucibus. Morbi tristique vulputate nisi, id porttitor diam
        egestas a. Suspendisse a tortor suscipit, accumsan massa at, viverra
        urna. Maecenas vel lectus sodales, dapibus dolor eget, pharetra neque.
        Nam eleifend id mauris in suscipit. Ut sed risus at mi vulputate
        rhoncus.
      </p>
      <p>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here, content here, making it look
        like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search
        for lorem ipsum will uncover many web sites still in their infancy.
        Various versions have evolved over the years, sometimes by accident,
        sometimes on purpose (injected humour and the like).
      </p>
    </div>
  );
};

export const Default = (
  <Accordion title="Lorem Ipsum" focusable>
    <TextContent />
  </Accordion>
);

export const CustomIcon = (
  <Accordion title="Lorem Ipsum" alignIconRight>
    <TextContent />
  </Accordion>
);

export const Expanded = (
  <Accordion title="Lorem Ipsum" expanded focusable>
    <TextContent />
  </Accordion>
);

export const MediumSized = (
  <Accordion title="Lorem Ipsum" size="md">
    <TextContent />
  </Accordion>
);

export const LargeSized = (
  <Accordion title="Lorem Ipsum" size="lg">
    <TextContent />
  </Accordion>
);
