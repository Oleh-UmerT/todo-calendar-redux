import { types } from './types';

export const todoActions = Object.freeze({
  addTodo: (data) => {
    return {
      type: types.TODO_ADD,
      payload: data
    };
  },
  deleteTodo: (id) => {
    return {
      type: types.TODO_DELETE,
      payload: id
    };
  },
  changeTodo: (id, data) => {
    return {
      type: types.TODO_CHANGE,
      payload: { id: id, data: data }
    };
  },
  todoDone: (id, data) => {
    return {
      type: types.TODO_DONE,
      payload: { id: id, data: data }
    };
  }
});
