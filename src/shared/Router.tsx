import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { lazy, Suspense } from "react";

import Layout from "@/shared/Layout";
import Home from "@/pages/Home";
import SellerLayout from "@/shared/SellerLayout";

import Search from "@/pages/Category/Search";

import CategoryLayout from "@/pages/Category/CategoryLayout";
import New from "@/pages/Category/New";
import Pants from "@/pages/Category/Pants";
import SportsBras from "@/pages/Category/SportsBras";
import Tops from "@/pages/Category/Tops";

import ProductDetail from "@/pages/Product/ProductDetail";

import Checkout from "@/pages/Checkout/Checkout";
import CheckoutRedirect from "@/pages/Checkout/CheckoutRedirect";

// import Best from "@/pages/Category/Best";
// import Brands from "@/pages/Category/Brands";
// import Help from "@/pages/Help";s

const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const BizSignup = lazy(() => import("@/pages/BizSignup"));
const About = lazy(() => import("@/pages/About"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const QnA = lazy(() => import("@/pages/Product/QnA"));
const Review = lazy(() => import("@/pages/Product/Review"));

const OrderFail = lazy(() => import("@/pages/Checkout/OrderFail"));
const OrderSuccess = lazy(() => import("@/pages/Checkout/OrderSuccess"));

const Wish = lazy(() => import("@/pages/My/Wish"));
const Orders = lazy(() => import("@/pages/My/Orders"));
const OrderDetail = lazy(() => import("@/pages/My/OrderDetail"));

const SellerRoute = lazy(() => import("@/shared/SellerRoute"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const DashOverview = lazy(() => import("@/pages/Dashboard/DashOverview"));
const DashProduct = lazy(() => import("@/pages/Dashboard/DashProduct"));
const DashProductEdit = lazy(() => import("@/pages/Dashboard/DashProductEdit"));
const DashProductUpload = lazy(
  () => import("@/pages/Dashboard/DashProductUpload")
);
const DashReviewAndQnA = lazy(
  () => import("@/pages/Dashboard/DashReviewAndQnA")
);
const DashSetting = lazy(() => import("@/pages/Dashboard/DashSetting"));
const DashTransaction = lazy(() => import("@/pages/Dashboard/DashTransaction"));

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
          <Route
            path="/about"
            element={
              <Suspense>
                <About />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <NotFound />
              </Suspense>
            }
          />
          {/* <Route path="/help" element={<Help />} /> */}
          <Route
            path="/signup"
            element={
              <Suspense>
                <PublicRoute element={Signup} />
              </Suspense>
            }
          />
          <Route
            path="/signup/biz"
            element={
              <Suspense>
                <PublicRoute element={BizSignup} />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense>
                <PublicRoute element={Login} />
              </Suspense>
            }
          />
          <Route
            path="/my/wish"
            element={
              <Suspense>
                <PrivateRoute element={Wish} />
              </Suspense>
            }
          />
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
            element={
              <Suspense>
                <PrivateRoute element={OrderFail} />
              </Suspense>
            }
          />
          <Route
            path="/checkout/order/success/:id"
            element={
              <Suspense>
                <PrivateRoute element={OrderSuccess} />
              </Suspense>
            }
          />
          {/* 나의 페이지 / 오더 */}
          <Route
            path="/my/orders"
            element={
              <Suspense>
                <PrivateRoute element={Orders} />
              </Suspense>
            }
          />
          <Route
            path="/my/orders/:id"
            element={
              <Suspense>
                <PrivateRoute element={OrderDetail} />
              </Suspense>
            }
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
            <Route
              path="/product/:id/review"
              element={
                <Suspense>
                  <Review />
                </Suspense>
              }
            />
            <Route
              path="/product/:id/qna"
              element={
                <Suspense>
                  <QnA />
                </Suspense>
              }
            />
          </Route>
        </Route>
        {/* -------------- 1. 일반 라우트 -------------- */}

        {/* -------------- 2. 셀러 전용 라우트 -------------- */}
        <Route element={<PrivateRoute element={SellerLayout} />}>
          {/* 셀러가 물건 올리는 대시보드 */}
          <Route
            path="/dashboard"
            element={
              <Suspense>
                <SellerRoute element={Dashboard} />
              </Suspense>
            }
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
          <Route
            path="/dashboard/setting"
            element={
              <Suspense>
                <DashSetting />
              </Suspense>
            }
          />
        </Route>
        {/* -------------- 2. 셀러 전용 라우트 -------------- */}
      </Routes>
    </BrowserRouter>
  );
}
