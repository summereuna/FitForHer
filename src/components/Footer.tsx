import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white py-6 border-t-[1px]">
      <div className="container mx-auto px-5 md:px-16">
        <div className="flex flex-col md:flex-row justify-between">
          {/* 1 */}
          <div className="mb-4 md:mb-0 text-xs">
            <h2 className="text-sm font-semibold">이커머스 개인 프로젝트</h2>
            <p className="mt-1">© {new Date().getFullYear()} FIT FOR HER.</p>
          </div>

          {/* 2 */}
          <div className="mb-4 md:mb-0 text-xs">
            <h3 className="text-sm font-semibold">ABOUT US</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  aria-label="소개 페이지로 이동"
                  to="/about"
                  className="hover:underline"
                >
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
                aria-label="(외부) 깃허브로 이동"
                href="https://github.com/summereuna/fit-for-her"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                깃허브
              </a>
              <a
                aria-label="(외부) 노션으로 이동"
                href="https://dandelion-girdle-1ba.notion.site/1eef138624dd4bb29254dca841c4f8c9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                노션
              </a>
              <a
                aria-label="(외부) 블로그로 이동"
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
  );
}

export default Footer;
