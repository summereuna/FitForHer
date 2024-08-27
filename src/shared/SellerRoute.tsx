import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

interface SellerRouteProps {
  element: React.ElementType;
}

// 판매자 라우트
const SellerRoute: React.FC<SellerRouteProps> = ({
  element: Element,
  ...rest
}) => {
  const { isLoggedIn, userRole, isSessionLoading } = useAuth();

  if (isSessionLoading) {
    return <div>로딩 인디케이터 표시...</div>;
  }

  if (!isLoggedIn || userRole !== "seller") {
    return <Navigate to="/login" />;
  }

  return React.createElement(Element, rest);
};

export default SellerRoute;
