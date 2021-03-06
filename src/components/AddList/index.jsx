import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";

import List from "../List";

import addItem from "../../assets/img/addItem.png";
import closeBtn from "../../assets/img/closeButton.png";

import "./AddList.sass";

const AddList = ({ colors, onAdd }) => {
  const [state, setState] = useState(false);
  const [stateColor, setStateColor] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setStateColor(colors[0].id);
    }
  }, [colors]);

  const addList = () => {
    if (!inputValue) {
      return;
    }
    setisLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: stateColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === stateColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        closePopup();
      })
      .finally(() => {
        setisLoading(false);
      });
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
            {isLoading ? "Добавляется..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
