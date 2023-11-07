import './Main.css';
import Task from '../Task/Task.js';

import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';

import { useState, useEffect } from 'react';

function Main({ tasks, onNewTask, onDeleteTask, onComplitTask, sortCreateDate, sortDateExecution }) {
  const [timeouts, setTimeouts] = useState([]);

  function clearAllTimeouts() {
    timeouts.forEach(timer => clearTimeout(timer));
    setTimeouts([])
  }

  function addNotificationMessagge() {
    console.log(timeouts)
    clearAllTimeouts();
    tasks.forEach((task) => {
      const timeToExecution = (new Date(`${task.date} ${task.time}:00`)) - (new Date());
      if (timeToExecution < 7200000) return;
      if (task.complited) return;
      let elem = setTimeout(() => {
        addNotification({
          title: `Срок исполнения задачи ${task.title} наступает через 2 часа`,
          native: true,
          duration: 5000,
        })
      }, timeToExecution - 7200000);
      setTimeouts([...timeouts, elem])
    });
  }

  function handleNewTask() {
    onNewTask('')
  }

  function upgradeLocalStorage() {
    setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, 0);
  }

  useEffect(() => {
    upgradeLocalStorage();
    clearAllTimeouts();
    addNotificationMessagge();
  }, [tasks, onNewTask, onDeleteTask, onComplitTask, sortCreateDate, sortDateExecution]);

  return (
    <div className='main'>
      <Notifications />
      <div className='buttons-sort'>
        <button className='button button--sort' onClick={sortCreateDate}>Сортировать по дате создания</button>
        <button className='button button--sort' onClick={sortDateExecution}>Сортировка по дате исполнения</button>
      </div>
      <section
        className='tasks'
        aria-label='Мои задачи'
      >
        <div className='task__list'>
          <div className='task__header'>
            <p className='task__subtitle task__subtitle--title'>Название задачи</p>
            <p className='task__subtitle task__subtitle--description'>Описание задачи</p>
            <p className='task__subtitle task__subtitle--date'>Дата исполнения задачи</p>
          </div>
          {tasks.length !== 0 ? (
            tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onDeleteTask={onDeleteTask}
                  onComplitTask={onComplitTask}
                  onEditTask={onNewTask}
                />
              );
            }))
            : (<p className='tasks__title'>Вы пока не добавили ни одну задачу. Чтобы добавить новую задачу, нажмите кнопку ниже.</p>)
          }

        </div>
      </section>
      <button
        onClick={handleNewTask}
        className='button'
      >
        New task
      </button>
    </div>
  );
}

export default Main;