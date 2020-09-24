import React from "react";
import classNames from "classnames";

import closeImg from "../../assets/img/close.svg";

import "./List.sass";

const List = ({ items, isRemoveble, onClick, onDelete }) => {

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
          {isRemoveble && (
            <button className="btn-close-list" onClick={()=>onDelete(item)}>
              <img src={closeImg} alt="" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
