import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useTodo } from '../hooks/useTodo';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const { todos } = useTodo();
  const navigate = useNavigate();
  const [value, setValue] = useState('00:00:00');
  const today = new Date().toLocaleDateString();
  const filtered = todos?.todo.todo.filter(
    (item) => new Date(item.start).toLocaleDateString() == today
  );
  const [showRemind, setShowRemind] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(new Date().toISOString().split('T')[1].split('.')[0]);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    filtered?.forEach((item) => {
      const time = value.split(':');
      const remindTime = new Date(item.remind).toISOString().split('T')[1].split('.')[0].split(':');
      if (time[0] === remindTime[0] && time[1] === remindTime[1] && item.remindMe === 'false') {
        item.remindMe = true;
        setShowRemind(item.title);
      }
    });
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRemind(undefined);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showRemind]);

  const addTodo = () => {
    navigate(`/addTodo`);
  };

  const handleSelect = (event) => {
    navigate(`/${event.start}`);
  };

  return (
    <div className="App">
      <button onClick={addTodo} className="addTodo">
        ADD TODO
      </button>
      {showRemind !== undefined ? (
        <div className="alert">
          <h1>{showRemind}</h1>
        </div>
      ) : (
        <></>
      )}
      <Calendar
        views={['month']}
        selectable
        localizer={localizer}
        defaultView="month"
        events={todos?.todo.todo}
        style={{ height: '100vh' }}
        onSelectEvent={handleSelect}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
