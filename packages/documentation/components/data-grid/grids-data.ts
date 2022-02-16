import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';

export const data = [
  {
    age: 30,
    dept: 'physics',
    marks: 100,
    name: 'John',
  },
  {
    age: 25,
    dept: 'Physics, Chemistry, Biology, Maths, English, Hindi, Social Science',
    marks: 80,
    name: 'Jane',
  },
  {
    age: 25,
    dept: 'chemistry',
    marks: 78,
    name: 'Lewis hamilton',
  },
  { age: 35, dept: 'Physics', marks: 100, name: 'Prabhu' },
  { age: 25, dept: 'Biology', marks: 95, name: 'Clive' },
];

export const columnsConfig: DataGridColumn[] = [
  { name: 'name', type: 'string' },
  { name: 'age', type: 'number' },
  { name: 'dept', type: 'string' },
  { name: 'marks', type: 'number' },
];
