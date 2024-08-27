import { NavLink, Outlet } from "react-router-dom";

function Product() {
  return (
    <div>
      <section>
        <div className="w-full h-60 bg-gray-200">상품 메인 정보</div>
      </section>
      <nav aria-label="상품 상세 탭">
        <ul>
          <NavLink to="detail">상세 정보</NavLink>
          <NavLink to="review">리뷰</NavLink>
          <NavLink to="qna">QnA</NavLink>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Product;
