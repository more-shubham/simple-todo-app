"use client";

import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useStore } from "@/lib/stores";

function TodoLists() {
  const { loadTodo, todoList, filteredTodo } = useStore();
  useEffect(() => {
    return () => {
      loadTodo();
    };
  }, []);
  return (
    <>
      {filteredTodo().filter((e) => !e?.isDone).length ? (
        <div className="text-muted-foreground flex flex-row justify-between px-2 border-b pb-1.5 pt-2">
          <div className="">
            <span className="text-secondary-foreground" >ToDo</span> {filteredTodo().filter((e) => !e?.isDone).length} items
          </div>
          <div className="">Due</div>
        </div>
      ) : (
        <></>
      )}
      {filteredTodo()
        .filter((e) => !e?.isDone)
        .map(({ id, message, created, isDone }, key) => (
          <TodoItem
            key={key}
            itemId={id}
            itemContent={message}
            created={created}
            isDone={isDone}
          />
        ))}
      {filteredTodo().filter((e) => e.isDone).length ? (
        <div className="text-muted-foreground flex flex-row justify-between px-2 border-b pb-1.5 pt-2">
          <div className="">
            <span className="text-secondary-foreground" >Completed</span> {filteredTodo().filter((e) => e?.isDone).length} items
          </div>
          <div className="">Due</div>
        </div>
      ) : (
        <></>
      )}
      {filteredTodo()
        .filter((e) => e.isDone)
        .map(({ id, message, created, isDone }, key) => (
          <TodoItem
            key={key}
            itemId={id}
            itemContent={message}
            created={created}
            isDone={isDone}
          />
        ))}
    </>
  );
}

export default TodoLists;
