import './Popup.css';

import { useEffect } from "react";
import useFormValidation from "../../hooks/UseFormValidation.js";

function Popup({
  tasks,
  isOpen,
  onClose,
  onSubmit,
  onEdit,
  isTaskId
}) {

  const { enteredValues, errors, handleChange, isFormValid, resetForm } = useFormValidation();

  const task = tasks.find((task) => task.id === isTaskId);

  function addInfoInPopup() {
    if (task !== undefined && Object.keys(enteredValues).length === 0) {
      enteredValues.title = task.title;
      enteredValues.description = task.description;
      enteredValues.date = task.date;
      enteredValues.time = task.time;
    }
  }

  addInfoInPopup();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isTaskId) {
      onSubmit({
        id: crypto.randomUUID(),
        title: enteredValues.title,
        description: enteredValues.description,
        date: enteredValues.date,
        createDate: new Date(),
        time: enteredValues.time,
        complited: false
      });
    } else {
      onEdit(isTaskId, {
        id: isTaskId,
        title: enteredValues.title,
        description: enteredValues.description,
        date: enteredValues.date,
        time: enteredValues.time,
        complited: false
      })
    }
    onClose();
  }

  return (
    <div className={`popup popup_task ${isOpen ? 'popup--open' : ''}`}>
      <div className='popup__container'>
        <button
          onClick={onClose}
          className='popup__close'
          type='button'
          aria-label='Закрыть'
        ></button>
        <h2 className='popup__title'>Новая задача</h2>
        <form className='popup__form form' onSubmit={onSubmit}>
          <input
            className='popup__input'
            placeholder='Название задачи'
            name='title'
            id='title'
            type='text'
            value={enteredValues.title || ""}
            required
            onChange={handleChange}
          />
          {errors.title && (
            <span className="popup__input-error title-input-error">
              {errors.title}
            </span>
          )}
          <input
            className='popup__input'
            placeholder='Описание задачи'
            name='description'
            id='description'
            type='text'
            value={enteredValues.description || ""}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="popup__input-error description-input-error">
              {errors.description}
            </span>
          )}
          <input
            className='popup__input'
            name='date'
            id='date'
            placeholder='Дата выполнения задачи'
            type='date'
            value={enteredValues.date || ""}
            required
            onChange={handleChange}
          />
          {errors.date && (
            <span className="popup__input-error date-input-error">
              {errors.date}
            </span>
          )}
          <input
            className='popup__input'
            name='time'
            id='time'
            placeholder='Дата выполнения задачи'
            type='time'
            value={enteredValues.time || ""}
            required
            onChange={handleChange}
          />
          {errors.time && (
            <span className="popup__input-error time-input-error">
              {errors.time}
            </span>
          )}
          <button
            onClick={handleSubmit}
            className={`popup__submit ${!isFormValid ? "popup__submit--disabled" : ""
              }`}
            type="submit"
            disabled={!isFormValid}
          >
            {isTaskId ? 'Изменить задачу' : 'Создать задачу'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;