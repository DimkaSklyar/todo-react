import React from "react";
import classNames from "classnames";
import axios from "axios";
import closeImg from "../../assets/img/close.svg";

import "./List.sass";

const List = ({
  items,
  isRemoveble,
  onClickItem,
  onClick,
  onDelete,
  activeItem,
}) => {

  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onDelete(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames("list__item", item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>
            {item.icon ? (
              <img src={item.icon} alt="" />
            ) : (
              <i className="bange" style={{ background: item.color.hex }}></i>
            )}
          </i>
          <span>{item.name}</span> {item.tasks && ` (${item.tasks.length})`}
          {isRemoveble && (
            <button className="btn-close-list" onClick={() => removeList(item)}>
              <img src={closeImg} alt="" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
