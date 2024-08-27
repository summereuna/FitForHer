import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    // 페이지의 최소 높이를 화면의 전체 높이
    // flex-grow: 나머지 공간 차지
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex">
        <div className="px-16 py-5 container mx-auto flex-grow">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
