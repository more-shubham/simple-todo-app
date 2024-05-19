import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

function TodoItem({
  itemId,
  itemContent,
  isDone
}: {
  itemId: string;
  itemContent: string;
  isDone?: boolean;
}) {
  return (
    <div className="flex flex-row space-x-2 border p-2 rounded">
      <Checkbox id={itemId} checked={isDone} />
      <Label htmlFor={itemId} className={cn({ 'line-through': isDone })} >{itemContent}</Label>
    </div>
  );
}

export default TodoItem;
