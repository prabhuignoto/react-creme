import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components";
import {
  SidebarGroupModel,
  SidebarItemModel,
} from "../components/sidebar/sidebar-model";

const SidebarHome = React.memo(() => {
  const navigate = useNavigate();
  // const location = useLocation();

  const handleSidebarSelect = (
    group: SidebarGroupModel,
    item: SidebarItemModel
  ) => {
    navigate("/" + item.name.trim().toLowerCase().replace(/ /g, "-"));
  };

  useEffect(() => {
    if (window.scrollY) {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
        left: 0,
      });
    }
  }, [location.pathname]);

  const sideBarMemoized = React.useMemo(() => {
    return (
      <Sidebar
        enableSearch
        onSelect={handleSidebarSelect}
        searchPlaceholder="Search Components ..."
        groups={[
          {
            title: "Layout",
            items: [
              { name: "Splitter" },
              { name: "Card" },
              { name: "Image" },
              { name: "Accordion" },
              { name: "Tabs" },
              { name: "Accordion Group" },
              { name: "Tree" },
              { name: "Sidebar" },
              { name: "image comparer" },
              { name: "Carousel" },
              { name: "Reveal" },
              { name: "scroll spy" },
              { name: "section" },
              { name: "draggable" },
              { name: "sortable" },
            ],
          },
          {
            title: "Inputs",
            items: [
              { name: "Input Text" },
              { name: "Tags" },
              { name: "Radio Group" },
              { name: "Checkbox" },
              { name: "Switch" },
              { name: "Dropdown" },
              { name: "Rate" },
              { name: "Button" },
              { name: "Slider" },
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
              { name: "List" },
              { name: "Data Grid" },
              { name: "Transfer" },
            ],
          },
          { title: "Icons", items: [{ name: "avatar" }] },
          {
            title: "Overlay",
            items: [
              { name: "Dialog" },
              { name: "Drawer" },
              { name: "Tooltip" },
            ],
          },
          {
            title: "Menu",
            items: [
              { name: "Menu" },
              { name: "Menu Bar" },
              { name: "Menu Button" },
            ],
          },
        ]}
      />
    );
  }, []);

  return <div style={{ width: "100%" }}>{sideBarMemoized}</div>;
});

SidebarHome.displayName = "SidebarHome";

export default SidebarHome;
