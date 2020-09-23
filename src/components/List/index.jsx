import React from "react";
import classNames from "classnames";

import "./List.sass";

const List = ({ items, isRemoveble, onClick }) => {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li
          key={index}
          onClick={onClick}
          className={classNames("list__item", item.className, {
            active: item.active,
          })}
        >
          <i>
            {item.icon ? (
              <img src={item.icon} alt="" />
            ) : (
              <i className="bange" style={{ background: item.color }}></i>
            )}
          </i>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;
