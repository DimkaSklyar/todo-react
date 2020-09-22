import React from "react";

import "./List.sass";

const List = ({ props }) => {
  return (
    <ul className="list">
      {props.map((item) => (
        <li class={item.active ? "list__item active" : "list__item"}>
          <i>
            {item.icon ? (
              <img src={item.icon} alt="" />
            ) : (
              <i className="bange" style={{ background: item.color }}></i>
            )}
          </i>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;
