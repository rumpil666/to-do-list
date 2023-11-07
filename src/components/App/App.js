import { useState, useEffect } from "react";

import './App.css';
import Main from '../Main/Main.js';
import Popup from '../Popup/Popup.js';
import Header from '../Header/Header.js';

function App() {

  const [tasks, setTasks] = useState([]);
  const [isTaskId, setIsTaskId] = useState('');
  const [isNewTaskPopupOpen, setIsNewTaskPopupOpen] = useState(false);

  function addStartTask() {
    if (JSON.parse(localStorage.getItem('tasks'))) {
      setTasks(JSON.parse(localStorage.getItem('tasks')));
    } else {
      setTasks([tasks])
    }
  }

  useEffect(() => {
    addStartTask();
  }, []);

  function handleTaskSubmit(newTask) {
    setTasks([newTask, ...tasks]);
  }

  function handleTaskEdit(taskId, newTask) {
    setTasks((tasks) => tasks.map((task) => {
      if (task.id === taskId) {
        return newTask;
      } else {
        return task
      }
    }));
  }

  function handleNewTaskBtn(taskId) {
    setIsTaskId(taskId);
    setIsNewTaskPopupOpen(!isNewTaskPopupOpen);
  }

  function handleSortCreateDate() {
    setTasks((tasks) => tasks.slice(0).sort(function (a, b) {
      return new Date(a.createDate) - new Date(b.createDate);
    }))
  }

  function handleSortDateExecution() {
    setTasks((tasks) => tasks.slice(0).sort(function (a, b) {
      return (new Date(`${a.date} ${a.time}:00`) - (new Date(a.createDate))) - (new Date(`${b.date} ${b.time}:00`) - (new Date(b.createDate)))
    }))
  }

  function handleTaskComplit(taskId) {
    setTasks((tasks) => tasks.map((task) => {
      if (task.id === taskId) {
        task.complited = true;
        return task
      } else {
        return task
      }
    }));
  }

  function handleTaskDelete(taskId) {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  const closePopup = () => {
    setIsNewTaskPopupOpen(false);
  };

  return (
    <div className='page'>
      <Header />
      <Main
        tasks={tasks}
        onNewTask={handleNewTaskBtn}
        onDeleteTask={handleTaskDelete}
        onComplitTask={handleTaskComplit}
        sortCreateDate={handleSortCreateDate}
        sortDateExecution={handleSortDateExecution}
      />
      <Popup
        tasks={tasks}
        isTaskId={isTaskId}
        isOpen={isNewTaskPopupOpen}
        onClose={closePopup}
        onSubmit={handleTaskSubmit}
        onEdit={handleTaskEdit}
      />
    </div>
  );
}

export default App;
