import React from "react";
import axios from "axios";
import Task from "../Task";
import AddTaskForm from "../AddTaskForm";
import { Link } from "react-router-dom";

import editSVG from "../../assets/img/edit.svg";
import "./tasksList.sass";

function TasksList({
  list,
  onEditTitle,
  onAddTask,
  withOutEmpty,
  onRemoveTask,
  onEditTask,
  onCompletedTask,
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
  console.log(list);
  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img src={editSVG} onClick={editTitle} alt="Edit Icon" />
        </h2>
      </Link>
      <ul className="tasks__items">
        {!list.tasks && list.tasks && !withOutEmpty && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((item) => (
            <Task
              key={item.id}
              item={item}
              list={list}
              onRemoveTask={onRemoveTask}
              onEdit={onEditTask}
              onCompleted={onCompletedTask}
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
