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
          "Accordion",
          "Inputs",
          "Feedback",
          "Data",
          "Navigation",
          "Overlay",
        ]}
        initialState="open"
        autoClose={false}
      >
        <List
          options={[
            { name: "Accordion", value: "accordion" },
            { name: "Accordion Group", value: "accordion-group" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={10}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "Input Text", value: "inputs" },
            { name: "Radio", value: "radio" },
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
          rowGap={10}
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
          rowGap={10}
          itemHeight={35}
        ></List>
        <List
          options={[
            { name: "List", value: "list" },
            { name: "Tree", value: "tree" },
            { name: "Tags", value: "tags" },
            { name: "Tabs", value: "tabs" },
          ]}
          borderLess
          showCheckIcon={false}
          onSelection={(selected) => navigate(`${selected[0].value}`)}
          rowGap={10}
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
          rowGap={10}
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
          rowGap={10}
          itemHeight={35}
        ></List>
      </AccordionGroup>
    </div>
  );
};

export { Sidebar };
