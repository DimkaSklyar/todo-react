import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import { List, AddList, TasksList } from "./components";

import listSvg from "./assets/img/burger.png";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState();
  const [withOutEmpty, setWithOutEmpty] = useState(true);
  let history = useHistory();

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

  useEffect(() => {
    const listId = history.location.pathname.split("/lists/")[1];
    if (lists) {
      const list = lists.find((item) => item.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, history.location.pathname]);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (id, objTask) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.tasks = [...item.tasks, objTask];
      }
      return item;
    });
    setLists(newList);
  };

  const onDelete = (id) => {
    const newList = lists.filter((item) => item.id !== id);
    setLists(newList);
  };

  const onRemoveTask = (listId, taskId) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.filter((task) => task.id !== taskId);
      }
      return item;
    });
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      axios
        .delete("http://localhost:3001/tasks/" + taskId)
        .catch(() => alert("Не удалось удалить задачу. :("));
    }
    setLists(newList);
  };

  const onEditTask = (id, text) => {
		const newTitle = window.prompt("Введите новое название списка", text);
		let newList = lists;
    if (newTitle) {
      newList = lists.map((item) => {
        if (item.tasks.id === id) {
          item.tasks.text = text;
        }
        return item;
      });
      axios
        .patch("http://localhost:3001/tasks/" + id, {
          text: newTitle,
        })
        .catch(() => alert("Не удалось изменить задачи. :("));
		}
		console.log(newList)
		setLists(newList);
  };

  const onClick = (item) => {
    setActiveItem(item);
    history.push(`/lists/${item.id}`);
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
              onClick={(list) => history.push(`/`)}
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
          <Route exact path="/">
            {lists &&
              lists.map((list) => (
                <TasksList
                  key={list.id}
                  list={list}
                  onAddTask={onAddTask}
                  onEditTitle={onEditTitle}
                  withOutEmpty
                  onRemoveTask={onRemoveTask}
                  onEditTask={onEditTask}
                ></TasksList>
              ))}
          </Route>
          <Route path="/lists/:id">
            {lists && activeItem && (
              <TasksList
                list={activeItem}
                onAddTask={onAddTask}
                onEditTitle={onEditTitle}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
              ></TasksList>
            )}
          </Route>
        </div>
      </div>
    </div>
  );
}

export default App;
