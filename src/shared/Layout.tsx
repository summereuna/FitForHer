import { SearchBar } from "@/components/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { cartIcon, categoryIcon, wishIcon } from "@/shared/icons";
import { Link, NavLink } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const mainNavList = [
    { id: "tops", name: "상의", path: `/category/tops` },
    { id: "pants", name: "하의", path: `/category/pants` },
    { id: "sports-bras", name: "스포츠브라", path: `/category/sports-bras` },
    { id: "new", name: "신제품", path: `/category/new` },
    { id: "best", name: "베스트", path: `/category/best` },
    { id: "brands", name: "브랜드", path: `/category/brands` },
  ];

  const { session, logout } = useAuth();

  return (
    // 페이지의 최소 높이를 화면의 전체 높이
    <div className="flex flex-col min-h-screen">
      <div aria-label="전체 탐색">
        <div className="bg-white py-2 px-16">
          <nav aria-label="사용자 탐색">
            <ul className=" flex flex-row justify-end items-center space-x-4 text-xs">
              <NavLink to={`/help`}>고객센터</NavLink>
              <span>|</span>
              {session ? (
                <button onClick={() => logout()}>로그아웃</button>
              ) : (
                <>
                  <NavLink to={`/signup`}>회원가입</NavLink>
                  <span>|</span>
                  <NavLink to={`/login`}>로그인</NavLink>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div
          aria-label="검색 탐색"
          className="bg-white y-2 px-16 flex flex-row justify-between items-center text-sm"
        >
          <Link to={`/`} className="text-xl font-semibold w-20">
            F4H
          </Link>
          <search aria-label="검색" className="bg-blue-300 w-80">
            <SearchBar />
          </search>
          <div className="flex flex-row justify-end space-x-4 w-20">
            <NavLink to={`/wish`}>{wishIcon}</NavLink>
            <NavLink to={`/cart`}>
              <div className="relative">
                {cartIcon}
                <div className="absolute top-[5px] left-[9px] text-[8px]">
                  {"2"}
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <header className="bg-white mt-3 py-2 px-16 text-sm border-t-[1px] border-b-[1px]">
          <nav
            aria-label="메인 탐색"
            className="relative flex flex-row justify-center"
          >
            <button className="absolute left-0">{categoryIcon}</button>
            <ul className="space-x-4">
              {mainNavList.map((li) => (
                <NavLink
                  key={li.id}
                  className={({ isActive }) =>
                    `transition duration-200 ease-in-out ${
                      isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                    }`
                  }
                  to={li.path}
                >
                  {li.name}
                </NavLink>
              ))}
              {/* <NavLink
                className={({ isActive }) =>
                  `transition duration-200 ease-in-out ${
                    isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                  }`
                }
                to={`/category/tops`}
              >
                상의
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `transition duration-200 ease-in-out ${
                    isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                  }`
                }
                to={`/category/pants`}
              >
                하의
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `transition duration-200 ease-in-out ${
                    isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                  }`
                }
                to={`/category/sports-bras`}
              >
                스포츠 브라
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `transition duration-200 ease-in-out ${
                    isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                  }`
                }
                to={`/category/new`}
              >
                신제품
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `transition duration-200 ease-in-out ${
                    isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                  }`
                }
                to={`/category/best`}
              >
                베스트
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `transition duration-200 ease-in-out ${
                    isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                  }`
                }
                to={`/category/brands`}
              >
                브랜드
              </NavLink> */}
            </ul>
          </nav>
        </header>
      </div>
      {/* flex-grow: 나머지 공간 차지 */}
      <main className="flex-grow flex">
        <div className="px-16 py-5 container mx-auto flex-grow">
          {children}
        </div>
      </main>
      <footer className="bg-white py-6 border-t-[1px]">
        <div className="container mx-auto px-16">
          <div className="flex flex-col md:flex-row justify-between">
            {/* 1 */}
            <div className="mb-4 md:mb-0 text-xs">
              <h2 className="text-sm font-semibold">개인 프로젝트</h2>
              <p className="mt-1">
                © {new Date().getFullYear()} FIT FOR HER. 개인 프로젝트.
              </p>
            </div>

            {/* 2 */}
            <div className="mb-4 md:mb-0 text-xs">
              <h3 className="text-sm font-semibold">ABOUT US</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link to="/about" className="hover:underline">
                    FIT FOR HER 소개
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3*/}
            <div className="mb-4 md:mb-0 text-xs">
              <h3 className="text-sm font-semibold">CONNECT WITH F4H</h3>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://github.com/summereuna/fit-for-her"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  깃허브
                </a>
                <a
                  href="https://dandelion-girdle-1ba.notion.site/1eef138624dd4bb29254dca841c4f8c9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  노션
                </a>
                <a
                  href="https://velog.io/@summereuna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  블로그
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
