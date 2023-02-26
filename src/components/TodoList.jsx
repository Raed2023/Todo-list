import React, { Component } from 'react';


class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      newTodo: '',
      completingTodoIndex: null
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  }

  handleAddTodo = () => {
    const { newTodo, todos } = this.state;

    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, newTodo.trim()];

      this.setState({
        todos: updatedTodos,
        newTodo: ''
      });
    }
  }

  handleCompleteTodo = (index) => {
    this.setState({ completingTodoIndex: index });
  }

  handleConfirmComplete = () => {
    const { completingTodoIndex, todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos[completingTodoIndex] = <span className="completed">{todos[completingTodoIndex]}</span>;

    this.setState({
      todos: updatedTodos,
      completingTodoIndex: null
    });
  }

  handleCancelComplete = (index) => {
    const { todos } = this.state;
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
  
    this.setState({
      todos: updatedTodos,
      completingTodoIndex: null
    });
  }
  

  render() {
    const { todos, newTodo, completingTodoIndex } = this.state;

    return (
      <div className="todo-list">
        <h1>Todo List</h1>

        <div className="add-todo">
          <input type="text" value={newTodo} onChange={this.handleInputChange} />
          <button onClick={this.handleAddTodo}>Add Todo</button>
        </div>

        <ul className="todos">
          {todos.map((todo, index) => (
            <li key={index} className="todo">
              {typeof todo === 'string' ? (
                <>
                  {todo}

                  {completingTodoIndex === index ? (
                    <div className="confirm-completion">
                      <button className="complete-btn" onClick={this.handleConfirmComplete}>Complete</button>
                      <button className="cancel-btn" onClick={() => this.handleCancelComplete(index)}>Cancel</button>

                    </div>
                  ) : (
                    <button className="complete-btn" onClick={() => this.handleCompleteTodo(index)}>Complete</button>
                  )}
                </>
              ) : (
                todo
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
