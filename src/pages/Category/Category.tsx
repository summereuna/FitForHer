import React from "react";
import { Outlet } from "react-router-dom";

export const Category = () => {
  return (
    <div>
      <aside>어사이드 필터</aside>
      <Outlet />
    </div>
  );
};
