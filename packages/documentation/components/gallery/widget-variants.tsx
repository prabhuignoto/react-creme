import { Gallery, Image } from '../../../lib/components';

//generate four random numbers
const gallery1 = [200, 300, 450, 230, 440, 120, 210, 100, 999];

const randomNumbers = [33, 44, 156, 23, 45, 789, 343, 222];

export const Default = (
  <Gallery gridDimension={[3, 3]} gap={10}>
    {gallery1.map((number, index) => (
      <Image
        key={index}
        src={`https://picsum.photos/id/${number}/200/200`}
        alt="random image"
      />
    ))}
  </Gallery>
);

export const WithImages = (
  <Gallery
    gridDimension={[4, 2]}
    imageDimension={80}
    gap={10}
    imagesURL={randomNumbers.map(
      number => `https://picsum.photos/id/${number}/200/200`
    )}
    expandImageOnclick
  />
);
