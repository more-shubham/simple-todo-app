"use client";

import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useStore } from "@/lib/stores"

function TodoInput() {
  const { input, changeInput, addTodo } = useStore();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeInput(event.target.value)
  }

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (input.trim()) {
      // add todo
      addTodo()
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input.trim()) {
      // add todo
      addTodo()
    }
  }

  return (
    <div className="flex flex-row gap-2 border rounded">
      <Input placeholder="Search for or add TODO" className="border-none" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
      <Button variant={"outline"} className="border-none" onClick={handleButtonClick} >
        Enter
      </Button>
    </div>
  );
}

export default TodoInput;
