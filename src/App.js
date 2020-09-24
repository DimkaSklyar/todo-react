import React, { useState, useEffect } from "react";
import axios from 'axios'

import { List, AddList, TasksList } from "./components";

import listSvg from "./assets/img/burger.png";



function App() {

  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null)


  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [
      ...lists,
      obj
    ]
    setLists(newList);
  }

  const onDelete = (id) => {
    const newList = lists.filter((item) => item.id !== id);
    setLists(newList);
  }

  return (
    <div className="todo-wrapper">
      <div className="todo">
        <div className="todo__sidebar">
          {<List
            items={[
              {
                icon: listSvg,
                name: "Все задачи",
                active: true,
              },
            ]}
          ></List>}
          {lists ? (<List items={lists} onDelete={onDelete} isRemoveble></List>) : ('Загрузка...')}
          <AddList onAdd={onAddList} colors={colors}></AddList>
        </div>
        <div className="todo__tasks">
          {lists && <TasksList list={lists[0]}></TasksList>}
        </div>
      </div>
    </div>
  );
}

export default App;
