import { uniqueId } from "lodash";
export interface ITask {
  id: string;
  content: string;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}
export interface ITaskDict {
  [key: string]: ITask;
}

export interface IColumnDict {
  [key: string]: IColumn;
}

export interface IDataState {
  tasks: ITaskDict;
  columns: IColumnDict;
  columnOrder: string[];
}

const task1id = uniqueId("task-");
const task2id = uniqueId("task-");
const task3id = uniqueId("task-");
const task4id = uniqueId("task-");

const col1id = uniqueId("column-");
const col2id = uniqueId("column-");
const col3id = uniqueId("column-");

const initialData: IDataState = {
  tasks: {
    [task1id]: { id: task1id, content: "Take out the garbage" },
    [task2id]: { id: task2id, content: "Watch my favorite show" },
    [task3id]: { id: task3id, content: "Charge my phone" },
    [task4id]: { id: task4id, content: "Cook dinner" }
  },
  columns: {
    [col1id]: {
      id: col1id,
      title: "To do",
      taskIds: [task1id, task2id, task3id, task4id]
    },
    [col2id]: {
      id: col2id,
      title: "In Progress",
      taskIds: []
    },
    [col3id]: {
      id: col3id,
      title: "Done",
      taskIds: []
    }
  },
  columnOrder: [col1id, col2id, col3id]
};

export default initialData;
