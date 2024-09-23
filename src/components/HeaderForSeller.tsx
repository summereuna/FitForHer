import { Icon } from "@/components/Icon";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { storeIcon } from "@/shared/icons";
import { Link, NavLink } from "react-router-dom";

function HeaderForSeller() {
  const { session, isLoggedIn, logout } = useAuth();

  return (
    <div aria-label="전체 탐색">
      <div className="bg-white py-2 px-16">
        <nav aria-label="사용자 탐색">
          <ul className=" flex flex-row justify-end items-center space-x-4 text-xs">
            {/* <NavLink to={`/help`}>고객센터</NavLink> */}
            {/* <Separator orientation="vertical" className="h-3 bg-primary" /> */}
            {isLoggedIn && (
              <>
                <li>
                  <button aria-label="로그아웃 버튼" onClick={() => logout()}>
                    로그아웃
                  </button>
                </li>
                <li aria-hidden="true">
                  <Separator
                    orientation="vertical"
                    className="h-3 bg-primary"
                  />
                </li>

                <span aria-label="사용자 닉네임">
                  {session?.user?.user_metadata.name}님
                </span>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink aria-label="회원가입 페이지로 이동" to={`/signup`}>
                    회원가입
                  </NavLink>
                </li>
                <li aria-hidden="true">
                  <Separator
                    orientation="vertical"
                    className="h-3 bg-primary"
                  />
                </li>

                <li>
                  <NavLink aria-label="로그인 페이지로 이동" to={`/login`}>
                    로그인
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div
        aria-label="검색 탐색"
        className="bg-white y-2 px-16 flex flex-row justify-between items-center text-sm"
      >
        <Link
          aria-label="홈(대시보드) 버튼"
          to={`/dashboard`}
          className="text-xl font-semibold w-20"
        >
          F4H
        </Link>
        <div className="flex flex-row justify-end space-x-4 w-20">
          <NavLink aria-label="대시보드로 이동" to={`/dashboard`}>
            <Icon className="size-6">{storeIcon}</Icon>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HeaderForSeller;
