import React from "react";
import List from "./components/List";
import AddList from "./components/AddList";

import DB from "./assets/db.json";

import listSvg from "./assets/img/burger.png";

function App() {
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
          <List
            items={DB.lists.map((item) => {
              item.color = DB.colors.find(
                (color) => color.id === item.colorId
              ).hex;
              console.log(item);
              return item;
            })}
            isRemoveble
          ></List>
          <AddList colors={DB.colors}></AddList>
        </div>
        <div className="todo__tasks"></div>
      </div>
    </div>
  );
}

export default App;
