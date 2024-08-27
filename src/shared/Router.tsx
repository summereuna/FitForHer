import { useAuth } from "@/hooks/useAuth";
import About from "@/pages/About";
import Best from "@/pages/Category/Best";
import Brands from "@/pages/Category/Brands";
import Bras from "@/pages/Category/Bras";
import Cart from "@/pages/Category/Cart";
import Category from "@/pages/Category/Category";
import New from "@/pages/Category/New";
import Pants from "@/pages/Category/Pants";
import Tops from "@/pages/Category/Tops";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashOverview from "@/pages/Dashboard/DashOverview";
import DashProduct from "@/pages/Dashboard/DashProduct";
import DashSetting from "@/pages/Dashboard/DashSetting";
import DashTransaction from "@/pages/Dashboard/DashTransaction";
import Help from "@/pages/Help";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Product from "@/pages/Product/Product";
import ProductDetail from "@/pages/Product/ProductDetail";
import QnA from "@/pages/Product/QnA";
import Review from "@/pages/Product/Review";
import Signup from "@/pages/Signup";
import Wish from "@/pages/Wish";
import Layout from "@/shared/Layout";
import SellerLayout from "@/shared/SellerLayout";
import SellerRoute from "@/shared/SellerRoute";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// PrivateRoute : 로그인이 필요한 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있지 않은 사용자는 login 페이지로 리다이렉트
const PrivateRoute: React.FC<{ element: React.ElementType }> = ({
  element: Element,
  ...rest
}) => {
  const { isLoggedIn, isSessionLoading } = useAuth();
  return !isSessionLoading && isLoggedIn ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

// PublicRoute : 로그인 하지 않은 상태만 들어갈 수 있는 라우트
// 로그인한 사용자는 홈 페이지로 리다이렉트
const PublicRoute: React.FC<{ element: React.ElementType }> = ({
  element: Element,
  ...rest
}) => {
  const { isLoggedIn, isSessionLoading } = useAuth();
  return !isSessionLoading && !isLoggedIn ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

//셀러만 진입 가능한 페이지

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* -------------- 1. 일반 라우트 -------------- */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />

          <Route path="/signup" element={<PublicRoute element={Signup} />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />

          <Route path="/wish" element={<PrivateRoute element={Wish} />} />
          <Route path="/cart" element={<Cart />} />
          {/* 주문 폼 */}

          {/* 카테고리 아울렛 */}
          <Route path="/category" element={<Category />}>
            <Route index path="/category/new" element={<New />} />
            <Route path="/category/tops" element={<Tops />} />
            <Route path="/category/pants" element={<Pants />} />
            <Route path="/category/sports-bras" element={<Bras />} />
            <Route path="/category/best" element={<Best />} />
            <Route path="/category/brands" element={<Brands />} />
          </Route>

          {/* 제품 상세 페이지 */}
          <Route path="/product/:id" element={<Product />}>
            <Route
              index
              path="/product/:id/detail"
              element={<ProductDetail />}
            />
            <Route path="/product/:id/review" element={<Review />} />
            <Route path="/product/:id/qna" element={<QnA />} />
          </Route>
        </Route>
        {/* -------------- 1. 일반 라우트 -------------- */}

        {/* -------------- 2. 셀러 전용 라우트 -------------- */}
        <Route element={<SellerLayout />}>
          {/* 셀러가 물건 올리는 대시보드 */}
          <Route
            path="/dashboard"
            element={<SellerRoute element={Dashboard} />}
          >
            <Route
              index
              path="/dashboard/overview"
              element={<DashOverview />}
            />
            <Route path="/dashboard/product" element={<DashProduct />} />
            <Route
              path="/dashboard/transaction"
              element={<DashTransaction />}
            />
            <Route path="/dashboard/setting" element={<DashSetting />} />
          </Route>
        </Route>
        {/* -------------- 2. 셀러 전용 라우트 -------------- */}
      </Routes>
    </BrowserRouter>
  );
}