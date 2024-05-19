import React from "react";
import { UserButton as ClerkUserButton } from "@clerk/nextjs";

function UserButton() {
  return (
    <div className=" fixed top-2 end-2 md:top-4 md:end-4">
      <ClerkUserButton />
    </div>
  );
}

export default UserButton;
