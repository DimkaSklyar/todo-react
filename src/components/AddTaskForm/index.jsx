import React, { useState } from "react";
import axios from "axios";

import addSVG from "./../../assets/img/add.svg";

import "./AddTaskForm.sass";

function AddTaskForm({ list, onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [toggleVisible, setToggleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onVisibleForm = () => {
    setToggleVisible(!toggleVisible);
    setInputValue("");
  };

  const addTask = () => {
    const objTask = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", objTask)
      .then(({ data }) => {
        onAddTask(list.id, data);
      })
      .catch(() => alert("Ошибка при добавление задачи!"))
      .finally(() => {
        setIsLoading(false);
        onVisibleForm();
      });
  };

  return (
    <div className="tasks__form">
      {!toggleVisible ? (
        <div className="tasks__form-new" onClick={onVisibleForm}>
          <img src={addSVG} alt="" />
          <span>Добавить задачу</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            type="text"
            name="namefolder"
            className="field field-w-100"
            placeholder="Название задачи"
          />
          <button disabled={isLoading} onClick={addTask} className="btn">
            {isLoading ? "Добавляется..." : "Добавить"}
          </button>
          <button onClick={onVisibleForm} className="btn btn__theme_cancel">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
