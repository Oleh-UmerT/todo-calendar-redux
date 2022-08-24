import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Todo.css';
import { useTodo } from '../hooks/useTodo';

const schema = yup
  .object({
    title: yup.string().required().min(2),
    start: yup.date().required(),
    end: yup.date().required(),
    remind: yup.date().required()
  })
  .required();

export default function ChangeTodo() {
  const { todos, changeTodo } = useTodo();
  const navigate = useNavigate();
  const { id } = useParams();
  const todoId = id.split(':')[1];
  const actualTodo = todos?.todo.todo.filter((item) => item.id === todoId);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const goBack = () => {
    navigate(`/`, { replace: true });
  };

  const onSubmit = (data) => {
    changeTodo(actualTodo[0].id, data);
    reset();
  };

  return (
    <div className="todos">
      <button onClick={goBack} className="back">
        GO BACK
      </button>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('title')}
          type="text"
          defaultValue={actualTodo[0].title}
          placeholder="  title"
          className="input"
        />
        <label>Start Time</label>
        <input
          {...register('start', { valueAsDate: true })}
          type="datetime-local"
          className="time"
        />
        <label>End Time</label>
        <input {...register('end', { valueAsDate: true })} type="datetime-local" className="time" />
        <label>Remind Time</label>
        <input
          {...register('remind', { valueAsDate: true })}
          type="datetime-local"
          className="time"
        />
        <input type="hidden" {...register('remindMe')} value="false" />
        <input type="hidden" {...register('done')} value="false" />
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
