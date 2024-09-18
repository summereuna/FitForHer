import Footer from "@/components/Footer";
import HeaderForSeller from "@/components/HeaderForSeller";
import { Icon } from "@/components/Icon";
import {
  storeIcon,
  cartIcon,
  orderIcon,
  settingIcon,
  docsIcon,
} from "@/shared/icons";
import { NavLink, Outlet } from "react-router-dom";

const SellerLayout = () => {
  const mainNavList = [
    {
      id: "overview",
      name: "대시보드",
      path: `/dashboard/overview`,
      icon: storeIcon,
    },
    {
      id: "product",
      name: "상품관리",
      path: `/dashboard/product`,
      icon: cartIcon,
    },
    {
      id: "transaction",
      name: "판매관리",
      path: `/dashboard/transaction`,
      icon: orderIcon,
    },
    {
      id: "reviewAndQnA ❌",
      name: "문의/리뷰관리",
      path: `/dashboard/review-and-qna`,
      icon: docsIcon,
    },
    {
      id: "setting",
      name: "브랜드 정보",
      path: `/dashboard/setting`,
      icon: settingIcon,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderForSeller />
      <main
        aria-label="대시보드 메인"
        className="flex flex-grow border-t-[1px] mt-4"
      >
        <aside
          aria-label="대시보드 어사이드 네비"
          className="text-[13px] border-r-[1px] flex-grow flex min-w-16 lg:min-w-56"
        >
          <nav aria-label="대시보드 탐색" className="h-full w-full">
            <ul className="flex flex-col h-full">
              {mainNavList.map((li) => (
                <NavLink
                  key={li.id}
                  className={({ isActive }) =>
                    `pl-5 lg:pl-16 flex flex-row items-center w-full space-x-3 border-b-[1px] py-5 transition duration-200 ease-in-out ${
                      isActive ? "font-semibold bg-gray-200" : ""
                    }`
                  }
                  to={li.path}
                >
                  <Icon className="size-5">{li.icon}</Icon>
                  <div className="hidden lg:block">{li.name}</div>
                </NavLink>
              ))}
            </ul>
          </nav>
        </aside>
        <section className="p-5 container mx-auto flex-grow bg-gray-100">
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellerLayout;
