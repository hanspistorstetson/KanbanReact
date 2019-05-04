import * as React from "react";
import styled from "styled-components";
import { Container, Title } from "./Column";

interface IState {
  showingForm: boolean;
  newColumnName: string;
}

interface IProps {
  handleAddColumn: Function;
}

class NewColumnEditor extends React.Component<IProps, IState> {
  private containerRef: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    this.containerRef = React.createRef();
  }
  readonly state = {
    showingForm: false,
    newColumnName: ""
  };

  handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!this.state.showingForm || event.target === this.containerRef.current) {
      console.log("Clicking the parent container");
      this.setState({ showingForm: !this.state.showingForm });
    }
  };

  validateForm = () => {
    return this.state.newColumnName.length > 0;
  };

  handleSubmit = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.stopPropagation();
    if (!this.validateForm()) {
      return;
    }
    this.props.handleAddColumn(this.state.newColumnName);
    console.log("submit");
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newColumnName: event.target.value
    });
  };

  render() {
    return (
      <Container onClick={this.handleClick} ref={this.containerRef}>
        <Title>New Column</Title>
        {this.state.showingForm ? (
          <>
            <input
              name="title"
              id="newColumnName"
              type="text"
              placeholder="Enter new column name"
              value={this.state.newColumnName}
              onChange={this.handleChange}
            />
            <input type="submit" onClick={this.handleSubmit} />
          </>
        ) : (
          <p>Click to create new column</p>
        )}
      </Container>
    );
  }
}

export default NewColumnEditor;
