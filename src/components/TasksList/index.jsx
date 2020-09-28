import React from "react";
import axios from "axios";
import Task from "../Task";
import AddTaskForm from "../AddTaskForm";

import editSVG from "../../assets/img/edit.svg";
import "./tasksList.sass";

function TasksList({
  list,
  onEditTitle,
  onAddTask,
  withOutEmpty,
  onRemoveTask,
  onEditTask,
}) {
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
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img src={editSVG} onClick={editTitle} alt="Edit Icon" />
      </h2>
      <ul className="tasks__items">
        {!list.tasks.length && !withOutEmpty && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map((item) => (
          <Task
            key={item.id}
            item={item}
            onRemoveTask={onRemoveTask}
            onEdit={onEditTask}
          ></Task>
        ))}
      </ul>
      <AddTaskForm
        key={list.id}
        list={list}
        onAddTask={onAddTask}
      ></AddTaskForm>
    </div>
  );
}

export default TasksList;
