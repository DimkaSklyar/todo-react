import React from "react";
import editSVG from "../../assets/img/edit.svg";

import "./tasksList.sass";

function TasksList({ list }) {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img src={editSVG} alt="Edit Icon" />
      </h2>
      <ul className="tasks__items">
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
    </div>
  );
}

export default TasksList;
