"use client";

import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useStore } from "@/lib/stores";

function TodoLists() {
  const { loadTodo, todoList } = useStore();
  useEffect(() => {
    return () => {
      loadTodo();
    };
  });
  return (
    <>
      {todoList.map(({ id, message }, key) => (
        <TodoItem key={key} itemId={id} itemContent={message} />
      ))}
    </>
  );
}

export default TodoLists;