import React, { useState } from "react";
import { Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import {
  listAdd,
  listToggleComplete,
  listRemove,
} from "../../store/slice/todoListSlice";
import Message from "../Message";
import "./styles.scss";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const [list, setList] = useState<string>("");

  const data = useAppSelector((state: RootState) => state.todoList);
  const { todoList, repeat } = data;

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(listAdd({ name: list, complete: false }));
    setList("");
  };

  const handleDelete = (item: any) => {
    dispatch(listRemove(item));
  };

  const handleToggleComplete = (item: any) => {
    dispatch(listToggleComplete(item));
  };

  return (
    <div className='todoList'>
      {/* Form for adding new items */}
      <Form className='mx-2 my-2' onSubmit={submitHandler}>
        <Form.Group controlId='inputList'>
          <Row>
            <Col xs={9} sm={8}>
              {/* Input for entering new item */}
              <Form.Control
                type='text'
                value={list}
                onChange={(e) => setList(e.target.value)}
                placeholder='Enter list'
                required
              />
            </Col>
            <Col xs={3} sm={4}>
              {/* Button to add new item */}
              <Button type='submit'>Add</Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>

      {todoList.length > 0 ? (
        // Displaying the todo list if it's not empty
        <>
          {repeat && (
            // Displaying an alert if a repeated item is added
            <Message variant='danger'>This note is already added</Message>
          )}
          {/* ListGroup to display the todo items */}
          <ListGroup className='todolistList'>
            {todoList.map((listItem: any) => (
              // Mapping through each todo item
              <ListGroup.Item
                variant={listItem.complete ? "success" : "primary"}
                key={listItem.name}
              >
                <Row>
                  <Col xs={8} sm={8}>
                    {/* Displaying the name of the todo item */}
                    - {listItem.name}
                  </Col>
                  <Col xs={2} sm={2}>
                    {/* Button to toggle completion status */}
                    <Button
                      variant={listItem.complete ? "success" : "danger"}
                      onClick={() => handleToggleComplete(listItem.name)}
                    >
                      {listItem.complete ? (
                        <i className='fas fa-check'></i>
                      ) : (
                        <i className='fas fa-eraser'></i>
                      )}
                    </Button>
                  </Col>
                  <Col xs={2} sm={2}>
                    {/* Button to delete the todo item */}
                    <Button
                      variant='dark'
                      onClick={() => handleDelete(listItem.name)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        // Displaying a message if the todo list is empty
        <ListGroup>
          <ListGroup.Item className='text-center'>
            Nothing to do yet
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
};

export default TodoList;
