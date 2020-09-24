import React, { useState } from "react";
import classNames from "classnames";
import List from "../List";

import addItem from "../../assets/img/addItem.png";
import closeBtn from "../../assets/img/closeButton.png";

import "./AddList.sass";

const AddList = ({ colors, onAdd }) => {
  const [state, setState] = useState(false);
  const [stateColor, setStateColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState("");

  const addList = () => {
    if (!inputValue) {
      return;
    }
    const color = colors.find((color) => color.id === stateColor).hex;
    onAdd({ id: Math.random(), name: inputValue, color: color });
    closePopup();
  };

  const closePopup = () => {
    setState(false);
    setInputValue("");
    setStateColor(colors[0].id);
  };
  
  return (
    <div className="add-list__wrapper">
      <List
        onClick={() => setState(true)}
        items={[
          {
            className: "add-list-item",
            icon: addItem,
            name: "Добавить список",
          },
        ]}
      ></List>
      {state && (
        <div className="add-list-popup">
          <button className="close-btn" onClick={closePopup}>
            <img src={closeBtn} alt="Закрыть" />
          </button>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            name="namefolder"
            className={classNames("field", "field-w-100")}
            placeholder="Название папки"
          />
          <ul className="list-color">
            {colors.map((color) => (
              <li
                onClick={() => setStateColor(color.id)}
                key={color.id}
                style={{
                  background: color.hex,
                }}
                className={classNames(
                  "list-color__item",
                  stateColor === color.id && "active"
                )}
              ></li>
            ))}
          </ul>
          <button onClick={addList} className={classNames("btn", "btn-w-100")}>
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
