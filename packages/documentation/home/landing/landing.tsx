import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons';
import {
  faBolt,
  faCog,
  faCubes,
  faDumbbell,
  faPalette,
  faSun,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hero } from './hero';
import { NavBar } from './navbar';
import { ProductFeatureProps, ProductFeatures } from './product-feature';
import styles from './styles/landing.module.scss';

const features: ProductFeatureProps[] = [
  {
    description: `Build enterprise grade beautiful and robust React applications with confidence and ease`,
    icon: <FontAwesomeIcon icon={faBolt} key="feather" size="2x" />,
    title: 'Robust UI components',
  },
  {
    description: `Fully customizable UI elements with fine grained control over the look and feel.`,
    icon: <FontAwesomeIcon icon={faWrench} key="wrench" size="2x" />,
    title: 'Customizable UI elements',
  },
  {
    description: `Ready to use high-quality UI components for common scenarios and use cases`,
    icon: <FontAwesomeIcon icon={faCubes} key="feather2" size="2x" />,
    title: '45+ UI Components',
  },
  {
    description: `Fully accessible UI components with support for keyboard navigation and screen readers`,
    icon: <FontAwesomeIcon icon={faAccessibleIcon} key="feather" size="2x" />,
    title: 'Best in class Accessibility',
  },
  {
    description: `Customize the colors of the components to match your brand identity`,
    icon: <FontAwesomeIcon icon={faPalette} key="feather2" size="2x" />,
    title: 'Solid support for color schemes',
  },
  {
    description: `Brings in the power of Typescript to build robust and type safe applications`,
    icon: <FontAwesomeIcon icon={faDumbbell} key="feather2" size="2x" />,
    title: 'Built with Typescript',
  },
  {
    description: 'Support for light and dark themes. Dark mode out of the box',
    icon: <FontAwesomeIcon icon={faSun} key="feather" size="2x" />,
    title: 'Light and Dark themes',
  },
  {
    description: 'Easily configurable components with sensible defaults',
    icon: <FontAwesomeIcon icon={faCog} key="feather" size="2x" />,
    title: 'Configurable components',
  },
];

const LandingPage = () => {
  return (
    <div className={styles.landing}>
      <NavBar />
      <Hero />
      <div className={styles.features_wrapper}>
        <ProductFeatures items={features} />
      </div>
    </div>
  );
};

export default LandingPage;
