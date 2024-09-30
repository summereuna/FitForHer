// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext.tsx";
import { CartProvider } from "@/context/CartContext.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

//일단 기본 세팅
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5, // 5분
      //staleTime이 지나지 않은 데이터는 fresh한 상태이므로 네트워크에서 Fetching을 하지 않고 캐시를 반환
      retry: 1, //실패시 다시 시도할 횟수 (기본값 3)
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error) {
        toast({
          title: "에러 발생!",
          description: `에러가 발생했습니다, 다시 시도해 주세요. 에러가 계속될 경우 관리자에게 문의하세요.`,
          variant: "destructive",
        });
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
  // </StrictMode>
);
