import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactBigCalendar from './components/ReactBigCalendar';
import Todos from './components/Todo';
import ShowTodos from './components/ShowTodos';
import ChangeTodo from './components/ChangeTodo';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ReactBigCalendar />} />
          <Route path="/addTodo" element={<Todos />} />
          <Route path="/changeTodo:id" element={<ChangeTodo />} />
          <Route path="/:id" element={<ShowTodos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
