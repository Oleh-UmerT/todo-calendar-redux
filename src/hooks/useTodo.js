import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../todo/actions';

export const useTodo = () => {
  const dispatch = useDispatch();

  const addTodo = (data) => {
    dispatch(todoActions.addTodo(data));
  };

  const deleteTodo = (id) => {
    dispatch(todoActions.deleteTodo(id));
  };

  const changeTodo = (id, data) => {
    dispatch(todoActions.changeTodo(id, data));
  };

  const todos = useSelector((state) => state);

  return {
    todos,
    addTodo,
    deleteTodo,
    changeTodo
  };
};
