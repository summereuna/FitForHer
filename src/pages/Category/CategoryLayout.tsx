import { Outlet } from "react-router-dom";

function CategoryLayout() {
  return (
    <div className="flex flex-row h-full space-x-5">
      <Outlet />
    </div>
  );
}

export default CategoryLayout;
