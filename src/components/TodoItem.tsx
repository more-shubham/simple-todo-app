import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { cn, formatDate } from "@/lib/utils";
import { useStore } from "@/lib/stores";

function TodoItem({
  itemId,
  itemContent,
  created,
  isDone,
}: {
  itemId: string;
  itemContent: string;
  created: Date;
  isDone?: boolean;
}) {
  const { updateStatus } = useStore();
  return (
    <div
      className={cn("flex flex-row items-center space-x-2 border p-2 rounded", {
        "cursor-not-allowed": isDone,
      })}
    >
      <Checkbox
        id={itemId}
        disabled={isDone}
        checked={isDone}
        onCheckedChange={(event: boolean) => updateStatus(itemId, event)}
      />
      <Label
        htmlFor={itemId}
        className={cn({ "line-through": isDone }, "flex-1")}
      >
        {itemContent}
      </Label>
      <div className={cn({ "line-through": isDone })}>
        {formatDate(created)}
      </div>
    </div>
  );
}

export default TodoItem;
