import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function Todos() {
  const { addTodo } = useTodo();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const goBack = () => {
    navigate(`/`, { replace: true });
  };

  const onSubmit = (data) => {
    addTodo(data);
    reset();
  };

  return (
    <div className="todos">
      <button onClick={goBack} className="back">
        GO BACK
      </button>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} type="text" placeholder="  title" className="input" />
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
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
