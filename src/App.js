import React, { useState } from "react";
import List from "./components/List";
import AddList from "./components/AddList";

import DB from "./assets/db.json";

import listSvg from "./assets/img/burger.png";

function App() {
  const [lists, setLists] = useState(
    DB.lists.map((item) => {
      item.color = DB.colors.find((color) => color.id === item.colorId).hex;
      return item;
    })
	);
	
	const onAddList = (obj) => {
		const newList = [
			...lists,
			obj
		]
		setLists(newList);
	}

	const onDelete = (obj) => {
		const newList = lists.filter((item)=> item.id !== obj.id)
		setLists(newList);
	}

  return (
    <div className="todo-wrapper">
      <div className="todo">
        <div className="todo__sidebar">
          <List
            items={[
              {
                icon: listSvg,
                name: "Все задачи",
                active: true,
              },
            ]}
          ></List>
          <List items={lists} onDelete={onDelete} isRemoveble></List>
          <AddList onAdd={onAddList} colors={DB.colors}></AddList>
        </div>
        <div className="todo__tasks"></div>
      </div>
    </div>
  );
}

export default App;
