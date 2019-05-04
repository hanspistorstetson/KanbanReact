import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { uniqueId } from "lodash";

import initialData, { IDataState, IColumnDict } from "./initial-data";
import Column from "./components/Column";
import NewColumnEditor from "./components/NewColumnEditor";

const Container = styled.div`
  display: flex;
  overflow: auto;
`;

const AppContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: blue;
`;

class App extends React.Component<{}, IDataState> {
  readonly state = initialData;

  handleAddTask = (newTaskName: string) => {
    console.log(newTaskName);
  };

  handleAddColumn = (newColumnName: string) => {
    console.log(`Adding column ${newColumnName}`);
    const newColumnId = uniqueId("column-");
    const newColumn = {
      id: newColumnId,
      title: newColumnName,
      taskIds: []
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumnId]: newColumn
      },
      columnOrder: [...this.state.columnOrder, newColumnId]
    };

    this.setState(newState);
  };

  onDragEnd = ({ destination, source, draggableId, type }: DropResult) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "COLUMN") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      };

      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const end = this.state.columns[destination.droppableId];

    // movement within one column
    if (start === end) {
      const column = this.state.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      return;
    }

    // movement within multipel columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(end.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      taskIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd
      }
    };

    this.setState(newState);
  };

  render() {
    console.log(this.state);
    return (
      <AppContainer>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="COLUMN"
          >
            {provided => (
              <Container {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.columnOrder.map((columnId, index) => {
                  const column = this.state.columns[columnId];
                  const tasks = column.taskIds.map(
                    taskId => this.state.tasks[taskId]
                  );

                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                      addNewTask={this.handleAddTask}
                    />
                  );
                })}
                {provided.placeholder}
                <NewColumnEditor handleAddColumn={this.handleAddColumn} />
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </AppContainer>
    );
  }
}

export default App;
