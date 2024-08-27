import { Outlet } from "react-router-dom";

function Category() {
  return (
    <div>
      <aside>어사이드 필터</aside>
      <Outlet />
    </div>
  );
}

export default Category;
