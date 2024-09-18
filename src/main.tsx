// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext.tsx";
import { CartProvider } from "@/context/CartContext.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//일단 기본 세팅
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5, // 5분
      //staleTime이 지나지 않은 데이터는 fresh한 상태이므로 네트워크에서 Fetching을 하지 않고 캐시를 반환
      // retry: 1, //실패시 다시 시도할 횟수 (기본값 3)
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CartProvider>
  </AuthProvider>
  // </StrictMode>
);
