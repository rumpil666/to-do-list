import './Task.css';

function Task({
  task,
  onDeleteTask,
  onComplitTask,
  onEditTask
}) {


  function handleComplitedClick() {
    onComplitTask(task.id);
  }

  function handleDeleteClick() {
    onDeleteTask(task.id);
  }

  function handleEditClick() {
    onEditTask(task.id)
  }

  return (
    <li className='task'>
      <h2 className='task__title'>{task.title}</h2>
      <p className='task__subtitle'>{task.description}</p>
      <p className='task__date'>{task.date} {task.time}</p>
      <button
        onClick={handleEditClick}
        className={`task__edit ${task.complited ? 'task__edit--hide' : ''}`}
        type='button'
        aria-label='Редактировать'
        disabled={task.complited}
      />
      <div className="task__buttons">
        <button
          onClick={handleComplitedClick}
          className={`task__complited ${task.complited ? 'task__complited--complit' : ''}`}
          type='button'
          aria-label='Статус выполнения'
          disabled={task.complited}
        />
        <button
          className='task__delete'
          onClick={handleDeleteClick}
          type='button'
          aria-label='Удалить'
        />
      </div>
    </li>
  );
}

export default Task;
