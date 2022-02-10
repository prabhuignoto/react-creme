import {
  faBell,
  faBorderAll,
  faDatabase,
  faHammer,
  faKeyboard,
  faLink,
  faTasksAlt,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../lib/components';
import {
  SidebarGroupModel,
  SidebarItemModel,
} from '../../lib/components/sidebar/sidebar-model';
import data from './sidebar-home-data';

interface SideBarHomeProps {
  onSelect?: () => void;
}

const SidebarHome: React.FC<SideBarHomeProps> = ({
  onSelect,
}: SideBarHomeProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSidebarSelect = (
    group: SidebarGroupModel,
    item: SidebarItemModel
  ) => {
    onSelect?.();
    navigate('/' + item.name.trim().toLowerCase().replace(/ /g, '-'));
  };

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const sideBarMemoized = React.useMemo(() => {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <Sidebar
          enableSearch
          onSelect={handleSidebarSelect}
          searchPlaceholder="Search Components ..."
          sectionsCollapsible={false}
          groups={data}
          icons={[
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
  }, []);

  return <div style={{ width: '100%' }}>{sideBarMemoized}</div>;
};

SidebarHome.displayName = 'SidebarHome';

export default SidebarHome;
