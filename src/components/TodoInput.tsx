import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function TodoInput() {
  return (
    <div className="flex flex-row gap-2 border rounded">
      <Input placeholder="Search for or add TODO" className=" border-none" />
      <Button variant={"outline"} className="border-none">
        Enter
      </Button>
    </div>
  );
}

export default TodoInput;
