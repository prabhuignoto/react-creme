import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import {
  SidebarGroupModel,
  SidebarItemModel,
} from "../../components/sidebar/sidebar-model";

const SidebarHome = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSidebarSelect = (
    group: SidebarGroupModel,
    item: SidebarItemModel
  ) => {
    navigate("/" + item.name.trim().toLowerCase().replace(/ /g, "-"));
  };

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const sideBarMemoized = React.useMemo(() => {
    return (
      <div style={{ height: "100vh", overflowY: "auto", width: "98%" }}>
        <Sidebar
          enableSearch
          onSelect={handleSidebarSelect}
          searchPlaceholder="Search Components ..."
          groupIconColor="#fff"
          groupTitleColor="#fff"
          backGroundColor="#1e56a0"
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
      </div>
    );
  }, []);

  return <div style={{ width: "100%" }}>{sideBarMemoized}</div>;
});

SidebarHome.displayName = "SidebarHome";

export default SidebarHome;
