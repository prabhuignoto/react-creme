const BaseColumns = `const columns = [
  { name: "name", type: "string" },
  { name: "age", type: "number" },
  { name: "dept", type: "string" },
  { name: "marks", type: "number" },
];`;

const BaseData = `const data = [
  { name: "John", age: 30, dept: "Physics", marks: 100 },
  { name: "Jane", age: 25, dept: "Chemistry", marks: 80 },
  { name: "Lewis Hamilton", age: 25, dept: "Chemistry", marks: 78 },
  { name: "Prabhu", age: 35, dept: "Physics", marks: 100 },
  { name: "Clive", age: 25, dept: "Biology", marks: 95 },
];`;

export const ComfortableCodeString = `${BaseColumns}

${BaseData}

const App = () => (
  <DataGrid layoutStyle="comfortable" border columns={columns} data={data} />
);`;

export const CompactCodeString = `${BaseColumns}

${BaseData}

const App = () => (
  <DataGrid
    layoutStyle="compact"
    fixedHeight
    border
    columns={columns}
    data={data}
  />
);`;

export const SortableCodeString = `${BaseColumns}

${BaseData}

const sortableColumns = columns.map(column =>
  column.name === "name" ? { ...column, sortable: true } : column
);

const App = () => (
  <DataGrid
    layoutStyle="comfortable"
    border
    columns={sortableColumns}
    data={data}
  />
);`;

export const ZebraCodeString = `${BaseColumns}

${BaseData}

const App = () => (
  <DataGrid layoutStyle="comfortable" zebra columns={columns} data={data} />
);`;

export const SearchableCodeString = `${BaseColumns}

${BaseData}

const searchableColumns = columns.map(column =>
  column.name === "name" ? { ...column, searchable: true } : column
);

const App = () => (
  <DataGrid
    layoutStyle="comfortable"
    columns={searchableColumns}
    data={data}
  />
);`;

