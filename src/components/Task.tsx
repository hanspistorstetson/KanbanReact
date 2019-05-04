import * as React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../initial-data";

export const Container = styled.div<{ isDragging?: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;

interface IProps {
  task: ITask;
  index: number;
}

export default class Task extends React.Component<IProps> {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
