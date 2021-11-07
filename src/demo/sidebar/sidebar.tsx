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
            { name: "accordion", value: "accordion" },
            { name: "accordion group", value: "accordion-group" },
          ]}
          disableSearch
          borderLess
          onSelection={(selected) => navigate(`${selected[0].value}`)}
        ></List>
        <List
          options={[
            { name: "Input Text", value: "inputs" },
            { name: "Radio", value: "inputs" },
            { name: "Radio Group", value: "inputs" },
            { name: "Checkbox", value: "inputs" },
            { name: "Switch", value: "inputs" },
            { name: "Dropdown", value: "dropdown" },
            { name: "Rate", value: "rate" },
          ]}
          disableSearch
          borderLess
          onSelection={(selected) => navigate(`${selected[0].value}`)}
        ></List>
        <List
          options={[
            { name: "Progress", value: "progress" },
            { name: "Skeleton", value: "skeleton" },
            { name: "Notification", value: "notification" },
          ]}
          disableSearch
          borderLess
          onSelection={(selected) => navigate(`${selected[0].value}`)}
        ></List>
        <List
          options={[
            { name: "List", value: "list" },
            { name: "Tree", value: "tree" },
            { name: "Tags", value: "tags" },
            { name: "Tabs", value: "tabs" },
          ]}
          disableSearch
          borderLess
          onSelection={(selected) => navigate(`${selected[0].value}`)}
        ></List>
        <List
          options={[{ name: "Breadcrumb", value: "breadcrumb" }]}
          disableSearch
          borderLess
          onSelection={(selected) => navigate(`${selected[0].value}`)}
        ></List>
        <List
          options={[
            { name: "Dialog", value: "dialog" },
            { name: "Drawer", value: "drawer" },
            { name: "Tooltip", value: "tooltip" },
          ]}
          disableSearch
          borderLess
          onSelection={(selected) => navigate(`${selected[0].value}`)}
        ></List>
      </AccordionGroup>
    </div>
  );
};

export { Sidebar };
