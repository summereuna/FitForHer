import { Icon } from "@/components/Icon";
import { SearchBar } from "@/components/SearchBar";
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
            <NavLink to={`/help`}>고객센터</NavLink>
            <Separator orientation="vertical" className="h-3 bg-primary" />
            {isLoggedIn && (
              <>
                <button onClick={() => logout()}>로그아웃</button>
                <Separator orientation="vertical" className="h-3 bg-primary" />

                <span>{session?.user?.user_metadata.name}님</span>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavLink to={`/signup`}>회원가입</NavLink>
                <Separator orientation="vertical" className="h-3 bg-primary" />
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
        <Link to={`/dashboard`} className="text-xl font-semibold w-20">
          F4H
        </Link>
        <search aria-label="검색" className="w-80">
          <SearchBar />
        </search>
        <div className="flex flex-row justify-end space-x-4 w-20">
          <NavLink to={`/dashboard`}>
            <Icon className="size-6">{storeIcon}</Icon>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HeaderForSeller;
