export const DefaultCodeString = `import { Sidebar } from "react-creme";

const groups = [
  {
    title: "Section 1",
    items: [{ name: "tester" }, { name: "tester 2" }],
  },
  {
    title: "Section 2",
    items: [{ name: "tester" }, { name: "tester 2" }],
  },
];

export default function App() {
  return <Sidebar groups={groups} />;
}`;

export const SearchableCodeString = `import { Sidebar } from "react-creme";

const groups = [
  {
    title: "Section 1",
    items: [{ name: "tester" }],
  },
  {
    title: "Section 2",
    items: [{ name: "tester" }, { name: "tester 2" }],
  },
  {
    title: "Section 3",
    items: [{ name: "tester" }],
  },
];

export default function App() {
  return <Sidebar enableSearch focusable groups={groups} />;
}`;

