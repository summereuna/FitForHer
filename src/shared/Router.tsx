import { useAuth } from "@/hooks/useAuth";
import About from "@/pages/About";
import BizSignup from "@/pages/BizSignup";
// import Best from "@/pages/Category/Best";
// import Brands from "@/pages/Category/Brands";
import CategoryLayout from "@/pages/Category/CategoryLayout";
import New from "@/pages/Category/New";
import Pants from "@/pages/Category/Pants";
import SportsBras from "@/pages/Category/SportsBras";
import Tops from "@/pages/Category/Tops";
import Checkout from "@/pages/Checkout/Checkout";
import CheckoutRedirect from "@/pages/Checkout/CheckoutRedirect";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashOverview from "@/pages/Dashboard/DashOverview";
import DashProduct from "@/pages/Dashboard/DashProduct";
import DashProductEdit from "@/pages/Dashboard/DashProductEdit";
import DashProductUpload from "@/pages/Dashboard/DashProductUpload";
import DashReviewAndQnA from "@/pages/Dashboard/DashReviewAndQnA";
import DashSetting from "@/pages/Dashboard/DashSetting";
import DashTransaction from "@/pages/Dashboard/DashTransaction";
// import Help from "@/pages/Help";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import OrderFail from "@/pages/Checkout/OrderFail";
import OrderSuccess from "@/pages/Checkout/OrderSuccess";
import ProductDetail from "@/pages/Product/ProductDetail";
import QnA from "@/pages/Product/QnA";
import Review from "@/pages/Product/Review";
import Signup from "@/pages/Signup";
import Wish from "@/pages/Wish";
import Layout from "@/shared/Layout";
import SellerLayout from "@/shared/SellerLayout";
import SellerRoute from "@/shared/SellerRoute";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Orders from "@/pages/My/Orders";
import OrderDetail from "@/pages/My/OrderDetail";
import Search from "@/pages/Category/Search";

// PrivateRoute : 로그인이 필요한 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있지 않은 사용자는 login 페이지로 리다이렉트
const PrivateRoute: React.FC<{ element: React.ElementType }> = ({
  element: Element,
  ...rest
}) => {
  const { isLoggedIn, isSessionLoading } = useAuth();

  // 세션 로딩이 끝난 후에만 리다이렉트를 결정
  if (isSessionLoading) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/login" />;
};

// PublicRoute : 로그인 하지 않은 상태만 들어갈 수 있는 라우트
// 로그인한 사용자는 홈 페이지로 리다이렉트
const PublicRoute: React.FC<{ element: React.ElementType }> = ({
  element: Element,
  ...rest
}) => {
  const { isLoggedIn, isSessionLoading } = useAuth();

  // 세션 로딩이 끝난 후에만 리다이렉트를 결정
  if (isSessionLoading) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  return !isLoggedIn ? <Element {...rest} /> : <Navigate to="/" />;
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
          {/* <Route path="/help" element={<Help />} /> */}

          <Route path="/signup" element={<PublicRoute element={Signup} />} />
          <Route
            path="/signup/biz"
            element={<PublicRoute element={BizSignup} />}
          />

          <Route path="/login" element={<PublicRoute element={Login} />} />

          <Route path="/my/wish" element={<PrivateRoute element={Wish} />} />

          {/* 주문 폼 */}
          <Route
            path="/checkout"
            element={<PrivateRoute element={Checkout} />}
          />
          <Route
            path="/checkout/payment-redirect"
            element={<PrivateRoute element={CheckoutRedirect} />}
          />
          <Route
            path="/checkout/order/fail"
            element={<PrivateRoute element={OrderFail} />}
          />
          <Route
            path="/checkout/order/success/:id"
            element={<PrivateRoute element={OrderSuccess} />}
          />

          {/* 나의 페이지 / 오더 */}
          <Route
            path="/my/orders"
            element={<PrivateRoute element={Orders} />}
          />
          <Route
            path="/my/orders/:id"
            element={<PrivateRoute element={OrderDetail} />}
          />

          {/* 카테고리 아울렛 */}
          <Route path="/category" element={<CategoryLayout />}>
            <Route index element={<New />} />
            <Route path="new" element={<New />} />
            <Route path="tops/:subCategoryName?" element={<Tops />} />
            <Route path="pants/:subCategoryName?" element={<Pants />} />
            <Route
              path="sports-bras/:subCategoryName?"
              element={<SportsBras />}
            />
            {/* <Route path="best" element={<Best />} /> */}
            {/* <Route path="brands" element={<Brands />} /> */}
          </Route>

          {/* 제품 서치 */}
          <Route path="/search" element={<Search />} />

          {/* 제품 상세 페이지 */}
          <Route path="/product/:id" element={<ProductDetail />}>
            <Route path="/product/:id/review" element={<Review />} />
            <Route path="/product/:id/qna" element={<QnA />} />
          </Route>
        </Route>
        {/* -------------- 1. 일반 라우트 -------------- */}

        {/* -------------- 2. 셀러 전용 라우트 -------------- */}
        <Route element={<PrivateRoute element={SellerLayout} />}>
          {/* 셀러가 물건 올리는 대시보드 */}
          <Route
            path="/dashboard"
            element={<SellerRoute element={Dashboard} />}
          >
            <Route index element={<DashOverview />} />
            <Route
              index
              path="/dashboard/overview"
              element={<DashOverview />}
            />
            <Route path="/dashboard/product" element={<DashProduct />} />
            <Route
              path="/dashboard/product/upload"
              element={<DashProductUpload />}
            />
            <Route
              path="/dashboard/product/:id/edit"
              element={<DashProductEdit />}
            />
            <Route
              path="/dashboard/transaction"
              element={<DashTransaction />}
            />
            <Route
              path="/dashboard/review-and-qna"
              element={<DashReviewAndQnA />}
            />
          </Route>
          {/* 세팅하기 위해 아울렛에서 뺌 */}
          <Route path="/dashboard/setting" element={<DashSetting />} />
        </Route>
        {/* -------------- 2. 셀러 전용 라우트 -------------- */}
      </Routes>
    </BrowserRouter>
  );
}
