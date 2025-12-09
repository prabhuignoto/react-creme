import {
  Bell,
  LayoutGrid,
  Database,
  Wrench,
  Keyboard,
  Link,
  Rocket,
  ListTodo,
  Maximize,
} from 'lucide-react';
import { FunctionComponent, memo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { Sidebar } from '../../lib/components';
import { Theme } from '../../lib/components/common/theme-provider-model';
import {
  SidebarGroupModel,
  SidebarItemModel,
} from '../../lib/components/sidebar/sidebar-model';
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
      <Sidebar
        // enableSearch={true}
        onSelect={onSelect}
        searchPlaceholder="Search Components ..."
        sectionsCollapsible={false}
        groups={data}
        focusable={false}
        icons={[
          <Rocket size={32} key="home" />,
          <LayoutGrid size={32} key="layout" />,
          <ListTodo size={32} key="content" />,
          <Keyboard size={32} key="input" />,
          <Bell size={32} key="notification" />,
          <Database size={32} key="data" />,
          <Link size={32} key="link" />,
          <Maximize size={32} key="overlay" />,
          <Wrench size={32} key="utilities" />,
        ]}
      />
    );
  },
  (prev, next) => prev.theme.darkMode === next.theme.darkMode
);

SideBar.displayName = 'SideBar';

const SidebarHomeComponent: FunctionComponent<SideBarHomeProps> = ({
  onSelect,
}: SideBarHomeProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useAtomValue(themeState);

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

  return <SideBar onSelect={handleSidebarSelect} theme={theme} />;
};

const SidebarHome = memo(SidebarHomeComponent);
SidebarHomeComponent.displayName = 'SidebarHome';

export default SidebarHome;
