import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useBrand } from "@/api/brandApi";

function Dashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { brandData, isSuccess } = useBrand(session?.user.id as string);

  //브랜드 데이터 가져오기 전까지 아무것도 안띄우기 => 회원가입 축하 메세지 깜빡임 방지
  if (!isSuccess) {
    return null;
  }

  return (
    <>
      {brandData && <Outlet />}
      {!brandData && (
        <Card className="max-w-2xl mx-auto">
          <div className="p-10 space-y-5">
            <p>
              <strong className="text-xl">
                {session?.user.user_metadata.name}님,
                <br />
                FIT FOR HER에 비즈니스 회원으로 가입하신 것을 환영합니다! 🎉
              </strong>
            </p>
            <Separator />
            <p>브랜드를 성공적으로 설정하기 위해 다음 단계를 진행해 주세요.</p>
            <ol className="list-decimal list-inside space-y-5">
              <div className="flex flex-col space-y-3">
                <li className="space-y-3">
                  <strong>브랜드 등록</strong>
                  <br />
                  먼저 브랜드 이름을 입력하여 브랜드를 등록하세요. 이 단계는
                  브랜드를 등록하는 첫 번째 단계입니다. 브랜드 이름을 입력하면,
                  브랜드가 등록되고 다음 단계로 넘어갈 수 있습니다.
                </li>
                <Button
                  aria-label="브랜드 등록하는 페이지로 이동"
                  className="w-40"
                  onClick={() => navigate("/dashboard/setting")}
                >
                  브랜드 등록하기
                </Button>
              </div>

              <li className="space-y-3">
                <strong>추가 정보 입력</strong>
                <br />
                브랜드 등록 후, 브랜드 설명, 연락처 정보, 로고 이미지를 추가로
                입력할 수 있습니다. 이 정보는 브랜드를 고객들에게 잘 소개할 수
                있도록 도와줍니다.
              </li>
              <li>
                <strong>상품 업로드</strong>
                <br />
                브랜드 설정이 완료되면,
                <Link
                  aria-label="상품관리 페이지로 이동"
                  to={"/dashboard/product"}
                  className="text-gray-400 transition duration-150 ease-linear hover:text-blue-500 "
                >
                  상품관리 페이지
                </Link>
                로 이동하여 상품을 관리하고 상품 판매를 시작할 수 있습니다.
              </li>
            </ol>
            <Separator />
            <p>
              <strong>주의사항</strong>
            </p>
            <ul className="list-disc list-inside space-y-5 ">
              <li>브랜드 이름은 필수 입력 항목입니다.</li>
              <li>
                로고 이미지는 선택 사항입니다. 그러나 브랜드를 더욱 돋보이게
                하기 위해 업로드하는 것을 권장합니다.
              </li>
              <li>
                브랜드 설명 및 소셜 미디어 정보는 고객이 브랜드에 대해 더 잘
                이해하고 소통할 수 있도록 도와줍니다.
              </li>
            </ul>
            <Separator />
            <p>
              브랜드 설정이 완료되면, 다음 단계로 넘어가서 제품을 업로드하고
              판매를 시작하세요!
            </p>
            <p>
              궁금한 점이 있거나 도움이 필요하시면 언제든지 고객 지원팀에 문의해
              주세요.
            </p>
          </div>
        </Card>
      )}
    </>
  );
}

export default Dashboard;
