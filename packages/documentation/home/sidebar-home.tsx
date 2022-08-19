import { Theme } from '@core';
import {
  faBell,
  faBorderAll,
  faDatabase,
  faHammer,
  faKeyboard,
  faLink,
  faRocket,
  faTasksAlt,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sidebar, SidebarGroupModel, SidebarItemModel } from '@layout';
import { FunctionComponent, memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { themeState } from '../atoms/home';
import data from './sidebar-home-data';

interface SideBarHomeProps {
  onSelect?: () => void;
}

const SideBar: FunctionComponent<{
  onSelect: (group: SidebarGroupModel, item: SidebarItemModel) => void;
  theme: Theme;
}> = memo(
  ({ onSelect }) => {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <Sidebar
          enableSearch={false}
          onSelect={onSelect}
          searchPlaceholder="Search Components ..."
          sectionsCollapsible={false}
          groups={data}
          focusable={false}
          icons={[
            <FontAwesomeIcon size="2x" icon={faRocket} key="home" />,
            <FontAwesomeIcon size="2x" icon={faBorderAll} key="layout" />,
            <FontAwesomeIcon size="2x" icon={faTasksAlt} key="content" />,
            <FontAwesomeIcon size="2x" icon={faKeyboard} key="input" />,
            <FontAwesomeIcon size="2x" icon={faBell} key="notification" />,
            <FontAwesomeIcon size="2x" icon={faDatabase} key="data" />,
            <FontAwesomeIcon size="2x" icon={faLink} key="link" />,
            <FontAwesomeIcon size="2x" icon={faWindowMaximize} key="overlay" />,
            <FontAwesomeIcon size="2x" icon={faHammer} key="utilities" />,
          ]}
        />
      </div>
    );
  },
  (prev, next) => prev.theme.darkMode === next.theme.darkMode
);

SideBar.displayName = 'SideBar';

const SidebarHome: React.FC<SideBarHomeProps> = ({
  onSelect,
}: SideBarHomeProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useRecoilValue(themeState);

  const handleSidebarSelect = (_group, item: SidebarItemModel) => {
    onSelect?.();
    const name = item.name.trim().toLowerCase().replace(/ /g, '-');
    const value = item.value?.trim().toLowerCase().replace(/ /g, '-');

    if (value === 'home') {
      navigate(`/home#${name}`);
    } else {
      navigate('/' + name);
    }
  };

  useEffect(() => {
    if (location.pathname) {
      if (location.pathname === '/' || location.pathname === '/home') {
        if (location.hash) {
          const hash = location.hash.replace('#', '');
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView();
          }
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <div style={{ width: '100%' }}>
      <SideBar onSelect={handleSidebarSelect} theme={theme} />
    </div>
  );
};

SidebarHome.displayName = 'SidebarHome';

export default SidebarHome;
