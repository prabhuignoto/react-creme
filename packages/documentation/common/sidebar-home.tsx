import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../lib/components';
import {
  SidebarGroupModel,
  SidebarItemModel,
} from '../../lib/components/sidebar/sidebar-model';

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
          focusable={false}
          groups={[
            {
              items: [
                { name: 'Splitter' },
                { name: 'Accordion' },
                { name: 'Image' },
                { name: 'Tabs' },
                { name: 'Accordion Group' },
                { name: 'Sidebar' },
                { name: 'image comparer' },
                { name: 'Carousel' },
                { name: 'Reveal' },
                { name: 'scroll spy' },
              ],
              title: 'Layout',
            },
            {
              items: [
                { name: 'section' },
                { name: 'Card' },
                { name: 'page header' },
              ],
              title: 'content',
            },
            {
              items: [
                { name: 'Input Text' },
                { name: 'Tags' },
                { name: 'Radio Group' },
                { name: 'Checkbox' },
                { name: 'Checkbox Group' },
                { name: 'Switch' },
                { name: 'Dropdown' },
                { name: 'Rate' },
                { name: 'Button' },
                { name: 'Slider' },
                { name: 'Auto Suggest' },
                { name: 'Menu Button' },
              ],
              title: 'Inputs',
            },
            {
              items: [
                { name: 'Progress' },
                { name: 'Skeleton' },
                { name: 'Notification' },
                { name: 'Global Notification' },
                { name: 'Alerts' },
              ],
              title: 'Feedback',
            },
            {
              items: [
                { name: 'Tree' },
                { name: 'List' },
                { name: 'Data Grid' },
                { name: 'Transfer' },
              ],
              title: 'Data',
            },
            {
              items: [
                { name: 'Dialog' },
                { name: 'Drawer' },
                { name: 'Tooltip' },
                { name: 'Menu' },
              ],
              title: 'Overlay',
            },
            {
              items: [{ name: 'draggable' }],
              title: 'Utilities',
            },
          ]}
        />
      </div>
    );
  }, []);

  return <div style={{ width: '100%' }}>{sideBarMemoized}</div>;
};

SidebarHome.displayName = 'SidebarHome';

export default SidebarHome;
