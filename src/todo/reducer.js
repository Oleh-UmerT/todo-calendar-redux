import { types } from './types';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  todo: []
};

export const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.TODO_ADD:
      return {
        ...state,
        todo: [...state.todo, { ...payload, id: uuidv4() }]
      };
    case types.TODO_DELETE:
      return {
        ...state,
        todo: state.todo.filter((item) => item.id !== payload)
      };
    case types.TODO_CHANGE:
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.id === payload.id ? { ...payload.data, id: payload.id } : item
        )
      };
    default:
      return state;
  }
};
