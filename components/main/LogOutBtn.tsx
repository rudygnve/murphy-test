"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const LogOutBtn = () => {
  return (
    <Button
      onClick={async () => await signOut()}
      type="button"
      variant="destructive"
    >
      Log Out
    </Button>
  );
};

export default LogOutBtn;
