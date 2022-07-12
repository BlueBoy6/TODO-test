import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import TodoItem from "./component/TodoItem";
import AddItemInput from "./component/AddItemInput";
import {
  localStoreInitialize,
  localStoreRemoveItem,
  localStoreSave
} from "./state/localStore";
import "./styles.scss";

function App() {
  const initialeState = localStoreInitialize();
  const [todosList, setTodoList] = useState(initialeState);

  function addTODO(val) {
    const itemCreated = { id: v4(), name: val };
    return setTodoList(todosList.concat(itemCreated));
  }

  function modifyTODO(itemModified) {
    const listRebuild = todosList.map((item) => {
      if (item.id === itemModified.id) return itemModified;
      return item;
    });
    return setTodoList(listRebuild);
  }

  function deleteTODO(idItem) {
    const listRebuild = todosList.filter((todo) =>
      todo.id === idItem ? null : todo
    );
    localStoreRemoveItem(idItem);
    return setTodoList(listRebuild);
  }
  useEffect(() => {
    localStoreSave(todosList);
  }, [todosList]);

  return (
    <div className="App">
      <h1>TODO LIST : </h1>
      <AddItemInput addItemValue={addTODO} />
      <div className="list_items">
        {todosList.length > 0 &&
          todosList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              handleModification={modifyTODO}
              handleDelete={deleteTODO}
            />
          ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
