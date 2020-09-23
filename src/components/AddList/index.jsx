import React, { useState } from "react";
import classNames from "classnames";
import List from "../List";

import addItem from "../../assets/img/addItem.png";
import closeBtn from "../../assets/img/closeButton.png"

import "./AddList.sass";

const AddList = ({ colors }) => {
  const [state, setState] = useState(false);
  const [stateColor, setStateColor] = useState(colors[0].id);
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
          <button className="close-btn" onClick={()=>setState(false)}>
            <img src={closeBtn} alt="Закрыть"/>
          </button>
          <input
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
          <button className={classNames("btn", "btn-w-100")}>Добавить</button>
        </div>
      )}
    </div>
  );
};

export default AddList;
