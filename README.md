
<div align="center">
  <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fsummereuna%2Ffit-for-her&count_bg=%233D7DFF&title_bg=%23333333&icon=&icon_color=%23E7E7E7&title=%F0%9F%91%80+%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=false"/></a></div>
  <br/>
  <div align="center">
  <img width="600" alt="F4H" src="https://github.com/user-attachments/assets/8534cf87-7e42-472d-8d08-5c0a8205a9f2">
  <h3>FIT FOR HER</h3>
  <p>여러 브랜드의 스포츠웨어를 한 곳에서, 여성을 위한 스포츠웨어 플랫폼</p>
</div>
<br/>

## 프로젝트 소개
여성을 위한 스포츠웨어 이커머스 플랫폼입니다.

#### 프로젝트 진행기간
2024.08.20 ~ 2024.09.21 (약 5주)

#### 프로젝트 배포링크
[📍 Fit For Her (F4H)](https://fit-for-her.vercel.app/)

#### 테스트 계정
>  1. 구매자
> <br/>ID: test@test.com<br/>PW: test123!!!
>
>  2. 판매자
> <br/>ID: lululemon@test.com<br/>PW: fnffnfpahs123!!!

  

## 실행방법
1. 레포지토리 복제 및 의존성 설치
```
$ git clone https://github.com/summereuna/fit-for-her.git
$ cd fit-for-her
$ yarn
```
2. 개발 서버 가동
```
$ yarn dev
```
3. 브라우저에서 실행
```
http://localhost:5173/
```

## 기술스택
기술|기술 선택 이유
:--:|:--
<img  src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=Yarn&logoColor=white"  width="80px"/>|- 패키지 관리는 npm 대신 속도와 안정성 측면에서 보다 뛰어난 yarn을 선택했습니다.
<img  src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"  width="80px"/>|- 개발 효율성과 속도를 위해 Vite를 선택했으며, 이는 CRA보다 빌드 속도와 서버 시작 시간이 훨씬 빠릅니다.
<img  src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"  width="130px"/>|- 코드 오류를 빠르게 잡고 데이터 구조를 명확하게 정의하여 가독성과 유지보수성을 높이기 위해 TypeScript를 사용하였습니다.
<img  src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=white"  width="80px"/>|- 컴포넌트 기반으로 UI를 재사용성 있게 관리할 수 있는 React를 선택하였습니다. 잘 구축된 생태계와 활발한 커뮤니티 덕분에 학습이 용이하며, 다양한 라이브러리와의 통합을 통해 개발 효율성도 높일 수 있습니다.<br/>- SEO와 SSR 문제로 Next.js 사용도 고려했으나, 이번 프로젝트에서는 React를 심도 있게 공부하기 위해 React를 선택하였습니다.
<img  src="https://img.shields.io/badge/reacthookform-EC5990?style=flat-square&logo=reacthookform&logoColor=white"  width="180px"/><br/><img  src="https://img.shields.io/badge/zod-3E67B1?style=flat-square&logo=zod&logoColor=white"  width="70px"/>|- React Hook Form과 zod를 함께 사용하여 폼 처리와 검증을 보다 효율적으로 구현하였습니다.<br/>- React Hook Form은 간결한 코드로 최적화된 폼 관리를 제공하며, Zod는 타입 안전성을 보장하는 유연한 스키마 기반의 유효성 검사를 지원합니다. 특히 Zod는 TypeScript와 친화적이어서, 컴파일 시점과 런타임 간의 타입 불일치를 방지해 폼 처리와 검증을 더욱 효율적으로 구현할 수 있습니다.
<img  src="https://img.shields.io/badge/TanStackQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"  width="180px"/>|- TanStackQuery는 데이터 패칭, 캐싱, 서버 상태 관리를 효율적으로 관리하고 처리할 수 있어서 선택했습니다.
<img  src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white"  width="300px"/>|- 스타일링은 유틸리티 기반 클래스명으로 일관성 있는 스타일링을 적용하여 빠르게 개발할 수 있는 Tailwind CSS를 사용하였습니다.<br/>커스터마이징이 용이하며, 반응형 디자인도 sm, md, lg 등과 같은 접두사를 사용하여 쉽게 구현할 수 있는 장점이 있습니다.
<img  src="https://img.shields.io/badge/shadcnui-000000?style=flat-square&logo=shadcnui&logoColor=white"  width="300px"/>|- Shadcn/UI는 접근성과 사용자 경험을 중시하고, 미리 설계된 컴포넌트들을 제공하여 빠르고 일관된 UI 개발을 지원합니다. 또한, Tailwind CSS와의 원활한 통합으로 커스터마이징이 쉽고, 다양한 UI 요구 사항을 효율적으로 충족할 수 있어 이를 선택했습니다.<br/>- 이번 프로젝트에서는 Shadcn/UI의 버튼, 알림창, 드롭다운, 표, 토스트 등의 UI를 사용하였습니다.
<img  src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white"  width="140px"/>|- React 환경에서 라우팅과 페이지 설계를 간편하게 처리할 수 있는 React Router를 사용하였습니다.<br/>SPA(Single Page Application)에서 페이지 간의 네비게이션을 쉽게 관리할 수 있고 Layout, Outlet 등의 기능을 사용할 수 있습니다.
<img  src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"  width="90px"/>|- 배포는 빠르고 간편하고 자동화된 CI/CD를 제공하는 Vercel을 사용하여 개발과 운영 효율성을 높였습니다.
<img  src="https://img.shields.io/badge/supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white"  width="110px"/>|- 백엔드로는 Supabase를 사용했습니다. Supabase는 실시간 DB, Auth, Storage 등 다양한 백엔드 기능을 손쉽게 구현할 수 있는 BaaS(Backend as a Service) 플랫폼으로, 서버 없이도 언급된 기능을 제공 받을 수 있기 때문에 이번 프로젝트에 적합하다고 생각하여 선택했습니다.<br/>- NoSQL 기반인 Firebase와도 고민을 했지만, 이커머스 프로젝트의 복잡한 데이터 요구 사항을 효율적으로 처리할 수 있을 것으로 판단하여 오픈 소스 PostgreSQL 기반으로 강력한 쿼리 기능과 데이터베이스 관리 기능을 제공하고 데이터베이스 스키마의 직관적 관리가 가능한 Supabase를 선택했습니다.

 
## 아키텍쳐
![아키텍처이미지]()

### 폴더구조
```

  

```

### ERD
![ERD]()

## 화면 구성 및 주요기능
#### 1. 로그인(`/login`), 회원가입(`/signup`)
<details>
<summary>로그인/회원가입</summary>
![일반회원가입]()
![비즈니스회원가입]()
![로그인]()
</details>

- 일반회원/비즈니스 회원 가입 기능
- 폼 유효성 검증
- 로그인 후 전역상태로 회원정보 관리

#### 2. 메인 페이지(`/`)
<details>
<summary>메인 페이지</summary>
![메인페이지]()
![더보기클릭시카테고리이동]()
![상단전체메뉴바클릭시카테고리이동]()
![상단검색바이용시검색페이지이동]()
</details>

- 상단 배너 캐러셀에 브랜드별 이미지 노출(3.5초 간격으로 자동 전환)
- 카테고리별 최신 상품 조회(최대 4개)
- 더보기 버튼 및 서브 카테고리 태그 선택하여 페이지 이동
- 상단 메뉴에서 카테고리 선택해 카테고리별 상품 페이지 이동
- 상단 검색바에서 상품명/상품설명 키워드 검색 기능

#### 3. 카테고리 페이지(`/category/:categoryName/:subCategoryName`)
<details>
<summary>상품 조회</summary>
![서브카테고리필터링]()
![정렬옵션조회필터링]()
</details>
- 카테고리, 검색어, 정렬 옵션에 따른 조회 결과 필터링 기능
- 무한 스크롤 활용한 페이지네이션

#### 4. 상품 상세 조회 페이지(`/product/:id`)
<details>
<summary>상품 상세 조회</summary>
![이미지캐러셀기능]()
![장바구니추가기능]()
</details>

- 상품 이미지 캐러셀 기능으로 유저 인터랙션 강화
- 상품 선택 시 장바구니 추가 기능

#### 5. 장바구니 드롭다운
<details>
<summary>[구매자] 장바구니</summary>
![장바구니상품수량수정]()
![장바구니상품삭제]()
![장바구니상품주문]()
</details>

- 장바구니 상품 수량 수정 및 삭제 기능
- 장바구니 상품 주문 기능

#### 6. 상품 주문 및 결제 페이지(`/checkout`)
<details>
<summary>[구매자] 상품 주문</summary>
![배송정보입력]()
![포트원SDK이용]()
</details>

- 배송 정보 입력
- 포트원 SDK 활용한 결제 기능 (카카오페이 테스트로만 진행)

#### 7. 주문 내역 (`/my/orders`), 주문 내역 상세 (`/my/orders/:id`)
<details>
<summary>[구매자] 주문 내역 조회 및 주문 취소</summary>
![주문내역페이지이동]()
![주문내역상세페이지이동및주문취소]()
</details>

- 주문 내역 전체 조회 기능
- 주문 내역 상세 조회 기능
- 주문 취소 기능 (주문 취소의 경우 `order_status: "order_cancelled"` 상태 변경으로 논리적 삭제)

#### 8. 대시보드 설정(`/dashboard/setting`)
<details>
<summary>[판매자] 대시보드 설정</summary>
![첫로그인시브랜드등록]()
![등록후브랜드정보입력]()
</details>

- 비즈니스 회원으로 가입한 판매자는 대시보드 설정 탭에서 브랜드 등록 후 대시보드 이용 가능
- 브랜드 정보 조회 및 수정 기능

#### 9. 대시보드(`/dashboard`), (`/dashboard/overview`)
<details>
<summary>[판매자] 대시보드 오버뷰</summary>
![대시보드]()
</details>

- 상품 판매 수치 조회

#### 10. 대시보드 상품관리 (`/dashboard/product`)
<details>
<summary>[판매자] 대시보드 상품관리</summary>
![판매상품조회]()
![판매상품등록]()
![판매상품수정]()
![판매상품삭제]()
</details>

- 판매 상품 등록, 조회, 수정, 삭제 기능 (삭제의 경우 `is_active: true | false` 로 논리적 삭제)
- 등록 시 상품 이미지 개수 최소 1개 ~ 최대 5개 제한

#### 11. 대시보드 판매관리 (`/dashboard/transaction`)
<details>
<summary>[판매자] 대시보드 판매관리</summary>
![판매관리조회]()
![상태변경]()
</details>

- 판매 상품에 대한 배송대기, 배송중, 배송완료, 구매확정, 주문취소 상태 변경 기능

## 성능 최적화
- 

## 트러블 슈팅
-
