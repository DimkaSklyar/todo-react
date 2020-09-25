import React, { useState } from "react";

import addSVG from "./../../assets/img/add.svg";

import "./AddTaskForm.sass";

function AddTaskForm({ list, onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [toggleVisible, setToggleVisible] = useState(false);

  const onVisibleForm = () => {
    setToggleVisible(!toggleVisible);
    setInputValue("");
  };

  const addTask = (textTask) => {
    console.log(list);
    //TODO
    // const newList = [
    //   ...list.tasks,
    //   {
    //     listId: list.id,
    //     text: textTask,
    //     completed: true,
    //   },
    // ];
    // console.log(newList);
    //onAddTask(newList);
    onVisibleForm();
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
          <button onClick={() => addTask(inputValue)} className="btn">
            Добавить задачу
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
