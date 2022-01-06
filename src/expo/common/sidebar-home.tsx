import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import {
  SidebarGroupModel,
  SidebarItemModel,
} from "../../components/sidebar/sidebar-model";

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
    navigate("/" + item.name.trim().toLowerCase().replace(/ /g, "-"));
  };

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const sideBarMemoized = React.useMemo(() => {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <Sidebar
          enableSearch
          onSelect={handleSidebarSelect}
          searchPlaceholder="Search Components ..."
          groupIconColor="#0074B7"
          groupTitleColor="#0074B7"
          sectionsCollapsible={false}
          groups={[
            {
              title: "Layout",
              items: [
                { name: "Splitter" },
                { name: "Accordion" },
                { name: "Image" },
                { name: "Tabs" },
                { name: "Accordion Group" },
                { name: "Sidebar" },
                { name: "image comparer" },
                { name: "Carousel" },
                { name: "Reveal" },
                { name: "scroll spy" },
              ],
            },
            {
              title: "content",
              items: [
                { name: "section" },
                { name: "Card" },
                { name: "page header" },
              ],
            },
            {
              title: "Inputs",
              items: [
                { name: "Input Text" },
                { name: "Tags" },
                { name: "Radio Group" },
                { name: "Checkbox" },
                { name: "Checkbox Group" },
                { name: "Switch" },
                { name: "Dropdown" },
                { name: "Rate" },
                { name: "Button" },
                { name: "Slider" },
                { name: "Autocomplete" },
                { name: "Menu Button" },
              ],
            },
            {
              title: "Feedback",
              items: [
                { name: "Progress" },
                { name: "Skeleton" },
                { name: "Notification" },
                { name: "Global Notification" },
                { name: "Alerts" },
              ],
            },
            {
              title: "Data",
              items: [
                { name: "Tree" },
                { name: "List" },
                { name: "Data Grid" },
                { name: "Transfer" },
              ],
            },
            {
              title: "Overlay",
              items: [
                { name: "Dialog" },
                { name: "Drawer" },
                { name: "Tooltip" },
                { name: "Menu" },
              ],
            },
            {
              title: "Utilities",
              items: [{ name: "draggable" }],
            },
          ]}
        />
      </div>
    );
  }, []);

  return <div style={{ width: "100%" }}>{sideBarMemoized}</div>;
};

SidebarHome.displayName = "SidebarHome";

export default SidebarHome;
