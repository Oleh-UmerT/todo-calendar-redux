import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodo } from '../hooks/useTodo';
import '../styles/ShowTodos.css';

export default function ShowTodos() {
  const { todos, deleteTodo, changeTodo } = useTodo();
  const navigate = useNavigate();
  const { id } = useParams();
  let filtered = todos?.todo.todo.filter((item) => item.start == id);
  if (filtered.length < 1) {
    filtered = todos?.todo.todo.filter(
      (item) => new Date(item.start).toLocaleDateString() == new Date(id).toLocaleDateString()
    );
  }

  const goBack = () => {
    navigate(`/`, { replace: true });
  };

  const navToChange = (id) => {
    navigate(`/changeTodo:${id}`, { replace: true });
  };

  const finished = (id) => {
    const todo = filtered?.filter((item) => item.id === id);
    if (todo[0].done == false) {
      todo[0].done = true;
    } else {
      todo[0].done = false;
    }
    changeTodo(id, todo[0]);
  };

  return (
    <div className="todos">
      <button onClick={goBack} className="back">
        GO BACK
      </button>
      {filtered?.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <h2>{`${item.done}`}</h2>
            <button className="delete" onClick={() => deleteTodo(item.id)}>
              DETELE
            </button>
            <button className="update" onClick={() => navToChange(item.id)}>
              UPDATE
            </button>
            <button className="confirm" onClick={() => finished(item.id)}>
              DONE/UNDONE
            </button>
          </div>
        );
      })}
    </div>
  );
}
