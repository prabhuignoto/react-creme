import React from "react";
import { useNavigate } from "react-router-dom";
import { AccordionGroup } from "../../components/accordion-group/accordion-group";
import { List } from "../../components/list/list";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%" }}>
      <AccordionGroup
        titles={[
          "Icons",
          "Layout",
          "Inputs",
          "Feedback",
          "Data",
          "Navigation",
          "Overlay",
          "Menu",
        ]}
        initialState="open"
        autoClose={false}
        noBorder
      >
        <List
          options={[{ name: "Avatar", value: "avatar" }]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={5}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "Splitter", value: "splitter" },
            { name: "Card", value: "card" },
            { name: "Image", value: "image" },
            { name: "Accordion", value: "accordion" },
            { name: "Tabs", value: "tabs" },
            { name: "Accordion Group", value: "accordion-group" },
            { name: "Tree", value: "tree" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={5}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "Input Text", value: "inputs" },
            { name: "Radio", value: "radio" },
            { name: "Tags", value: "tags" },
            { name: "Radio Group", value: "radio-group" },
            { name: "Checkbox", value: "checkbox" },
            { name: "Switch", value: "switch" },
            { name: "Dropdown", value: "dropdown" },
            { name: "Rate", value: "rate" },
            { name: "Button", value: "buttons" },
            { name: "Slider", value: "slider" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={5}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "Progress", value: "progress" },
            { name: "Skeleton", value: "skeleton" },
            { name: "Notification", value: "notification" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={5}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "List", value: "list" },
            { name: "Grid", value: "data-grid" },
            { name: "Transfer", value: "transfer" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={5}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "Breadcrumb", value: "breadcrumb" },
            { name: "Carousel", value: "carousel" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={5}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "Dialog", value: "dialog" },
            { name: "Drawer", value: "drawer" },
            { name: "Tooltip", value: "tooltip" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={5}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "Menu", value: "menu" },
            { name: "Menu Bar", value: "menubar" },
            { name: "Menu Button", value: "menu-button" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={5}
          itemHeight={35}
        ></List>
      </AccordionGroup>
    </div>
  );
};

export { Sidebar };
