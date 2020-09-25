import React from "react";
import axios from "axios";

import AddTaskForm from "../AddTaskForm";

import editSVG from "../../assets/img/edit.svg";

import "./tasksList.sass";

function TasksList({ list, onEditTitle, onAddTask }) {
  const editTitle = () => {
    const newTitle = window.prompt("Введите новое название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => alert("Не удалось изменить название. :("));
    }
  };

  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img src={editSVG} onClick={editTitle} alt="Edit Icon" />
      </h2>
      <ul className="tasks__items">
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map((item) => (
          <li key={item.id} className="tasks__item">
            <input type="checkbox" name="itemCheck" id={`task-${item.id}`} />
            <label htmlFor={`task-${item.id}`}>
              <svg
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
            <input
              readOnly
              className="tasks__value"
              value={item.text}
              type="text"
            />
          </li>
        ))}
      </ul>
      <AddTaskForm list={list} onAddTask={onAddTask}></AddTaskForm>
    </div>
  );
}

export default TasksList;
