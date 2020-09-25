import React, { useState, useEffect } from "react";
import axios from "axios";

import { List, AddList, TasksList } from "./components";

import listSvg from "./assets/img/burger.png";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (text) => {
    console.log(text);
    // axios
    //   .post("http://localhost:3001/tasks", {
    //     listId: activeItem,
    // 		text,
    // 		completed: true,
    //   })
    //   .then(({ data }) => {
    // 		console.log(data);
    // 		//setLists(data);
    //   })
    //   .finally(() => {
    //     //setisLoading(false);
    //   });
  };

  const onDelete = (id) => {
    const newList = lists.filter((item) => item.id !== id);
    setLists(newList);
  };

  const onClick = (item) => {
    setActiveItem(item);
  };

  const onEditTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  return (
    <div className="todo-wrapper">
      <div className="todo">
        <div className="todo__sidebar">
          {
            <List
              items={[
                {
                  icon: listSvg,
                  name: "Все задачи",
                  active: true,
                },
              ]}
            ></List>
          }
          {lists ? (
            <List
              items={lists}
              onDelete={onDelete}
              onClick={onClick}
              isRemoveble
              activeItem={activeItem}
            ></List>
          ) : (
            "Загрузка..."
          )}
          <AddList onAdd={onAddList} colors={colors}></AddList>
        </div>
        <div className="todo__tasks">
          {lists && activeItem && (
            <TasksList
              list={activeItem}
              onAddTask={onAddTask}
              onEditTitle={onEditTitle}
            ></TasksList>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
