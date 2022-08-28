import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons';
import {
  faCog,
  faCubes,
  faPalette,
  faScrewdriverWrench,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Hero } from './hero';
import { NavBar } from './navbar';
import { ProductFeatureProps, ProductFeatures } from './product-feature';
import styles from './styles/landing.module.scss';

const features: ProductFeatureProps[] = [
  {
    description: `Build enterprise grade react applications with confidence and ease`,
    icon: <FontAwesomeIcon icon={faCog} key="feather" size="2x" />,
    title: 'Enterprise grade',
  },
  {
    description: `Fully customizable UI elements with fine grained control over the look and feel.`,
    icon: <FontAwesomeIcon icon={faWrench} key="wrench" size="2x" />,
    title: 'Customizable UI elements',
  },
  {
    description: `Ready to use components for common scenarios and use cases`,
    icon: <FontAwesomeIcon icon={faCubes} key="feather2" size="2x" />,
    title: '45+ UI Components',
  },
  {
    description: `Accessibility is one of the core principles of react-creme and the components are built with industry standard Accessibility`,
    icon: <FontAwesomeIcon icon={faAccessibleIcon} key="feather" size="2x" />,
    title: 'Best in class Accessibility',
  },
  {
    description: `Customize the colors of the UI elements with ease`,
    icon: <FontAwesomeIcon icon={faPalette} key="feather2" size="2x" />,
    title: 'Solid support for color schemes',
  },
  {
    description: `Type safe and robust UI Components`,
    icon: (
      <FontAwesomeIcon icon={faScrewdriverWrench} key="feather2" size="2x" />
    ),
    title: 'Built with Typescript',
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
